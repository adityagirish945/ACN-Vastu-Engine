# Vastu Report Generator

A Next.js application that analyzes floor plans for Vastu compliance using Google's Gemini 2.0 Flash AI.

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Gemini API Key:**
   - Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Open `.env.local` and replace `your_gemini_api_key_here` with your actual API key

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - Landing page: http://localhost:3000/upload
   - Results page (existing): http://localhost:3000/results
   - Original demo: http://localhost:3000

## Features

- **Upload Floor Plan**: Drag & drop or select JPG/PNG images
- **AI Analysis**: Gemini 2.0 Flash analyzes rooms, directions, and Vastu compliance
- **Visual Results**: Displays uploaded image with detailed room analysis
- **Vastu Report**: Shows room type, direction, and Vastu status (Auspicious/Inauspicious/Favourable)

## How It Works

1. User uploads floor plan image on `/upload` page
2. Image is sent to Gemini 2.0 Flash API for analysis
3. AI identifies rooms, directions, and Vastu compliance
4. Results are stored and user is redirected to `/results` page
5. Results page displays the uploaded image and detailed analysis table
