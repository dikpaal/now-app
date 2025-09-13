"use client"

import type React from "react"
import { useState, useEffect } from "react"
import confetti from 'canvas-confetti'
import { Upload, Camera, Activity, ChevronDown, ArrowLeft, Target, Zap, BarChart3, Lock, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import ReactMarkdown from "react-markdown"
import Image from "next/image"
import Link from "next/link"

interface AnalysisResult {
  processedImage: string
  analysis: string
  skillLevel: string
  score?: number
  scoreData?: {
    overall_score: number
    is_passing: boolean
    angle_scores: Record<string, any>
    missing_landmarks: string[]
    passing_threshold: number
  }
}

const skillData = {
  planche: {
    id: "planche",
    name: "Planche",
    variations: [
      { id: "planche-lean", name: "Planche lean" },
      { id: "tuck-planche", name: "Tuck planche" },
      { id: "advanced-tuck-planche", name: "Advanced tuck planche" },
      { id: "straddle-planche", name: "Straddle planche" },
      { id: "full-planche", name: "Full planche" },
    ],
  },
  "front-lever": {
    id: "front-lever",
    name: "Front-lever",
    variations: [
      { id: "tuck-front-lever", name: "Tuck front-lever" },
      { id: "advanced-tuck-front-lever", name: "Advanced tuck front-lever" },
      { id: "straddle-front-lever", name: "Straddle front-lever" },
      { id: "full-front-lever", name: "Full front-lever" },
    ],
  },
  "back-lever": {
    id: "back-lever",
    name: "Back-lever",
    variations: [
      { id: "tuck-back-lever", name: "Tuck back-lever" },
      { id: "advanced-tuck-back-lever", name: "Advanced tuck back-lever" },
      { id: "straddle-back-lever", name: "Straddle back-lever" },
      { id: "full-back-lever", name: "Full back-lever" },
    ],
  },
  "elbow-lever": {
    id: "elbow-lever",
    name: "Elbow Lever",
    variations: [],
  },
  "l-sit": {
    id: "l-sit",
    name: "L-Sit",
    variations: [],
  },
}

export default function AnalyzePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [selectedSkill, setSelectedSkill] = useState<string>("")
  const [selectedVariation, setSelectedVariation] = useState<string>("")
  const [showSkillDropdown, setShowSkillDropdown] = useState(false)
  const [showVariationDropdown, setShowVariationDropdown] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const [lockedSkillName, setLockedSkillName] = useState<string>("")

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const skillParam = urlParams.get("skill")
    const skillNameParam = urlParams.get("skillName")
    const lockedParam = urlParams.get("locked")

    if (lockedParam === "true" && skillParam && skillNameParam) {
      setIsLocked(true)
      setLockedSkillName(skillNameParam)

      if (skillParam === "elbow_lever" || skillParam === "l_sit") {
        setSelectedSkill(skillParam)
        setSelectedVariation(skillParam)
      } else if (skillParam.includes("planche")) {
        setSelectedSkill("planche")
        if (skillParam.includes("tuck")) {
          setSelectedVariation("tuck-planche")
        } else if (skillParam.includes("advanced_tuck")) {
          setSelectedVariation("advanced-tuck-planche")
        } else if (skillParam.includes("straddle")) {
          setSelectedVariation("straddle-planche")
        } else if (skillParam.includes("full")) {
          setSelectedVariation("full-planche")
        }
      } else if (skillParam.includes("back_lever")) {
        setSelectedSkill("back-lever")
        if (skillParam.includes("tuck")) {
          setSelectedVariation("tuck-back-lever")
        } else if (skillParam.includes("advanced_tuck")) {
          setSelectedVariation("advanced-tuck-back-lever")
        } else if (skillParam.includes("straddle")) {
          setSelectedVariation("straddle-back-lever")
        } else if (skillParam.includes("full")) {
          setSelectedVariation("full-back-lever")
        }
      } else if (skillParam.includes("front_lever")) {
        setSelectedSkill("front-lever")
        if (skillParam.includes("tuck")) {
          setSelectedVariation("tuck-front-lever")
        } else if (skillParam.includes("advanced_tuck")) {
          setSelectedVariation("advanced-tuck-front-lever")
        } else if (skillParam.includes("straddle")) {
          setSelectedVariation("straddle-front-lever")
        } else if (skillParam.includes("full")) {
          setSelectedVariation("full-front-lever")
        }
      }
    }
  }, [])

  // Trigger confetti when user passes a skill
  useEffect(() => {
    if (result?.scoreData?.is_passing) {
      // Delay the confetti to let the UI render first
      const timer = setTimeout(() => {
        triggerCelebration()
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [result?.scoreData?.is_passing])

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

  const handleSkillSelect = (skillKey: string) => {
    setSelectedSkill(skillKey)
    setSelectedVariation("")
    setShowSkillDropdown(false)
    setShowVariationDropdown(false)
  }

  const handleVariationSelect = (variationId: string) => {
    setSelectedVariation(variationId)
    setShowVariationDropdown(false)
  }

  const analyzeSkill = async () => {
    if (!selectedFile || (!selectedVariation && !isLocked)) return

    setIsProcessing(true)

    try {
      const formData = new FormData()
      formData.append("file", selectedFile)
      formData.append("skill_id", selectedVariation || selectedSkill)

      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      // Convert base64 image to data URL for display
      const processedImageUrl = `data:image/jpeg;base64,${data.processedImage}`

      const result: AnalysisResult = {
        processedImage: processedImageUrl,
        analysis: data.analysis,
        skillLevel: data.skillLevel,
        score: data.score,
        scoreData: data.scoreData,
      }

      setResult(result)
    } catch (error) {
      console.error("Error analyzing image:", error)
      // Fallback to show error message
      const errorResult: AnalysisResult = {
        processedImage: previewUrl || "",
        analysis: `## Analysis Error\n\nSorry, we encountered an error while analyzing your movement. Please try again.\n\n**Error details:** ${error instanceof Error ? error.message : "Unknown error"}\n\n### Troubleshooting:\n- Make sure the Python API server is running on localhost:8000\n- Check your internet connection\n- Try uploading a different image`,
        skillLevel: "Error",
      }
      setResult(errorResult)
    } finally {
      setIsProcessing(false)
    }
  }

  const resetAnalysis = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setResult(null)
    setIsProcessing(false)
    setSelectedSkill("")
    setSelectedVariation("")
  }

  const triggerCelebration = () => {
    // Trigger multiple confetti bursts for celebration
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: colors
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    // Center burst after a short delay
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: colors
      });
    }, 300);
  }

  const handleSignOut = () => {
    // Sign out logic will be implemented by backend
    console.log("Sign out clicked")
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="font-medium font-[family-name:var(--font-inter)]">Back</span>
              </Link>
              <div className="h-6 w-px bg-stone-300" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                  <Activity className="h-4 w-4 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-slate-800 font-[family-name:var(--font-outfit)]">Now</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-600 font-[family-name:var(--font-inter)]">
                <Target className="h-4 w-4" />
                <span>Movement Analyzer</span>
              </div>
              <Button
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="border-2 border-secondary text-secondary bg-white hover:bg-secondary hover:text-primary-foreground font-medium rounded-lg font-[family-name:var(--font-inter)] transition-all duration-300"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-b from-stone-50 to-stone-100 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-medium mb-6 font-[family-name:var(--font-inter)]">
            <Zap className="h-4 w-4" />
            AI-Powered Analysis
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 font-[family-name:var(--font-outfit)] tracking-tight">
            Perfect Your Form
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-[family-name:var(--font-inter)]">
            Upload a photo of your calisthenics movement and receive detailed AI analysis with personalized feedback to
            improve your technique.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Target className="h-4 w-4 text-amber-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-800 font-[family-name:var(--font-outfit)]">
                    Select Movement
                  </h2>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <button
                      onClick={() => !isLocked && setShowSkillDropdown(!showSkillDropdown)}
                      disabled={isLocked}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm border-2 border-stone-200 rounded-xl bg-white transition-all duration-300 shadow-sm ${
                        isLocked
                          ? "cursor-not-allowed opacity-70 bg-stone-50"
                          : "hover:border-amber-300 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isLocked && <Lock className="h-4 w-4 text-stone-500" />}
                        <span
                          className={`font-medium font-[family-name:var(--font-inter)] ${isLocked ? "text-stone-500" : "text-slate-700"}`}
                        >
                          {isLocked && lockedSkillName
                            ? lockedSkillName
                            : selectedSkill
                              ? skillData[selectedSkill as keyof typeof skillData].name
                              : "Choose Movement Type"}
                        </span>
                      </div>
                      <ChevronDown className={`h-4 w-4 ${isLocked ? "text-stone-500" : "text-slate-500"}`} />
                    </button>

                    {showSkillDropdown && !isLocked && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-stone-200 rounded-xl shadow-xl z-10 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                        {Object.entries(skillData).map(([key, skill]) => (
                          <button
                            key={skill.id}
                            onClick={() => handleSkillSelect(key)}
                            className="w-full px-4 py-3 text-sm text-left text-slate-700 hover:bg-amber-50 transition-all duration-200 font-medium font-[family-name:var(--font-inter)]"
                          >
                            {skill.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {selectedSkill && skillData[selectedSkill as keyof typeof skillData]?.variations?.length > 0 && (
                    <div className="relative">
                      <button
                        onClick={() => !isLocked && setShowVariationDropdown(!showVariationDropdown)}
                        disabled={isLocked}
                        className={`w-full flex items-center justify-between px-4 py-3 text-sm border-2 border-stone-200 rounded-xl bg-white transition-all duration-300 shadow-sm ${
                          isLocked
                            ? "cursor-not-allowed opacity-70 bg-stone-50"
                            : "hover:border-amber-300 hover:shadow-md"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {isLocked && <Lock className="h-4 w-4 text-stone-500" />}
                          <span
                            className={`font-medium font-[family-name:var(--font-inter)] ${isLocked ? "text-stone-500" : "text-slate-700"}`}
                          >
                            {selectedVariation
                              ? skillData[selectedSkill as keyof typeof skillData]?.variations?.find(
                                  (v) => v.id === selectedVariation,
                                )?.name || "Unknown variation"
                              : "Choose Progression Level"}
                          </span>
                        </div>
                        <ChevronDown className={`h-4 w-4 ${isLocked ? "text-stone-500" : "text-slate-500"}`} />
                      </button>

                      {showVariationDropdown && !isLocked && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-stone-200 rounded-xl shadow-xl z-10 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                          {skillData[selectedSkill as keyof typeof skillData]?.variations?.map((variation) => (
                            <button
                              key={variation.id}
                              onClick={() => handleVariationSelect(variation.id)}
                              className="w-full px-4 py-3 text-sm text-left text-slate-700 hover:bg-amber-50 transition-all duration-200 font-medium font-[family-name:var(--font-inter)]"
                            >
                              {variation.name}
                            </button>
                          )) || []}
                        </div>
                      )}
                    </div>
                  )}

                  {isLocked && (
                    <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <Lock className="h-4 w-4 text-amber-600" />
                      <span className="text-sm text-amber-700 font-medium">Analyzing: {lockedSkillName}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Camera className="h-4 w-4 text-amber-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-800 font-[family-name:var(--font-outfit)]">
                    Upload Photo
                  </h2>
                </div>

                {!previewUrl ? (
                  <div className="border-2 border-dashed border-stone-300 rounded-xl p-6 text-center hover:border-amber-400 transition-all duration-300 bg-stone-50 hover:bg-amber-50/30">
                    <Camera className="h-10 w-10 text-stone-400 mx-auto mb-3 transition-all duration-300 hover:text-amber-600" />
                    <p className="text-slate-700 mb-2 text-sm font-medium font-[family-name:var(--font-inter)]">
                      Drop your photo here
                    </p>
                    <p className="text-slate-500 mb-4 text-xs font-[family-name:var(--font-inter)]">
                      JPG, PNG up to 10MB
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileInput}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-2 border-amber-400 text-amber-700 bg-white hover:bg-amber-50 font-medium px-6 font-[family-name:var(--font-outfit)] transition-all duration-300"
                    >
                      <label htmlFor="file-upload" className="cursor-pointer">
                        Browse Files
                      </label>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded-xl overflow-hidden bg-stone-100 shadow-md">
                      <Image
                        src={previewUrl || "/placeholder.svg"}
                        alt="Preview"
                        width={300}
                        height={200}
                        className="w-full h-40 object-cover"
                      />
                    </div>
                    <div className="space-y-3">
                      <Button
                        onClick={analyzeSkill}
                        disabled={
                          isProcessing ||
                          (!selectedVariation &&
                            !isLocked &&
                            skillData[selectedSkill as keyof typeof skillData]?.variations?.length > 0)
                        }
                        size="sm"
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg font-[family-name:var(--font-outfit)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? "Analyzing..." : "Analyze Movement"}
                      </Button>
                      {!selectedVariation &&
                        !isLocked &&
                        skillData[selectedSkill as keyof typeof skillData]?.variations?.length > 0 && (
                          <p className="text-xs text-amber-600 text-center font-medium">
                            Please select a movement variation first
                          </p>
                        )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileInput}
                        className="hidden"
                        id="reupload-file"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={resetAnalysis}
                        className="w-full border-2 border-stone-300 text-slate-700 bg-white hover:bg-stone-50 font-medium rounded-lg font-[family-name:var(--font-inter)] transition-all duration-300"
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg bg-white min-h-[600px]">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 text-amber-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-800 font-[family-name:var(--font-outfit)]">
                    Analysis Results
                  </h2>
                </div>

                {isProcessing ? (
                  <div className="flex flex-col items-center justify-center h-96 space-y-6">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-amber-200 border-t-amber-600"></div>
                    <div className="text-center space-y-2">
                      <p className="text-slate-700 text-lg font-medium font-[family-name:var(--font-inter)]">
                        Analyzing your movement...
                      </p>
                      <p className="text-slate-500 text-sm font-[family-name:var(--font-inter)]">
                        Our AI is examining your form and technique
                      </p>
                    </div>
                  </div>
                ) : result ? (
                  <div className="space-y-8">
                    {/* Score Display */}
                    {result.scoreData && (
                      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-6 animate-in fade-in slide-in-from-top-4 duration-700">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${result.scoreData.is_passing ? 'bg-green-500' : 'bg-amber-500'}`}>
                              {result.scoreData.is_passing ? (
                                <CheckCircle className="h-6 w-6 text-white" />
                              ) : (
                                <Target className="h-6 w-6 text-white" />
                              )}
                            </div>
                            <div>
                              <p className="text-sm text-slate-600 font-medium font-[family-name:var(--font-inter)]">
                                Performance Score
                              </p>
                              <p className="text-3xl font-bold text-slate-800 font-[family-name:var(--font-outfit)]">
                                {Math.ceil(result.scoreData.overall_score)}%
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${result.scoreData.is_passing ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                              {result.scoreData.is_passing ? (
                                <>
                                  <CheckCircle className="h-4 w-4" />
                                  PASSING
                                </>
                              ) : (
                                <>
                                  <XCircle className="h-4 w-4" />
                                  NEEDS WORK
                                </>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 mt-1 font-[family-name:var(--font-inter)]">
                              Threshold: {result.scoreData.passing_threshold}%
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600 font-medium">Progress to Pass</span>
                            <span className="text-slate-700 font-bold">{Math.ceil(result.scoreData.overall_score)}/{result.scoreData.passing_threshold}</span>
                          </div>
                          <Progress 
                            value={(result.scoreData.overall_score / result.scoreData.passing_threshold) * 100} 
                            className="h-3"
                          />
                        </div>

                        {result.scoreData.missing_landmarks && result.scoreData.missing_landmarks.length > 0 && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-sm text-red-800 font-medium mb-1">Missing Body Points:</p>
                            <p className="text-xs text-red-600">{result.scoreData.missing_landmarks.join(', ')}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Skill Level Display */}
                    <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl border border-stone-200 animate-in fade-in slide-in-from-top-4 duration-700 delay-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-stone-600 rounded-lg flex items-center justify-center">
                          <BarChart3 className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-600 font-medium font-[family-name:var(--font-inter)]">
                            Current Level
                          </p>
                          <p className="text-xl font-bold text-stone-700 font-[family-name:var(--font-outfit)]">
                            {result.skillLevel}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl overflow-hidden bg-stone-100 shadow-lg animate-in fade-in slide-in-from-top-4 duration-700 delay-150">
                      <Image
                        src={result.processedImage || "/placeholder.svg"}
                        alt="Analysis result"
                        width={300}
                        height={200}
                        className="w-full h-40 object-cover"
                      />
                    </div>

                    <div className="prose prose-slate max-w-none animate-in fade-in slide-in-from-top-4 duration-700 delay-300">
                      <ReactMarkdown
                        components={{
                          h2: ({ children }) => (
                            <h3 className="text-xl font-bold text-slate-800 mb-4 font-[family-name:var(--font-outfit)]">
                              {children}
                            </h3>
                          ),
                          p: ({ children }) => (
                            <p className="text-base text-slate-700 mb-4 leading-relaxed font-[family-name:var(--font-inter)]">
                              {children}
                            </p>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-bold text-slate-800 font-[family-name:var(--font-inter)]">
                              {children}
                            </strong>
                          ),
                          ul: ({ children }) => (
                            <ul className="text-base text-slate-700 space-y-2 mb-6 ml-4 font-[family-name:var(--font-inter)]">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="text-base text-slate-700 space-y-2 mb-6 ml-4 font-[family-name:var(--font-inter)]">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="text-slate-700 leading-relaxed font-[family-name:var(--font-inter)]">
                              {children}
                            </li>
                          ),
                        }}
                      >
                        {result.analysis}
                      </ReactMarkdown>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-96 text-center space-y-6">
                    <div className="w-20 h-20 bg-stone-100 rounded-2xl flex items-center justify-center">
                      <Upload className="h-10 w-10 text-stone-400" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-slate-700 text-lg font-medium font-[family-name:var(--font-inter)]">
                        Ready to analyze your movement
                      </p>
                      <p className="text-slate-500 text-sm max-w-md font-[family-name:var(--font-inter)]">
                        Select your movement type and upload a photo to receive detailed AI-powered form analysis and
                        personalized improvement recommendations.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
