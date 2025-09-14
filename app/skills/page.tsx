"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import ReactMarkdown from "react-markdown"

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

interface ModalContent {
    type: "guide" | "training"
    skill: string
    title: string
    content: string
}

export default function SkillsPage() {
    const [selectedRoadmap, setSelectedRoadmap] = useState<"push" | "pull" | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [modalContent, setModalContent] = useState<ModalContent | null>(null)
    const router = useRouter()

    const skillData = {
        "elbow-lever": {
            guide: `# Elbow Lever Guide

## Description
A horizontal balance supported by elbows pressed into the torso.

## Strength Focus
- **Core & hips**: planks, hollow holds, frog stands
- **Shoulders & triceps**: pseudo-planche push-ups, crow pose  
- **Wrists & balance**: wrist circles, finger push-ups

## Tips
Start tucked, progress to straddle/full; warm up wrists.`,

            training: `# Elbow Lever Training Plan

| Week | Goal | Drills |
|------|------|--------|
| 1 | Build base | Wrist mobility, frog stand, planks |
| 2 | Tucked lever | 3×10 s tuck holds, crow pose |
| 3 | Longer tuck holds | Wall-assisted, planche leans |
| 4 | Diagonal lever | 3×10 s diagonal holds |
| 5 | Straddle lever | 5 s holds, continue tuck |
| 6 | Full lever attempts | 3×5 s full, frog stand |
| 7 | Consolidate full | 3×10 s holds |
| 8 | Advance/refine | Longer holds, one-arm trials |`,
        },

        "l-sit": {
            guide: `# L-Sit Guide

## Description
Support on straight arms with legs extended at right angle.

## Strength Focus
- **Shoulders/triceps**: support holds, dips
- **Core/hip flexors**: seated leg lifts, hollow holds
- **Hamstrings**: pike stretches

## Tips
Progress: feet down → tuck → one leg → full.`,

            training: `# L-Sit Training Plan

| Week | Goal | Drills |
|------|------|--------|
| 1 | Support holds | 3×20 s support, planks |
| 2 | Core prep | Leg lifts, knee raises |
| 3 | Tuck L-sit | 3×10 s tuck, hollow rocks |
| 4 | One-leg L-sit | 3×10 s per leg |
| 5 | Partial extension | 3×10 s half-L |
| 6 | Full attempts | 3×5 s holds |
| 7 | Longer holds | 3×15 s |
| 8-10 | Consolidate | 20–30 s full, add V-sit lifts |`,
        },

        planche: {
            guide: `# Planche Guide

## Description
Straight-arm horizontal hold with shoulders leaning forward.

## Strength Focus
- **Shoulders**: planche leans, pseudo-push-ups
- **Core/glutes**: hollow holds, tuck planche
- **Scapula/wrists**: scapular push-ups, wrist prep

## Tips
Hold each progression ~20 s before advancing; 2–3×/week.`,

            training: `# Planche Training Plan (12 weeks; recycle & extend)

| Week | Goal | Drills |
|------|------|--------|
| 1–2 | Prep | Wrist drills, scap push-ups, lean 3×10 s |
| 3–4 | Tuck | Frog stand, tuck 5×5–10 s |
| 5–6 | Adv. tuck | Hips open, pseudo-push-ups |
| 7–8 | Straddle tuck | Straddle knees, 3–5 s holds |
| 9–10 | Straddle planche | Band-assisted, elevated leans |
| 11–12 | Consolidate | 5–10 s straddle, refine form |`,
        },

        "back-lever": {
            guide: `# Back Lever Guide

## Description
Horizontal hold, body facing down, arms behind.

## Strength Focus
- **Shoulders**: skin-the-cat, German hangs
- **Back/lats**: pull-ups, rows, dragon flags
- **Core/glutes**: reverse planks, hollow holds

## Tips
Progress: tuck → advanced tuck → one-leg → straddle → full.`,

            training: `# Back Lever Training Plan

| Week | Goal | Drills |
|------|------|--------|
| 1–2 | Mobility/tuck | German hangs, tuck 3×5–10 s |
| 3–4 | Longer tuck | 3×10–15 s, advanced tuck |
| 5–6 | One-leg | 5–10 s holds, rows |
| 7–8 | Straddle | 3–5 s holds, dragon flags |
| 9–10 | Full attempts | 1–3 s holds, negatives |
| 11–12 | Longer holds | 5–10 s |
| 13–16 | Consolidate | 10–15 s, dynamic raises |`,
        },

        "front-lever": {
            guide: `# Front Lever Guide

## Description
Horizontal hold, body facing up, arms locked overhead.

## Strength Focus
- **Back/lats**: pull-ups, weighted pulls, rows
- **Core**: hollow holds, knee raises, dragon flags
- **Scapula**: scapular pull-ups, lever raises

## Tips
Progress: tuck → advanced tuck → one-leg → straddle → full.`,

            training: `# Front Lever Training Plan

| Week | Goal | Drills |
|------|------|--------|
| 1–2 | Base strength | Pull-ups, rows, hollow holds |
| 3–4 | Tuck | 5–10 s holds, scap pulls |
| 5–6 | Adv. tuck | 5–10 s, weighted pulls |
| 7–8 | One-leg | 3–5 s holds, lever raises |
| 9–10 | Straddle | Band-assist, rows |
| 11–12 | Full attempts | 1–3 s, negatives |
| 13–16 | Consolidate | 5–10 s full, dragon flags |
| 17–20 | Advanced | 10–15 s, one-arm variations |`,
        },
    }

    const roadmapData: Record<"push" | "pull", RoadmapDetail> = {
        push: {
            type: "push",
            title: "Push Static Mastery",
            description: "",
            totalTime: "6-12 months",
            skills: [
                {
                    id: "elbow-lever",
                    name: "Elbow Lever",
                    description: "",
                    difficulty: "beginner",
                    prerequisites: ["Basic push-up strength", "Wrist flexibility"],
                    benefits: ["Core stability", "Arm balance foundation", "Wrist strength"],
                    estimatedTime: "2-4 weeks",
                },
                {
                    id: "l-sit",
                    name: "L-Sit",
                    description: "",
                    difficulty: "intermediate",
                    prerequisites: ["Elbow lever", "Hollow body hold", "Support hold"],
                    benefits: ["Core strength", "Hip flexor flexibility", "Shoulder stability"],
                    estimatedTime: "2-4 months",
                },
                {
                    id: "planche",
                    name: "Planche",
                    description: "",
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
            description: "",
            totalTime: "4-10 months",
            skills: [
                {
                    id: "back-lever",
                    name: "Back Lever",
                    description: "",
                    difficulty: "intermediate",
                    prerequisites: ["Pull-ups", "German hangs", "Skin the cat"],
                    benefits: ["Posterior chain strength", "Shoulder flexibility", "Lat development"],
                    estimatedTime: "2-4 months",
                },
                {
                    id: "front-lever",
                    name: "Front Lever",
                    description: "",
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

    const handleViewTrainingPlan = (skillId: string, skillName: string) => {
        const content = skillData[skillId as keyof typeof skillData]?.training || "Training plan not available"
        setModalContent({
            type: "training",
            skill: skillId,
            title: `${skillName} - Training Plan`,
            content,
        })
        setShowModal(true)
    }

    const parseTrainingPlan = (content: string) => {
        const lines = content.split("\n").filter((line) => line.trim())
        const weeks: Array<{ week: string; goal: string; drills: string }> = []

        for (const line of lines) {
            if (line.includes("|") && !line.includes("---") && !line.includes("Week | Goal | Drills")) {
                const parts = line
                    .split("|")
                    .map((part) => part.trim())
                    .filter((part) => part)
                if (parts.length >= 3) {
                    weeks.push({
                        week: parts[0],
                        goal: parts[1],
                        drills: parts[2],
                    })
                }
            }
        }

        return weeks
    }

    const handleModalClose = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setShowModal(false)
            setModalContent(null)
        }
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
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Back
                                </Button>
                            </Link>
                            {/* <Image
                                src="/now-logo.jpg" // Updated logo path from kuzan-logo.png to now-logo.jpg
                                alt="Now Logo" // Updated alt text from KUZAN to Now
                                width={40}
                                height={40}
                                className="transition-transform duration-300 hover:scale-105"
                            /> */}
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
                                            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 ${key === "push" ? "bg-primary" : "bg-secondary"
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
                                    <CardContent className="space-y-6 flex flex-col h-full">
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
                                        <div className="flex-1 flex items-end">
                                            <Button className="w-full mt-4">View Details</Button>
                                        </div>
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
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full bg-transparent"
                                                onClick={() => handleViewTrainingPlan(skill.id, skill.name)}
                                            >
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

            {/* Modal Overlay */}
            {showModal && modalContent && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={handleModalClose}
                >
                    <div className="bg-card rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b border-border">
                            <h2 className="text-xl font-semibold text-foreground">{modalContent.title}</h2>
                            <Button variant="ghost" size="sm" onClick={() => setShowModal(false)} className="h-8 w-8 p-0">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </Button>
                        </div>
                        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
                            {modalContent.type === "training" ? (
                                <div className="space-y-6">
                                    <h3 className="text-lg font-semibold text-foreground">
                                        {modalContent.title.replace(" - Training Plan", "")} Training Plan
                                    </h3>
                                    <div className="space-y-4">
                                        {parseTrainingPlan(modalContent.content).map((week, index) => (
                                            <div key={index} className="grid grid-cols-[auto_1fr_1fr] gap-6 items-start py-2">
                                                <div className="text-foreground font-medium text-base">{week.week}</div>
                                                <div className="text-foreground font-medium text-base">{week.goal}</div>
                                                <div className="text-muted-foreground text-base">{week.drills}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="prose prose-gray max-w-none dark:prose-invert">
                                    <ReactMarkdown>{modalContent.content}</ReactMarkdown>
                                </div>
                            )}
                        </div>
                        <div className="p-6 border-t border-border">
                            <Button
                                onClick={() => setShowModal(false)}
                                className="w-full bg-foreground text-background hover:bg-foreground/90"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
