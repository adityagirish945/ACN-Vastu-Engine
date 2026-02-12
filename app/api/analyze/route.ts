import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = buffer.toString('base64')

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              {
                text: `Analyze this floor plan image for Vastu compliance. For each room you can identify, provide:
1. Room Type (e.g., Bedroom, Kitchen, Toilet, Living Room, etc.)
2. Direction (North, South, East, West, Northeast, Northwest, Southeast, Southwest)
3. Vastu Status (Auspicious, Inauspicious, or Favourable)

Return ONLY a valid JSON array with this exact structure:
[
  {
    "room": "Room Type",
    "direction": "Direction",
    "vastu": "Status",
    "status": "auspicious|inauspicious|favourable"
  }
]

Do not include any markdown formatting, explanations, or additional text. Only return the JSON array.`
              },
              {
                inline_data: {
                  mime_type: image.type,
                  data: base64Image
                }
              }
            ]
          }]
        })
      }
    )

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: data.error?.message || 'Analysis failed' }, { status: 500 })
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text
    if (!text) {
      return NextResponse.json({ error: 'No analysis result' }, { status: 500 })
    }

    const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const roomData = JSON.parse(cleanedText)

    return NextResponse.json({ rooms: roomData })
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json({ error: 'Failed to analyze image' }, { status: 500 })
  }
}
