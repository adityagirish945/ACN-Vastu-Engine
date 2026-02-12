import React from 'react'

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground px-8 py-4 flex items-center border-b border-border">
      {/* Logo */}
      <div className="flex items-center gap-2 font-bold text-lg">
        <img src="/file.svg" alt="ACN Logo" width={48} height={48} className="rounded" />
        <span>ACN-Vastu-Engine</span>
      </div>
    </header>
  )
}
