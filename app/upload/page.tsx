'use client'

import React, { useState } from 'react'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && (selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/png')) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && (droppedFile.type === 'image/jpeg' || droppedFile.type === 'image/png')) {
      setFile(droppedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(droppedFile)
    }
  }

  const handleSubmit = async () => {
    if (!file) return

    setLoading(true)
    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      
      if (response.ok) {
        localStorage.setItem('vastuAnalysis', JSON.stringify(data))
        localStorage.setItem('uploadedImage', preview!)
        router.push('/results')
      } else {
        alert('Analysis failed: ' + data.error)
      }
    } catch (error) {
      alert('Error uploading file')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/file.svg" alt="ACN Logo" className="w-10 h-10" />
            <span className="text-xl font-semibold text-gray-900">ACN - Vastu Engine</span>
          </div>
          <nav className="flex gap-8 text-gray-600">
            <a href="#" className="hover:text-gray-900">How It Works</a>
            <a href="#" className="hover:text-gray-900">About</a>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Upload Your Home's Floor Plan</h2>
              <p className="text-gray-600 mb-6">Upload your floor plan image to get Vastu details and recommendations.</p>

              <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-teal-500 transition cursor-pointer">
                <input type="file" id="fileInput" accept="image/jpeg,image/png" onChange={handleFileChange} className="hidden" />
                <label htmlFor="fileInput" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                      <Upload size={32} className="text-gray-400" />
                    </div>
                    <Button className="bg-[#1a4d4d] hover:bg-[#1a4d4d]/90 text-white">Choose File</Button>
                    <p className="text-gray-500 text-sm">or drag & drop JPG, PNG images here to get started.</p>
                  </div>
                </label>
              </div>

              {preview && (
                <div className="mt-6">
                  <img src={preview} alt="Preview" className="w-full rounded-lg border border-gray-300" />
                  <Button onClick={handleSubmit} disabled={loading} className="w-full mt-4 bg-teal-600 hover:bg-teal-700">
                    {loading ? 'Analyzing...' : 'Analyze Floor Plan'}
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Upload Your Home's Floor Plan</h3>
            <p className="text-gray-600 mb-6">Upload your floor plan image to get Vastu details and recommendations for your home.</p>
            <div className="bg-gray-50 rounded-xl p-8 flex items-center justify-center">
              <img src="/WhatsApp Image 2026-02-10 at 11.12.09 (1).jpeg" alt="Floor Plan Example" className="max-w-full h-auto rounded-lg" />
            </div>
            <div className="hidden">
              <svg width="300" height="300" viewBox="0 0 300 300">
                <circle cx="150" cy="150" r="120" fill="none" stroke="#ff9800" strokeWidth="3" />
                <path d="M 150 150 L 150 30 A 120 120 0 0 1 270 150 Z" fill="#ef9a9a" />
                <path d="M 150 150 L 270 150 A 120 120 0 0 1 150 270 Z" fill="#64b5f6" />
                <path d="M 150 150 L 150 270 A 120 120 0 0 1 30 150 Z" fill="#fff59d" />
                <path d="M 150 150 L 30 150 A 120 120 0 0 1 150 30 Z" fill="#81c784" />
                <text x="150" y="15" textAnchor="middle" fill="#333" fontSize="14" fontWeight="bold">N</text>
                <text x="285" y="155" textAnchor="middle" fill="#333" fontSize="14" fontWeight="bold">E</text>
                <text x="150" y="290" textAnchor="middle" fill="#333" fontSize="14" fontWeight="bold">S</text>
                <text x="15" y="155" textAnchor="middle" fill="#333" fontSize="14" fontWeight="bold">W</text>
                <text x="220" y="50" textAnchor="middle" fill="#333" fontSize="12">NE</text>
                <text x="250" y="220" textAnchor="middle" fill="#333" fontSize="12">SE</text>
                <text x="80" y="250" textAnchor="middle" fill="#333" fontSize="12">SW</text>
                <text x="50" y="80" textAnchor="middle" fill="#333" fontSize="12">NW</text>
                <rect x="100" y="90" width="100" height="120" fill="#e0e0e0" stroke="#999" strokeWidth="2" />
                <line x1="150" y1="90" x2="150" y2="210" stroke="#333" strokeWidth="1.5" />
                <line x1="100" y1="130" x2="200" y2="130" stroke="#333" strokeWidth="1.5" />
                <circle cx="125" cy="115" r="3" fill="#4caf50" />
                <circle cx="175" cy="115" r="3" fill="#4caf50" />
                <circle cx="125" cy="155" r="3" fill="#4caf50" />
                <circle cx="175" cy="155" r="3" fill="#4caf50" />
                <circle cx="125" cy="195" r="3" fill="#4caf50" />
                <circle cx="175" cy="195" r="3" fill="#4caf50" />
                <circle cx="150" cy="150" r="5" fill="#ff6b6b" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mb-4">
              <Upload size={24} className="text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Floor Plan</h3>
            <p className="text-gray-600">Drag and drop your house plan (JPG or PNG) to start Vastu analysis.</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Verify Room Labels</h3>
            <p className="text-gray-600">Review and correct room labels on the uploaded floor plan image.</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Vastu Report</h3>
            <p className="text-gray-600">Receive a personalized Vastu report with insights and recommendations.</p>
          </div>
        </div>
      </div>

      <footer className="border-t border-gray-200 bg-white/80 backdrop-blur mt-20">
        <div className="container mx-auto px-6 py-6 flex justify-between items-center text-gray-600 text-sm">
          <p>© 2024 ACN Vastu Engine. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-gray-900">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
