import React from 'react'
import { CheckCircle, Home, Compass, Target, MapPin, FileText } from 'lucide-react'

export default function LeftSidebar() {
  const steps = [
    {
      icon: Home,
      title: 'Upload Floor Plan',
      description: 'Upload your floor plan image (JPG or PNG). Drag and drop or paste to get started.',
      completed: true,
    },
    {
      icon: MapPin,
      title: 'Verify Room Labels',
      description:
        'Review the detected room points on your floor plan. Move points to the correct rooms, add points for missing rooms, or delete incorrect ones.',
      completed: true,
    },
    {
      icon: FileText,
      title: 'Get Report',
      description:
        'Get an instant Vastu summary based on core principles. See insights, imbalances, and recommendations for your home',
      completed: true,
    },
  ]

  return (
    <aside className="w-96 bg-card p-8 border-r border-border">
      <h2 className="text-2xl font-bold text-foreground mb-8">Generate Home's Vaastu Report</h2>

      <div className="space-y-6">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[#1a4d4d] rounded-full flex items-center justify-center text-white mb-2">
                  <Icon size={24} />
                </div>
                {index < steps.length - 1 && <div className="w-1 h-20 bg-[#1a4d4d]" />}
              </div>
              <div className="flex-1 pt-2">
                <h3 className="font-bold text-foreground text-sm mb-1 flex items-center gap-2">
                  {step.title}
                  {step.completed && <CheckCircle size={16} className="text-[#1a4d4d]" />}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </aside>
  )
}
