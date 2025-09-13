"use client"

import type React from "react"
import { useState } from "react"
import { Upload, Camera, Activity, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ReactMarkdown from "react-markdown"
import Image from "next/image"

interface AnalysisResult {
  processedImage: string
  analysis: string
  skillLevel: string
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
}

export default function CalisthenicsAnalyzer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [selectedSkill, setSelectedSkill] = useState<string>("")
  const [selectedVariation, setSelectedVariation] = useState<string>("")
  const [showSkillDropdown, setShowSkillDropdown] = useState(false)
  const [showVariationDropdown, setShowVariationDropdown] = useState(false)

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
    if (!selectedFile) return

    setIsProcessing(true)

    setTimeout(() => {
      const mockResult: AnalysisResult = {
        processedImage: "/analyzed-calisthenics-movement.jpg",
        analysis: `## Form Analysis\n\n**Overall Assessment:** Good foundation with room for improvement.\n\n### Strengths:\n- Proper hand placement\n- Good core engagement\n- Stable base position\n\n### Areas for Improvement:\n- **Alignment**: Keep your body in a straight line\n- **Breathing**: Remember to breathe consistently\n- **Progression**: Try holding for 5-10 seconds longer\n\n### Next Steps:\n1. Practice wall-supported variations\n2. Focus on slow, controlled movements\n3. Record yourself from different angles`,
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
    setSelectedSkill("")
    setSelectedVariation("")
  }

  return (
    <div className="min-h-screen bg-stone-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
              <Activity className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-wide text-slate-800 uppercase font-[family-name:var(--font-outfit)]">
              Kuzan
            </h1>
          </div>
          <p className="text-slate-600 text-lg max-w-lg mx-auto leading-relaxed font-[family-name:var(--font-inter)]">
            Advanced calisthenics form analysis powered by AI
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-6 tracking-wide font-[family-name:var(--font-outfit)]">
                Movement Analysis
              </h2>

              <div className="space-y-4 mb-6">
                <div className="relative">
                  <button
                    onClick={() => setShowSkillDropdown(!showSkillDropdown)}
                    className="w-full flex items-center justify-between px-4 py-3 text-base border-2 border-amber-200 rounded-xl bg-white hover:border-amber-400 transition-all duration-200 shadow-sm"
                  >
                    <span className="text-slate-700 font-medium font-[family-name:var(--font-inter)]">
                      {selectedSkill ? skillData[selectedSkill as keyof typeof skillData].name : "Select Movement"}
                    </span>
                    <ChevronDown className="h-5 w-5 text-slate-500" />
                  </button>

                  {showSkillDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-amber-200 rounded-xl shadow-xl z-10 overflow-hidden">
                      {Object.entries(skillData).map(([key, skill]) => (
                        <button
                          key={skill.id}
                          onClick={() => handleSkillSelect(key)}
                          className="w-full px-4 py-3 text-base text-left text-slate-700 hover:bg-amber-50 transition-colors font-medium font-[family-name:var(--font-inter)]"
                        >
                          {skill.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {selectedSkill && (
                  <div className="relative">
                    <button
                      onClick={() => setShowVariationDropdown(!showVariationDropdown)}
                      className="w-full flex items-center justify-between px-4 py-3 text-base border-2 border-amber-200 rounded-xl bg-white hover:border-amber-400 transition-all duration-200 shadow-sm"
                    >
                      <span className="text-slate-700 font-medium font-[family-name:var(--font-inter)]">
                        {selectedVariation
                          ? skillData[selectedSkill as keyof typeof skillData].variations.find(
                              (v) => v.id === selectedVariation,
                            )?.name
                          : "Select Progression"}
                      </span>
                      <ChevronDown className="h-5 w-5 text-slate-500" />
                    </button>

                    {showVariationDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-amber-200 rounded-xl shadow-xl z-10 overflow-hidden">
                        {skillData[selectedSkill as keyof typeof skillData].variations.map((variation) => (
                          <button
                            key={variation.id}
                            onClick={() => handleVariationSelect(variation.id)}
                            className="w-full px-4 py-3 text-base text-left text-slate-700 hover:bg-amber-50 transition-colors font-medium font-[family-name:var(--font-inter)]"
                          >
                            {variation.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {!previewUrl ? (
                <div className="border-3 border-dashed border-amber-300 rounded-2xl p-8 text-center hover:border-amber-400 transition-all duration-200 bg-amber-50/30">
                  <Camera className="h-12 w-12 text-amber-600 mx-auto mb-4" />
                  <p className="text-slate-700 mb-4 text-lg font-medium font-[family-name:var(--font-inter)]">
                    Upload Movement Photo
                  </p>
                  <p className="text-slate-500 mb-6 text-sm font-[family-name:var(--font-inter)]">
                    JPG, PNG up to 10MB
                  </p>
                  <input type="file" accept="image/*" onChange={handleFileInput} className="hidden" id="file-upload" />
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-2 border-amber-400 text-amber-700 bg-white hover:bg-amber-50 font-medium px-8 font-[family-name:var(--font-inter)]"
                  >
                    <label htmlFor="file-upload" className="cursor-pointer">
                      Choose File
                    </label>
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="rounded-2xl overflow-hidden bg-amber-100 shadow-lg">
                    <Image
                      src={previewUrl || "/placeholder.svg"}
                      alt="Preview"
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button
                      onClick={analyzeSkill}
                      disabled={isProcessing}
                      size="lg"
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-xl shadow-lg font-[family-name:var(--font-inter)]"
                    >
                      {isProcessing ? "Analyzing..." : "Analyze Movement"}
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={resetAnalysis}
                      className="border-2 border-slate-300 text-slate-700 bg-white hover:bg-slate-50 font-medium px-6 rounded-xl font-[family-name:var(--font-inter)]"
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-6 tracking-wide font-[family-name:var(--font-outfit)]">
                Form Analysis
              </h2>

              {isProcessing ? (
                <div className="flex flex-col items-center justify-center h-64 space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-200 border-t-amber-600"></div>
                  <p className="text-slate-600 text-lg font-medium font-[family-name:var(--font-inter)]">
                    Analyzing your form...
                  </p>
                  <p className="text-slate-500 text-sm font-[family-name:var(--font-inter)]">
                    This may take a few moments
                  </p>
                </div>
              ) : result ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 pb-4 border-b-2 border-amber-200">
                    <span className="text-sm text-slate-600 font-medium uppercase tracking-wide font-[family-name:var(--font-inter)]">
                      Skill Level:
                    </span>
                    <span className="text-lg font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full font-[family-name:var(--font-outfit)]">
                      {result.skillLevel}
                    </span>
                  </div>

                  <div className="rounded-2xl overflow-hidden bg-amber-100 shadow-lg">
                    <Image
                      src={result.processedImage || "/placeholder.svg"}
                      alt="Analysis result"
                      width={400}
                      height={160}
                      className="w-full h-40 object-cover"
                    />
                  </div>

                  <div className="prose prose-slate max-w-none">
                    <ReactMarkdown
                      components={{
                        h2: ({ children }) => (
                          <h3 className="text-lg font-bold text-slate-800 mb-3 tracking-wide font-[family-name:var(--font-outfit)]">
                            {children}
                          </h3>
                        ),
                        p: ({ children }) => (
                          <p className="text-base text-slate-700 mb-3 leading-relaxed font-[family-name:var(--font-inter)]">
                            {children}
                          </p>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-bold text-slate-800 font-[family-name:var(--font-inter)]">
                            {children}
                          </strong>
                        ),
                        ul: ({ children }) => (
                          <ul className="text-base text-slate-700 space-y-2 mb-4 ml-4 font-[family-name:var(--font-inter)]">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="text-base text-slate-700 space-y-2 mb-4 ml-4 font-[family-name:var(--font-inter)]">
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
                <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
                  <Upload className="h-16 w-16 text-amber-400" />
                  <p className="text-slate-600 text-lg font-medium font-[family-name:var(--font-inter)]">
                    Ready for Analysis
                  </p>
                  <p className="text-slate-500 text-sm max-w-xs font-[family-name:var(--font-inter)]">
                    Upload a photo of your movement to receive detailed form feedback
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
