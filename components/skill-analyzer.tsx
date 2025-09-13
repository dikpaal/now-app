"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Camera, Zap, CheckCircle } from "lucide-react"
import { PhotoUpload } from "./photo-upload"
import { AnalysisResults } from "./analysis-results"

interface AnalysisData {
  processedImage: string
  feedback: string
}

export function SkillAnalyzer() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null)

  const handleImageUpload = useCallback((imageUrl: string) => {
    setUploadedImage(imageUrl)
    setAnalysisData(null)
  }, [])

  const handleAnalyze = async () => {
    if (!uploadedImage) return

    setIsProcessing(true)
    setProgress(0)

    // Simulate processing with progress updates
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + Math.random() * 15
      })
    }, 200)

    try {
      // Simulate API call to dummy endpoint
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock response data
      const mockAnalysis: AnalysisData = {
        processedImage: "/calisthenics-skill-analysis-overlay.jpg",
        feedback: `# Skill Analysis Results

## Overall Assessment
Great attempt at the **muscle-up**! Your form shows good potential with some areas for improvement.

## Strengths ✅
- **Grip Position**: Excellent false grip engagement
- **Initial Pull**: Strong pulling phase with good lat activation
- **Core Engagement**: Solid core stability throughout the movement

## Areas for Improvement 🎯

### 1. Transition Phase
- **Issue**: Slight forward lean during the transition
- **Fix**: Focus on keeping your chest closer to the bar
- **Drill**: Practice slow negatives from the top position

### 2. Elbow Position
- **Issue**: Elbows flaring out slightly
- **Fix**: Keep elbows closer to your body during the pull
- **Drill**: Band-assisted muscle-ups focusing on elbow path

### 3. Timing
- **Issue**: Rushing through the transition
- **Fix**: Slow down the movement, focus on control
- **Drill**: Pause at the bottom of the dip position

## Recommended Training Plan

### Week 1-2: Foundation
- **Pull-ups**: 4 sets of 8-12 reps
- **Dips**: 4 sets of 10-15 reps
- **False grip hangs**: 3 sets of 30-45 seconds

### Week 3-4: Transition Work
- **Assisted muscle-ups**: 3 sets of 3-5 reps
- **Chest-to-bar pull-ups**: 4 sets of 5-8 reps
- **Ring/bar transitions**: 3 sets of 5 reps

## Next Steps
Focus on the transition phase drills for the next 2 weeks, then reassess your form. You're very close to achieving a clean muscle-up!

**Estimated time to mastery**: 4-6 weeks with consistent practice.`,
      }

      setProgress(100)
      setTimeout(() => {
        setAnalysisData(mockAnalysis)
        setIsProcessing(false)
        setProgress(0)
      }, 500)
    } catch (error) {
      console.error("Analysis failed:", error)
      setIsProcessing(false)
      setProgress(0)
    }

    clearInterval(progressInterval)
  }

  const handleReset = () => {
    setUploadedImage(null)
    setAnalysisData(null)
    setIsProcessing(false)
    setProgress(0)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-4">
      {/* Upload Section */}
      <Card className="border border-border">
        <CardHeader className="text-center pb-4">
          <CardTitle className="flex items-center justify-center gap-2 text-lg font-medium">
            <Camera className="h-4 w-4 text-muted-foreground" />
            Upload Your Skill Photo
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <PhotoUpload onImageUpload={handleImageUpload} />

          {uploadedImage && (
            <div className="mt-4 text-center">
              <div className="relative inline-block">
                <img
                  src={uploadedImage || "/placeholder.svg"}
                  alt="Uploaded skill"
                  className="max-w-full max-h-48 rounded-md shadow-sm"
                />
                <div className="absolute -top-1 -right-1">
                  <CheckCircle className="h-4 w-4 text-primary bg-background rounded-full" />
                </div>
              </div>
              <div className="mt-3 flex gap-2 justify-center">
                <Button onClick={handleAnalyze} disabled={isProcessing} size="sm">
                  <Zap className="h-3 w-3 mr-1" />
                  {isProcessing ? "Analyzing..." : "Analyze"}
                </Button>
                <Button variant="outline" onClick={handleReset} size="sm">
                  Reset
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Processing Section */}
      {isProcessing && (
        <Card className="border border-border">
          <CardContent className="pt-4 pb-4">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
                <span className="text-sm font-medium">Analyzing...</span>
              </div>
              <Progress value={progress} className="w-full max-w-xs mx-auto h-1" />
              <p className="text-xs text-muted-foreground">Processing your form and technique</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Section */}
      {analysisData && (
        <AnalysisResults processedImage={analysisData.processedImage} feedback={analysisData.feedback} />
      )}
    </div>
  )
}
