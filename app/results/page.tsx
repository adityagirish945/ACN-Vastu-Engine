'use client'

import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import LeftSidebar from '@/components/LeftSidebar'
import CompassVisualization from '@/components/CompassVisualization'
import RightPanel from '@/components/RightPanel'
import { useRouter } from 'next/navigation'

interface RoomData {
  room: string
  direction: string
  vastu: string
  status: 'auspicious' | 'inauspicious' | 'favourable'
}

export default function ResultsPage() {
  const [roomData, setRoomData] = useState<RoomData[]>([])
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const analysis = localStorage.getItem('vastuAnalysis')
    const image = localStorage.getItem('uploadedImage')

    if (!analysis || !image) {
      router.push('/upload')
      return
    }

    const data = JSON.parse(analysis)
    setRoomData(data.rooms || [])
    setUploadedImage(image)
  }, [router])

  if (!roomData.length || !uploadedImage) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading analysis...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <LeftSidebar />
        <div className="flex-1 flex gap-6 p-8">
          <CompassVisualization uploadedImage={uploadedImage} />
          <RightPanel roomData={roomData} />
        </div>
      </div>
    </div>
  )
}
