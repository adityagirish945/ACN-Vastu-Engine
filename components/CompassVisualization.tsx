'use client'

import React, { useRef, useEffect } from 'react'
import { ZoomIn } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CompassVisualizationProps {
  uploadedImage?: string
}

export default function CompassVisualization({ uploadedImage }: CompassVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = 120

    // Clear canvas
    ctx.fillStyle = '#f5f5f5'
    ctx.fillRect(0, 0, width, height)

    // Draw compass circle with gradient segments
    const colors = [
      { start: 0, end: 90, color: '#64b5f6' }, // Blue - NE
      { start: 90, end: 180, color: '#81c784' }, // Green - SE
      { start: 180, end: 270, color: '#ffd54f' }, // Yellow - SW
      { start: 270, end: 360, color: '#e57373' }, // Red - NW
    ]

    // Draw colored segments
    colors.forEach((segment) => {
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(
        centerX,
        centerY,
        radius,
        (segment.start * Math.PI) / 180,
        (segment.end * Math.PI) / 180
      )
      ctx.closePath()
      ctx.fillStyle = segment.color
      ctx.fill()
      ctx.strokeStyle = '#ff9800'
      ctx.lineWidth = 3
      ctx.stroke()
    })

    // Draw outer circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.strokeStyle = '#ff9800'
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw direction labels
    const directions = [
      { label: 'N', angle: 0, x: centerX, y: centerY - radius - 20 },
      { label: 'NE', angle: 45, x: centerX + radius / Math.sqrt(2) + 10, y: centerY - radius / Math.sqrt(2) - 10 },
      { label: 'E', angle: 90, x: centerX + radius + 20, y: centerY },
      { label: 'SE', angle: 135, x: centerX + radius / Math.sqrt(2) + 10, y: centerY + radius / Math.sqrt(2) + 10 },
      { label: 'S', angle: 180, x: centerX, y: centerY + radius + 20 },
      { label: 'SW', angle: 225, x: centerX - radius / Math.sqrt(2) - 30, y: centerY + radius / Math.sqrt(2) + 10 },
      { label: 'W', angle: 270, x: centerX - radius - 30, y: centerY },
      { label: 'NW', angle: 315, x: centerX - radius / Math.sqrt(2) - 30, y: centerY - radius / Math.sqrt(2) - 10 },
    ]

    ctx.fillStyle = '#333'
    ctx.font = 'bold 14px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    directions.forEach((dir) => {
      ctx.fillText(dir.label, dir.x, dir.y)
    })

    // Add degree markers
    ctx.fillStyle = '#666'
    ctx.font = '12px sans-serif'
    const degreeMarkers = [
      { label: '0', angle: 0 },
      { label: '45°', angle: 45 },
      { label: '90', angle: 90 },
      { label: '180', angle: 180 },
      { label: '270', angle: 270 },
    ]

    degreeMarkers.forEach((marker) => {
      const angle = (marker.angle * Math.PI) / 180
      const x = centerX + Math.cos(angle - Math.PI / 2) * (radius - 20)
      const y = centerY + Math.sin(angle - Math.PI / 2) * (radius - 20)
      ctx.fillText(marker.label, x, y)
    })

    // Draw floor plan rectangle
    const floorPlanX = centerX - 50
    const floorPlanY = centerY - 60
    const floorPlanWidth = 100
    const floorPlanHeight = 120

    ctx.strokeStyle = '#999'
    ctx.lineWidth = 2
    ctx.strokeRect(floorPlanX, floorPlanY, floorPlanWidth, floorPlanHeight)

    // Draw simplified floor plan with rooms
    ctx.fillStyle = '#e0e0e0'
    ctx.fillRect(floorPlanX, floorPlanY, floorPlanWidth, floorPlanHeight)

    // Draw room dividers
    ctx.strokeStyle = '#333'
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.moveTo(floorPlanX + 50, floorPlanY)
    ctx.lineTo(floorPlanX + 50, floorPlanY + floorPlanHeight)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(floorPlanX, floorPlanY + 40)
    ctx.lineTo(floorPlanX + floorPlanWidth, floorPlanY + 40)
    ctx.stroke()

    // Draw room points
    const points = [
      { x: floorPlanX + 25, y: floorPlanY + 25 },
      { x: floorPlanX + 75, y: floorPlanY + 25 },
      { x: floorPlanX + 25, y: floorPlanY + 65 },
      { x: floorPlanX + 75, y: floorPlanY + 65 },
      { x: floorPlanX + 25, y: floorPlanY + 105 },
      { x: floorPlanX + 75, y: floorPlanY + 105 },
    ]

    ctx.fillStyle = '#4caf50'
    points.forEach((point) => {
      ctx.beginPath()
      ctx.arc(point.x, point.y, 3, 0, Math.PI * 2)
      ctx.fill()
    })

    // Draw center point
    ctx.fillStyle = '#ff6b6b'
    ctx.beginPath()
    ctx.arc(centerX, centerY, 5, 0, Math.PI * 2)
    ctx.fill()
  }, [])

  return (
    <div className="flex-1 bg-card rounded-lg p-6 border border-border shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Floor Plan Analysis</h2>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground"
        >
          <ZoomIn size={18} className="mr-2" />
          Zoom
        </Button>
      </div>

      <div className="flex items-center justify-center bg-background rounded p-4">
        {uploadedImage ? (
          <img src={uploadedImage} alt="Floor Plan" className="max-w-full max-h-[400px] border border-border rounded" />
        ) : (
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
            className="border border-border rounded"
          />
        )}
      </div>
    </div>
  )
}
