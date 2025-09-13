"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface SkillDetail {
  id: string
  name: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced"
  prerequisites: string[]
  benefits: string[]
  estimatedTime: string
}

interface RoadmapDetail {
  type: "push" | "pull"
  title: string
  description: string
  totalTime: string
  skills: SkillDetail[]
  benefits: string[]
}

export default function SkillsPage() {
  const [selectedRoadmap, setSelectedRoadmap] = useState<"push" | "pull" | null>(null)
  const router = useRouter()

  const roadmapData: Record<"push" | "pull", RoadmapDetail> = {
    push: {
      type: "push",
      title: "Push Static Mastery",
      description: "Build incredible pushing strength through progressive static holds",
      totalTime: "6-12 months",
      skills: [
        {
          id: "elbow-lever",
          name: "Elbow Lever",
          description: "Master the foundation of arm balancing with this beginner-friendly static hold",
          difficulty: "beginner",
          prerequisites: ["Basic push-up strength", "Wrist flexibility"],
          benefits: ["Core stability", "Arm balance foundation", "Wrist strength"],
          estimatedTime: "2-4 weeks",
        },
        {
          id: "l-sit",
          name: "L-Sit",
          description: "Develop incredible core strength and control with this intermediate hold",
          difficulty: "intermediate",
          prerequisites: ["Elbow lever", "Hollow body hold", "Support hold"],
          benefits: ["Core strength", "Hip flexor flexibility", "Shoulder stability"],
          estimatedTime: "2-4 months",
        },
        {
          id: "planche",
          name: "Planche",
          description: "The ultimate pushing static hold - a true test of strength and control",
          difficulty: "advanced",
          prerequisites: ["L-sit", "Pseudo planche push-ups", "Handstand"],
          benefits: ["Full body strength", "Advanced body control", "Elite pushing power"],
          estimatedTime: "6-18 months",
        },
      ],
      benefits: [
        "Incredible pushing strength",
        "Advanced body control",
        "Core stability mastery",
        "Impressive static holds",
      ],
    },
    pull: {
      type: "pull",
      title: "Pull Static Mastery",
      description: "Develop incredible pulling strength and back control",
      totalTime: "4-10 months",
      skills: [
        {
          id: "back-lever",
          name: "Back Lever",
          description: "Build posterior chain strength with this challenging pulling static",
          difficulty: "intermediate",
          prerequisites: ["Pull-ups", "German hangs", "Skin the cat"],
          benefits: ["Posterior chain strength", "Shoulder flexibility", "Lat development"],
          estimatedTime: "2-4 months",
        },
        {
          id: "front-lever",
          name: "Front Lever",
          description: "Master the ultimate pulling static - the pinnacle of back strength",
          difficulty: "advanced",
          prerequisites: ["Back lever", "Weighted pull-ups", "Hollow body hold"],
          benefits: ["Elite pulling strength", "Core integration", "Advanced body control"],
          estimatedTime: "4-12 months",
        },
      ],
      benefits: [
        "Elite pulling strength",
        "Posterior chain development",
        "Advanced shoulder mobility",
        "Impressive static holds",
      ],
    },
  }

  const handleSelectRoadmap = (type: "push" | "pull") => {
    localStorage.setItem("selectedSkillType", type)
    router.push("/dashboard")
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-secondary text-secondary-foreground"
      case "intermediate":
        return "bg-primary text-primary-foreground"
      case "advanced":
        return "bg-tertiary text-tertiary-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </Button>
              </Link>
              <Image
                src="/now-logo.png"
                alt="NOW Logo"
                width={40}
                height={40}
                className="transition-transform duration-300 hover:scale-105"
              />
              <h1 className="font-heading text-2xl font-bold text-foreground">Skill Roadmaps</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedRoadmap ? (
          <>
            {/* Overview Section */}
            <div className="mb-8 text-center">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Choose Your Calisthenics Journey</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Select a specialized roadmap designed to take you from beginner to advanced in your chosen discipline
              </p>
            </div>

            {/* Roadmap Selection */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {Object.entries(roadmapData).map(([key, roadmap]) => (
                <Card
                  key={key}
                  className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                  onClick={() => setSelectedRoadmap(key as "push" | "pull")}
                >
                  <CardHeader className="text-center pb-6">
                    <div
                      className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 ${
                        key === "push" ? "bg-primary" : "bg-secondary"
                      }`}
                    >
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {key === "push" ? (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        ) : (
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16l-4-4m0 0l4-4m-4 4h18"
                          />
                        )}
                      </svg>
                    </div>
                    <CardTitle className="font-heading text-2xl text-foreground">{roadmap.title}</CardTitle>
                    <CardDescription className="text-lg">{roadmap.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total Time:</span>
                      <Badge variant="outline">{roadmap.totalTime}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Skills:</span>
                      <Badge variant="outline">{roadmap.skills.length} skills</Badge>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground">Key Benefits:</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {roadmap.benefits.slice(0, 3).map((benefit, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button className="w-full mt-4">View Details</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Detailed Roadmap View */}
            <div className="mb-8">
              <Button variant="ghost" onClick={() => setSelectedRoadmap(null)} className="mb-4 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Overview
              </Button>

              <div className="text-center mb-8">
                <h2 className="font-heading text-3xl font-bold text-foreground mb-2">
                  {roadmapData[selectedRoadmap].title}
                </h2>
                <p className="text-muted-foreground text-lg mb-4">{roadmapData[selectedRoadmap].description}</p>
                <div className="flex items-center justify-center gap-4 text-sm">
                  <Badge variant="outline" className="text-base px-3 py-1">
                    {roadmapData[selectedRoadmap].totalTime}
                  </Badge>
                  <Badge variant="outline" className="text-base px-3 py-1">
                    {roadmapData[selectedRoadmap].skills.length} Skills
                  </Badge>
                </div>
              </div>

              <div className="text-center mb-8">
                <Button size="lg" onClick={() => handleSelectRoadmap(selectedRoadmap)} className="px-8 py-3 text-lg">
                  Start This Journey
                </Button>
              </div>
            </div>

            {/* Skills Breakdown */}
            <div className="space-y-6">
              <h3 className="font-heading text-2xl font-bold text-foreground text-center mb-8">Your Learning Path</h3>

              {roadmapData[selectedRoadmap].skills.map((skill, index) => (
                <Card key={skill.id} className="relative">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-full font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <CardTitle className="font-heading text-xl text-foreground flex items-center gap-3">
                            {skill.name}
                            <Badge className={getDifficultyColor(skill.difficulty)}>{skill.difficulty}</Badge>
                          </CardTitle>
                          <CardDescription className="text-base mt-1">{skill.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-sm">
                        {skill.estimatedTime}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Prerequisites</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {skill.prerequisites.map((prereq, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-secondary rounded-full"></div>
                            {prereq}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Benefits</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        {skill.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Link href="/analyze">
                        <Button className="w-full" size="sm">
                          Practice with Analyzer
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        View Training Guide
                      </Button>
                    </div>
                  </CardContent>

                  {/* Connection Line */}
                  {index < roadmapData[selectedRoadmap].skills.length - 1 && (
                    <div className="absolute left-9 -bottom-6 w-0.5 h-12 bg-border"></div>
                  )}
                </Card>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
