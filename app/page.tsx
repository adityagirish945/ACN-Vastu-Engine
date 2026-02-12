'use client'

import React from 'react'
import Header from '@/components/Header'
import LeftSidebar from '@/components/LeftSidebar'
import CompassVisualization from '@/components/CompassVisualization'
import RightPanel from '@/components/RightPanel'

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <LeftSidebar />
        <div className="flex-1 flex gap-6 p-8">
          <CompassVisualization />
          <RightPanel />
        </div>
      </div>
    </div>
  )
}
