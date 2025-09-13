"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Share2, RotateCcw } from "lucide-react"
import { MarkdownRenderer } from "./markdown-renderer"

interface AnalysisResultsProps {
  processedImage: string
  feedback: string
}

export function AnalysisResults({ processedImage, feedback }: AnalysisResultsProps) {
  const handleDownload = () => {
    // Simulate download functionality
    console.log("Downloading analysis results...")
  }

  const handleShare = () => {
    // Simulate share functionality
    console.log("Sharing analysis results...")
  }

  return (
    <div className="space-y-4 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-1">
        <Badge variant="secondary" className="text-xs">
          Complete
        </Badge>
        <h2 className="text-lg font-medium">Analysis Results</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Processed Image */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm font-medium">
              <RotateCcw className="h-4 w-4 text-muted-foreground" />
              Analyzed Image
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative">
              <img
                src={processedImage || "/placeholder.svg"}
                alt="Processed skill analysis"
                className="w-full h-auto rounded-b-md"
              />
              <div className="absolute top-2 right-2">
                <Badge className="text-xs">AI Enhanced</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feedback */}
        <Card className="flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-sm font-medium">
              <span>Feedback</span>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={handleShare} className="h-7 w-7 p-0">
                  <Share2 className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="ghost" onClick={handleDownload} className="h-7 w-7 p-0">
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pt-0">
            <div className="max-h-80 overflow-y-auto">
              <MarkdownRenderer content={feedback} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center gap-2 pt-2">
        <Button size="sm">Save Progress</Button>
        <Button size="sm" variant="outline">
          Analyze Another
        </Button>
      </div>
    </div>
  )
}
