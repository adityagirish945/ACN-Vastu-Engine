'use client'

import React from 'react'
import { CheckCircle, X, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface RoomData {
  room: string
  direction: string
  vastu: string
  status: 'auspicious' | 'inauspicious' | 'favourable'
}

interface RightPanelProps {
  roomData?: RoomData[]
}

export default function RightPanel({ roomData: propRoomData }: RightPanelProps) {
  const defaultRoomData: RoomData[] = [
    { room: 'Toilet', direction: 'East', vastu: 'Inauspicious', status: 'inauspicious' },
    { room: 'Toilet', direction: 'Southeast', vastu: 'Inauspicious', status: 'inauspicious' },
    { room: 'Dining Room', direction: 'North', vastu: 'Auspicious', status: 'auspicious' },
    { room: 'Kitchen', direction: 'East', vastu: 'Auspicious', status: 'auspicious' },
    { room: 'Utility', direction: 'East', vastu: 'Auspicious', status: 'auspicious' },
    { room: 'Bedroom', direction: 'West', vastu: 'Auspicious', status: 'auspicious' },
    { room: 'Bedroom', direction: 'South', vastu: 'Auspicious', status: 'auspicious' },
    { room: 'Balcony', direction: 'Northwest', vastu: 'Auspicious', status: 'auspicious' },
    { room: 'Foyer', direction: 'Northeast', vastu: 'Favourable', status: 'favourable' },
  ]

  const roomData = propRoomData || defaultRoomData

  const StatusIcon = ({ status }: { status: RoomData['status'] }) => {
    if (status === 'inauspicious')
      return <X size={18} className="text-destructive" />
    if (status === 'favourable')
      return <Leaf size={18} className="text-accent" />
    return <CheckCircle size={18} className="text-green-500" />
  }

  return (
    <div className="w-96 bg-card rounded-lg p-6 border border-border shadow-sm flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Room Analysis</h3>

        {/* Column Headers */}
        <div className="grid grid-cols-3 gap-4 text-xs font-semibold text-muted-foreground pb-3 border-b border-border">
          <div>Room Type</div>
          <div>Detected Direction</div>
          <div>Vastu Report</div>
        </div>
      </div>

      {/* Scrollable Table */}
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {roomData.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-3 gap-4 text-sm py-3 px-2 hover:bg-secondary rounded transition border-b border-border last:border-b-0"
          >
            <div className="font-medium text-foreground">{item.room}</div>
            <div className="text-muted-foreground">{item.direction}</div>
            <div className="flex items-center gap-2">
              <StatusIcon status={item.status} />
              <span className="text-muted-foreground capitalize text-xs">
                {item.status === 'inauspicious' ? 'Inauspicious' : item.status === 'favourable' ? 'Favourable' : 'Auspicious'}
              </span>
            </div>
          </div>
        ))}
      </div>


    </div>
  )
}
