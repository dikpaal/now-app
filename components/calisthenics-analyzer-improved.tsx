"use client"

import type React from "react"
import { useState } from "react"
import { Upload, Camera, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ReactMarkdown from "react-markdown"
import Image from "next/image"

interface AnalysisResult {
  processedImage: string
  analysis: string
  skillLevel: string
}

export default function CalisthenicsAnalyzer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const handleFileSelect = (file: File) => {
    setSelectedFile(file)
    setResult(null)

    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0])
    }
  }

  const analyzeSkill = async () => {
    if (!selectedFile) return

    setIsProcessing(true)

    setTimeout(() => {
      const mockResult: AnalysisResult = {
        processedImage: "/analyzed-calisthenics-movement.jpg",
        analysis: `## Form Analysis

**Overall Assessment:** Good foundation with room for improvement.

### Strengths:
- Proper hand placement
- Good core engagement
- Stable base position

### Areas for Improvement:
- **Alignment**: Keep your body in a straight line
- **Breathing**: Remember to breathe consistently
- **Progression**: Try holding for 5-10 seconds longer

### Next Steps:
1. Practice wall-supported variations
2. Focus on slow, controlled movements
3. Record yourself from different angles`,
        skillLevel: "Intermediate",
      }
      setResult(mockResult)
      setIsProcessing(false)
    }, 2000)
  }

  const resetAnalysis = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setResult(null)
    setIsProcessing(false)
  }

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Activity className="h-5 w-5 text-stone-600" />
            <h1 className="text-xl font-medium text-stone-800">Kuzan</h1>
          </div>
          <p className="text-stone-600 text-sm max-w-md mx-auto">
            Upload a photo of your movement and get feedback on your form
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {/* Upload Section */}
          <Card className="border-stone-200 shadow-sm">
            <CardContent className="p-4">
              <h2 className="text-base font-medium text-stone-800 mb-3">Upload Photo</h2>

              {!previewUrl ? (
                <div className="border-2 border-dashed border-stone-300 rounded-lg p-4 text-center hover:border-stone-400 transition-colors">
                  <Camera className="h-6 w-6 text-stone-400 mx-auto mb-2" />
                  <p className="text-stone-600 mb-2 text-sm">Choose a photo</p>
                  <input type="file" accept="image/*" onChange={handleFileInput} className="hidden" id="file-upload" />
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-stone-300 text-stone-700 bg-transparent text-xs"
                  >
                    <label htmlFor="file-upload" className="cursor-pointer">
                      Browse
                    </label>
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="rounded-lg overflow-hidden bg-stone-100">
                    <Image
                      src={previewUrl || "/placeholder.svg"}
                      alt="Preview"
                      width={300}
                      height={150}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={analyzeSkill}
                      disabled={isProcessing}
                      size="sm"
                      className="flex-1 bg-stone-700 hover:bg-stone-800 text-xs"
                    >
                      {isProcessing ? "Analyzing..." : "Analyze"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetAnalysis}
                      className="border-stone-300 text-stone-700 bg-transparent text-xs"
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="border-stone-200 shadow-sm">
            <CardContent className="p-4">
              <h2 className="text-base font-medium text-stone-800 mb-3">Analysis</h2>

              {isProcessing ? (
                <div className="flex flex-col items-center justify-center h-40 space-y-2">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-stone-300 border-t-stone-600"></div>
                  <p className="text-stone-600 text-xs">Analyzing your form...</p>
                </div>
              ) : result ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-stone-200">
                    <span className="text-xs text-stone-600">Level:</span>
                    <span className="text-xs font-medium text-stone-800">{result.skillLevel}</span>
                  </div>

                  <div className="rounded-lg overflow-hidden bg-stone-100">
                    <Image
                      src={result.processedImage || "/placeholder.svg"}
                      alt="Analysis result"
                      width={300}
                      height={120}
                      className="w-full h-24 object-cover"
                    />
                  </div>

                  <div className="prose prose-sm prose-stone max-w-none">
                    <ReactMarkdown
                      components={{
                        h2: ({ children }) => <h3 className="text-sm font-medium text-stone-800 mb-1">{children}</h3>,
                        p: ({ children }) => <p className="text-xs text-stone-700 mb-1">{children}</p>,
                        strong: ({ children }) => <strong className="font-medium text-stone-800">{children}</strong>,
                        ul: ({ children }) => (
                          <ul className="text-xs text-stone-700 space-y-0.5 mb-2 ml-3">{children}</ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="text-xs text-stone-700 space-y-0.5 mb-2 ml-3">{children}</ol>
                        ),
                        li: ({ children }) => <li className="text-stone-700">{children}</li>,
                      }}
                    >
                      {result.analysis}
                    </ReactMarkdown>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-center space-y-2">
                  <Upload className="h-6 w-6 text-stone-400" />
                  <p className="text-stone-600 text-xs">Upload a photo to get started</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
