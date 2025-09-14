"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronDown, ChevronRight, Target, Trophy, Lock, Zap } from "lucide-react"

interface Skill {
    id: number
    roadmap_id: number
    name: string
    display_name: string
    description: string
    icon: string
    difficulty_level: string
    estimated_weeks: number
    order_index: number
    is_sub_skill: boolean
    parent_skill_id?: number
    status?: "locked" | "current" | "completed"
    best_score?: number
    total_attempts?: number
    started_at?: string
    completed_at?: string
    subSkills?: Skill[]
}

interface Roadmap {
    id: number
    name: string
    display_name: string
    description: string
    total_weeks: number
    color_from: string
    color_to: string
    skills: Skill[]
    overallProgress: number
    current_skill_id?: number
    current_sub_skill_id?: number
}

export default function DashboardPage() {
    const [selectedSkillType, setSelectedSkillType] = useState<"push" | "pull" | null>(null)
    const [roadmap, setRoadmap] = useState<Roadmap | null>(null)
    const [expandedSkills, setExpandedSkills] = useState<Set<number>>(new Set())
    const [isLoading, setIsLoading] = useState(true)
    const [showGuideModal, setShowGuideModal] = useState(false)
    const [modalContent, setModalContent] = useState<{
        type: "guide" | "training"
        skill: string
        title: string
        content: string
    } | null>(null)
    const router = useRouter()

    const skillData = {
        elbow_lever: {
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

        l_sit: {
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

        back_lever: {
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

        front_lever: {
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

    const handleViewGuide = (skillName: string, displayName: string) => {
        const content = skillData[skillName as keyof typeof skillData]?.guide || "Guide not available"
        setModalContent({
            type: "guide",
            skill: skillName,
            title: `${displayName} - Guide`,
            content,
        })
        setShowGuideModal(true)
    }

    const handleViewTrainingPlan = (skillName: string, displayName: string) => {
        const content = skillData[skillName as keyof typeof skillData]?.training || "Training plan not available"
        setModalContent({
            type: "training",
            skill: skillName,
            title: `${displayName} - Training Plan`,
            content,
        })
        setShowGuideModal(true)
    }

    const handleModalClose = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setShowGuideModal(false)
            setModalContent(null)
        }
    }

    useEffect(() => {
        const loadRoadmap = () => {
            const skillType = localStorage.getItem("selectedSkillType") as "push" | "pull" | null

            const defaultSkillType = skillType || "push"

            setSelectedSkillType(defaultSkillType)
            setRoadmap(getRoadmapData(defaultSkillType))

            if (!skillType) {
                localStorage.setItem("selectedSkillType", defaultSkillType)
            }

            setIsLoading(false)
        }

        setTimeout(loadRoadmap, 500)
    }, [])

    const getRoadmapData = (type: "push" | "pull"): Roadmap => {
        const savedRoadmap = localStorage.getItem(`roadmap_${type}`)
        if (savedRoadmap) {
            const roadmap = JSON.parse(savedRoadmap)

            // Remove planche_lean if it exists (cleanup migration)
            if (type === "push" && roadmap.skills) {
                const planche = roadmap.skills.find((skill: any) => skill.name === "planche")
                if (planche && planche.subSkills) {
                    const plancheLeanIndex = planche.subSkills.findIndex((subSkill: any) => subSkill.name === "planche_lean")
                    if (plancheLeanIndex !== -1) {
                        // Remove planche_lean
                        planche.subSkills.splice(plancheLeanIndex, 1)

                        // Update order_index for remaining sub-skills
                        planche.subSkills.forEach((subSkill: any, index: number) => {
                            subSkill.order_index = index + 1
                        })

                        // Save the updated roadmap
                        localStorage.setItem(`roadmap_${type}`, JSON.stringify(roadmap))
                    }
                }
            }

            roadmap.overallProgress = calculateOverallProgress(roadmap)
            return roadmap
        }

        // Return default roadmap data if no saved data exists
        if (type === "push") {
            return {
                id: 1,
                name: "push_static",
                display_name: "Push Static Mastery",
                description: "",
                total_weeks: 102,
                color_from: "#c17b5a",
                color_to: "#7a8471",
                current_skill_id: 1,
                skills: [
                    {
                        id: 1,
                        roadmap_id: 1,
                        name: "elbow_lever",
                        display_name: "Elbow Lever",
                        description: "",
                        icon: "💪",
                        difficulty_level: "beginner",
                        estimated_weeks: 10,
                        order_index: 1,
                        is_sub_skill: false,
                        status: "current",
                        best_score: 0,
                        total_attempts: 0,
                    },
                    {
                        id: 2,
                        roadmap_id: 1,
                        name: "l_sit",
                        display_name: "L-Sit",
                        description: "",
                        icon: "🔥",
                        difficulty_level: "intermediate",
                        estimated_weeks: 18,
                        order_index: 2,
                        is_sub_skill: false,
                        status: "current",
                        best_score: 0,
                        total_attempts: 0,
                    },
                    {
                        id: 3,
                        roadmap_id: 1,
                        name: "planche",
                        display_name: "Planche",
                        description: "The ultimate pushing static hold - the pinnacle of upper body strength",
                        icon: "👑",
                        difficulty_level: "advanced",
                        estimated_weeks: 65,
                        order_index: 3,
                        is_sub_skill: false,
                        status: "locked",
                        best_score: 0,
                        total_attempts: 0,
                        subSkills: [
                            {
                                id: 31,
                                roadmap_id: 1,
                                name: "planche_tuck",
                                display_name: "Tuck Planche",
                                description: "Master the tuck planche position",
                                icon: "🔥",
                                difficulty_level: "intermediate",
                                estimated_weeks: 8,
                                order_index: 1,
                                is_sub_skill: true,
                                parent_skill_id: 3,
                                status: "locked",
                                best_score: 0,
                                total_attempts: 0,
                            },
                            {
                                id: 32,
                                roadmap_id: 1,
                                name: "planche_advanced_tuck",
                                display_name: "Advanced Tuck Planche",
                                description: "Progress to advanced tuck planche",
                                icon: "⚡",
                                difficulty_level: "advanced",
                                estimated_weeks: 7,
                                order_index: 2,
                                is_sub_skill: true,
                                parent_skill_id: 3,
                                status: "locked",
                                best_score: 0,
                                total_attempts: 0,
                            },
                            {
                                id: 33,
                                roadmap_id: 1,
                                name: "planche_straddle",
                                display_name: "Straddle Planche",
                                description: "Master the straddle planche",
                                icon: "🎯",
                                difficulty_level: "advanced",
                                estimated_weeks: 7,
                                order_index: 3,
                                is_sub_skill: true,
                                parent_skill_id: 3,
                                status: "locked",
                                best_score: 0,
                                total_attempts: 0,
                            },
                            {
                                id: 34,
                                roadmap_id: 1,
                                name: "planche_full",
                                display_name: "Full Planche",
                                description: "The ultimate planche achievement",
                                icon: "👑",
                                difficulty_level: "advanced",
                                estimated_weeks: 6,
                                order_index: 4,
                                is_sub_skill: true,
                                parent_skill_id: 3,
                                status: "locked",
                                best_score: 0,
                                total_attempts: 0,
                            },
                        ],
                    },
                ],
                overallProgress: 0,
            }
        } else {
            return {
                id: 2,
                name: "pull_static",
                display_name: "Pull Static Mastery",
                description: "",
                total_weeks: 102,
                color_from: "#7a8471",
                color_to: "#c17b5a",
                current_skill_id: 4,
                skills: [
                    {
                        id: 4,
                        roadmap_id: 2,
                        name: "back_lever",
                        display_name: "Back Lever",
                        description: "Build posterior chain strength and control",
                        icon: "💪",
                        difficulty_level: "intermediate",
                        estimated_weeks: 32,
                        order_index: 1,
                        is_sub_skill: false,
                        status: "current",
                        best_score: 0,
                        total_attempts: 0,
                        subSkills: [
                            {
                                id: 41,
                                roadmap_id: 2,
                                name: "back_lever_tuck",
                                display_name: "Tuck Back Lever",
                                description: "Learn the basic tucked position",
                                icon: "🔥",
                                difficulty_level: "intermediate",
                                estimated_weeks: 4,
                                order_index: 1,
                                is_sub_skill: true,
                                parent_skill_id: 4,
                                status: "current",
                                best_score: 0,
                                total_attempts: 0,
                            },
                            {
                                id: 42,
                                roadmap_id: 2,
                                name: "back_lever_advanced_tuck",
                                display_name: "Advanced Tuck Back Lever",
                                description: "Progress to advanced tuck back lever",
                                icon: "⚡",
                                difficulty_level: "intermediate",
                                estimated_weeks: 4,
                                order_index: 2,
                                is_sub_skill: true,
                                parent_skill_id: 4,
                                status: "locked",
                                best_score: 0,
                                total_attempts: 0,
                            },
                            {
                                id: 43,
                                roadmap_id: 2,
                                name: "back_lever_straddle",
                                display_name: "Straddle Back Lever",
                                description: "Master the straddle back lever",
                                icon: "🎯",
                                difficulty_level: "advanced",
                                estimated_weeks: 4,
                                order_index: 3,
                                is_sub_skill: true,
                                parent_skill_id: 4,
                                status: "locked",
                                best_score: 0,
                                total_attempts: 0,
                            },
                            {
                                id: 44,
                                roadmap_id: 2,
                                name: "back_lever_full",
                                display_name: "Full Back Lever",
                                description: "Master the complete back lever",
                                icon: "👑",
                                difficulty_level: "advanced",
                                estimated_weeks: 4,
                                order_index: 4,
                                is_sub_skill: true,
                                parent_skill_id: 4,
                                status: "locked",
                                best_score: 0,
                                total_attempts: 0,
                            },
                        ],
                    },
                    {
                        id: 5,
                        roadmap_id: 2,
                        name: "front_lever",
                        display_name: "Front Lever",
                        description: "Master the ultimate pulling static hold",
                        icon: "👑",
                        difficulty_level: "advanced",
                        estimated_weeks: 70,
                        order_index: 2,
                        is_sub_skill: false,
                        status: "locked",
                        best_score: 0,
                        total_attempts: 0,
                        subSkills: [
                            {
                                id: 51,
                                roadmap_id: 2,
                                name: "front_lever_tuck",
                                display_name: "Tuck Front Lever",
                                description: "Learn the basic tucked position",
                                icon: "🔥",
                                difficulty_level: "advanced",
                                estimated_weeks: 5,
                                order_index: 1,
                                is_sub_skill: true,
                                parent_skill_id: 5,
                                status: "locked",
                                best_score: 0,
                                total_attempts: 0,
                            },
                            {
                                id: 52,
                                roadmap_id: 2,
                                name: "front_lever_advanced_tuck",
                                display_name: "Advanced Tuck Front Lever",
                                description: "Progress to advanced tuck front lever",
                                icon: "⚡",
                                difficulty_level: "advanced",
                                estimated_weeks: 5,
                                order_index: 2,
                                is_sub_skill: true,
                                parent_skill_id: 5,
                                status: "locked",
                                best_score: 0,
                                total_attempts: 0,
                            },
                            {
                                id: 53,
                                roadmap_id: 2,
                                name: "front_lever_straddle",
                                display_name: "Straddle Front Lever",
                                description: "Master the straddle front lever",
                                icon: "🎯",
                                difficulty_level: "advanced",
                                estimated_weeks: 5,
                                order_index: 3,
                                is_sub_skill: true,
                                parent_skill_id: 5,
                                status: "locked",
                                best_score: 0,
                                total_attempts: 0,
                            },
                            {
                                id: 54,
                                roadmap_id: 2,
                                name: "front_lever_full",
                                display_name: "Full Front Lever",
                                description: "The ultimate pulling achievement",
                                icon: "👑",
                                difficulty_level: "advanced",
                                estimated_weeks: 5,
                                order_index: 4,
                                is_sub_skill: true,
                                parent_skill_id: 5,
                                status: "locked",
                                best_score: 0,
                                total_attempts: 0,
                            },
                        ],
                    },
                ],
                overallProgress: 0,
            }
        }
    }

    const toggleSkillExpansion = (skillId: number) => {
        const newExpanded = new Set(expandedSkills)
        if (newExpanded.has(skillId)) {
            newExpanded.delete(skillId)
        } else {
            newExpanded.add(skillId)
        }
        setExpandedSkills(newExpanded)
    }

    const handleSignOut = () => {
        localStorage.removeItem("selectedSkillType")
        router.push("/auth")
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

    const getStatusIcon = (status?: string) => {
        switch (status) {
            case "completed":
                return <Trophy className="w-5 h-5 text-secondary" />
            case "current":
                return <Zap className="w-5 h-5 text-primary" />
            case "locked":
                return <Lock className="w-5 h-5 text-muted-foreground" />
            default:
                return <Target className="w-5 h-5 text-muted-foreground" />
        }
    }

    const calculateOverallProgress = (roadmap: Roadmap): number => {
        let totalSkills = 0
        let completedSkills = 0

        console.log("[v0] Calculating progress for roadmap:", roadmap.name)

        roadmap.skills.forEach((skill) => {
            if (skill.subSkills && skill.subSkills.length > 0) {
                // For skills with sub-skills, count each sub-skill
                totalSkills += skill.subSkills.length
                const completedSubSkills = skill.subSkills.filter((subSkill) => subSkill.status === "completed").length
                completedSkills += completedSubSkills
                console.log(
                    "[v0] Skill with sub-skills:",
                    skill.name,
                    "Sub-skills:",
                    skill.subSkills.length,
                    "Completed:",
                    completedSubSkills,
                )
                skill.subSkills.forEach((subSkill) => {
                    console.log("[v0] Sub-skill:", subSkill.name, "Status:", subSkill.status)
                })
            } else {
                // For standalone skills
                totalSkills += 1
                if (skill.status === "completed") {
                    completedSkills += 1
                }
                console.log("[v0] Standalone skill:", skill.name, "Status:", skill.status)
            }
        })

        console.log("[v0] Total skills:", totalSkills, "Completed skills:", completedSkills)
        const progress = totalSkills > 0 ? Math.round((completedSkills / totalSkills) * 100) : 0
        console.log("[v0] Calculated progress:", progress + "%")

        return progress
    }

    if (isLoading || !roadmap) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="text-muted-foreground">Loading your roadmap...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Guide/Training Plan Modal Overlay */}
            {showGuideModal && modalContent && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-out"
                    style={{
                        backdropFilter: "blur(8px)",
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                    }}
                    onClick={handleModalClose}
                >
                    <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="p-6 border-b border-stone-200">
                            <h2 className="text-2xl font-bold text-stone-800 font-[family-name:var(--font-outfit)]">
                                {modalContent.title}
                            </h2>
                        </div>
                        <div className="p-6 overflow-y-auto max-h-[60vh]">
                            <div className="prose prose-stone max-w-none">
                                {modalContent.content.split("\n").map((line, index) => {
                                    if (line.startsWith("# ")) {
                                        return (
                                            <h1 key={index} className="text-2xl font-bold text-stone-800 mb-4">
                                                {line.slice(2)}
                                            </h1>
                                        )
                                    } else if (line.startsWith("## ")) {
                                        return (
                                            <h2 key={index} className="text-xl font-semibold text-stone-700 mb-3 mt-6">
                                                {line.slice(3)}
                                            </h2>
                                        )
                                    } else if (line.startsWith("- **")) {
                                        const match = line.match(/- \*\*(.*?)\*\*: (.*)/)
                                        if (match) {
                                            return (
                                                <div key={index} className="mb-2">
                                                    <span className="font-semibold text-stone-800">{match[1]}</span>: {match[2]}
                                                </div>
                                            )
                                        }
                                    } else if (line.startsWith("| Week |") || line.startsWith("|------|")) {
                                        return null // Skip table headers and separators for now
                                    } else if (line.startsWith("|")) {
                                        const cells = line
                                            .split("|")
                                            .map((cell) => cell.trim())
                                            .filter((cell) => cell)
                                        if (cells.length >= 3) {
                                            return (
                                                <div key={index} className="grid grid-cols-3 gap-4 py-2 border-b border-stone-100">
                                                    <div className="font-medium text-stone-800">{cells[0]}</div>
                                                    <div className="text-stone-700">{cells[1]}</div>
                                                    <div className="text-stone-600">{cells[2]}</div>
                                                </div>
                                            )
                                        }
                                    } else if (line.trim()) {
                                        return (
                                            <p key={index} className="text-stone-700 mb-3">
                                                {line}
                                            </p>
                                        )
                                    }
                                    return null
                                })}
                            </div>
                        </div>
                        <div className="p-6 border-t border-stone-200 bg-stone-50">
                            <Button
                                onClick={() => setShowGuideModal(false)}
                                className="w-full bg-stone-800 hover:bg-stone-900 text-white"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <header className="bg-card border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            {/* <Image
                                src="/kuzan-logo.png"
                                alt="Now Logo"
                                width={40}
                                height={40}
                                className="transition-transform duration-300 hover:scale-105"
                            /> */}
                            <h1 className="font-heading text-2xl font-bold text-foreground">NOW</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <nav className="hidden md:flex items-center gap-4">
                                <Link href="/skills">
                                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                                        <Target className="w-4 h-4" />
                                        Roadmaps
                                    </Button>
                                </Link>
                                <Link href="/progress">
                                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                                        <Trophy className="w-4 h-4" />
                                        Progress
                                    </Button>
                                </Link>
                                <Link href="/analyze">
                                    <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                                        <Zap className="w-4 h-4" />
                                        Form Analyzer
                                    </Button>
                                </Link>
                            </nav>
                            <Button variant="outline" onClick={handleSignOut}>
                                Sign Out
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <div className="mb-8">
                    <h2 className="font-heading text-3xl font-bold text-foreground mb-2">Welcome to Your Journey</h2>
                </div>

                {/* Roadmap Overview */}
                <Card className="mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="font-heading text-2xl text-foreground">{roadmap.display_name}</CardTitle>
                                <CardDescription className="text-lg mt-2">{roadmap.description}</CardDescription>
                                <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                                    <span>{roadmap.total_weeks} weeks total</span>
                                    <span>·</span>
                                    <span>{roadmap.skills.length} main skills</span>
                                    <span>·</span>
                                    <span>
                                        {roadmap.skills.reduce((acc, skill) => acc + (skill.subSkills?.length || 0), 0)} sub-skills
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold text-primary mb-1">{roadmap.overallProgress}%</div>
                                <div className="text-sm text-muted-foreground">Overall Progress</div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Progress value={roadmap.overallProgress} className="h-3" />
                    </CardContent>
                </Card>

                {/* Skills with Sub-Skills */}
                <div className="space-y-6">
                    {roadmap.skills.map((skill, index) => (
                        <Card key={skill.id} className="group hover:shadow-lg transition-all duration-300">
                            {skill.name === "elbow_lever" || skill.name === "l_sit" ? (
                                // Standalone skill card without collapsible
                                <>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="text-2xl">{skill.icon}</div>
                                                <div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <CardTitle className="font-heading text-xl text-foreground">{skill.display_name}</CardTitle>
                                                        <Badge className={getDifficultyColor(skill.difficulty_level)}>
                                                            {skill.difficulty_level}
                                                        </Badge>
                                                        {getStatusIcon(skill.status)}
                                                    </div>
                                                    <CardDescription>{skill.description}</CardDescription>
                                                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                                        <span>{skill.estimated_weeks} weeks</span>
                                                        {skill.best_score && (
                                                            <>
                                                                <span>·</span>
                                                                <span>Best: {skill.best_score}%</span>
                                                            </>
                                                        )}
                                                        {skill.total_attempts && (
                                                            <>
                                                                <span>·</span>
                                                                <span>{skill.total_attempts} attempts</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-primary mb-1">
                                                    {skill.status === "completed" ? 100 : skill.best_score || 0}%
                                                </div>
                                                <div className="text-sm text-muted-foreground">Progress</div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        {/* Action Buttons */}
                                        <div className="flex gap-2">
                                            {skill.status !== "locked" && (
                                                <Link
                                                    href={`/analyze?skill=${skill.name}&skillName=${encodeURIComponent(skill.display_name)}&locked=true`}
                                                    className="flex-1"
                                                >
                                                    <Button className="w-full" size="sm">
                                                        Analyze Form
                                                    </Button>
                                                </Link>
                                            )}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1 bg-transparent"
                                                onClick={() => handleViewGuide(skill.name, skill.display_name)}
                                            >
                                                View Guide
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex-1 bg-transparent"
                                                onClick={() => handleViewTrainingPlan(skill.name, skill.display_name)}
                                            >
                                                Training Plan
                                            </Button>
                                        </div>
                                    </CardContent>
                                </>
                            ) : (
                                // Keep planche with collapsible dropdown
                                <Collapsible open={expandedSkills.has(skill.id)} onOpenChange={() => toggleSkillExpansion(skill.id)}>
                                    <CollapsibleTrigger asChild>
                                        <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="text-2xl">{skill.icon}</div>
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <CardTitle className="font-heading text-xl text-foreground">
                                                                {skill.display_name}
                                                            </CardTitle>
                                                            <Badge className={getDifficultyColor(skill.difficulty_level)}>
                                                                {skill.difficulty_level}
                                                            </Badge>
                                                            {getStatusIcon(skill.status)}
                                                        </div>
                                                        <CardDescription>{skill.description}</CardDescription>
                                                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                                            <span>{skill.estimated_weeks} weeks</span>
                                                            <span>·</span>
                                                            <span>{skill.subSkills?.length || 0} sub-skills</span>
                                                            {skill.best_score && (
                                                                <>
                                                                    <span>·</span>
                                                                    <span>Best: {skill.best_score}%</span>
                                                                </>
                                                            )}
                                                            {skill.total_attempts && (
                                                                <>
                                                                    <span>·</span>
                                                                    <span>{skill.total_attempts} attempts</span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="text-right">
                                                        <div className="text-2xl font-bold text-primary mb-1">
                                                            {skill.subSkills
                                                                ? Math.round(
                                                                    (skill.subSkills.filter((s) => s.status === "completed").length /
                                                                        skill.subSkills.length) *
                                                                    100,
                                                                )
                                                                : skill.status === "completed"
                                                                    ? 100
                                                                    : skill.best_score || 0}
                                                            %
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">Progress</div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {skill.subSkills && skill.subSkills.length > 0 && (
                                                            <Badge variant="outline" className="text-xs">
                                                                {skill.subSkills.length} steps
                                                            </Badge>
                                                        )}
                                                        {expandedSkills.has(skill.id) ? (
                                                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                                                        ) : (
                                                            <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardHeader>
                                    </CollapsibleTrigger>

                                    <CollapsibleContent>
                                        <CardContent className="pt-0">
                                            {/* Sub-skills */}
                                            {skill.subSkills && skill.subSkills.length > 0 && (
                                                <div className="space-y-3 mb-6">
                                                    <h4 className="font-medium text-foreground mb-3">Progression Steps:</h4>
                                                    {skill.subSkills.map((subSkill, subIndex) => (
                                                        <div
                                                            key={subSkill.id}
                                                            className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50"
                                                        >
                                                            <div className="flex items-center gap-4">
                                                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium text-sm">
                                                                    {subIndex + 1}
                                                                </div>
                                                                <div className="text-lg">{subSkill.icon}</div>
                                                                <div>
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        <span className="font-medium text-foreground">{subSkill.display_name}</span>
                                                                        <Badge variant="outline" className="text-xs">
                                                                            {subSkill.difficulty_level}
                                                                        </Badge>
                                                                        {getStatusIcon(subSkill.status)}
                                                                    </div>
                                                                    <p className="text-sm text-muted-foreground">{subSkill.description}</p>
                                                                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                                                                        <span>{subSkill.estimated_weeks} weeks</span>
                                                                        {subSkill.best_score && (
                                                                            <>
                                                                                <span>·</span>
                                                                                <span>Best: {subSkill.best_score}%</span>
                                                                            </>
                                                                        )}
                                                                        {subSkill.total_attempts && (
                                                                            <>
                                                                                <span>·</span>
                                                                                <span>{subSkill.total_attempts} attempts</span>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                {subSkill.status !== "locked" && (
                                                                    <Link
                                                                        href={`/analyze?skill=${subSkill.name}&skillName=${encodeURIComponent(subSkill.display_name)}&locked=true`}
                                                                    >
                                                                        <Button size="sm" variant="outline" className="bg-transparent">
                                                                            Practice
                                                                        </Button>
                                                                    </Link>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Action Buttons */}
                                            <div className="flex gap-2">
                                                {skill.status !== "locked" && (
                                                    <Link
                                                        href={`/analyze?skill=${skill.name}&skillName=${encodeURIComponent(skill.display_name)}&locked=true`}
                                                        className="flex-1"
                                                    >
                                                        <Button className="w-full" size="sm">
                                                            Analyze Form
                                                        </Button>
                                                    </Link>
                                                )}
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex-1 bg-transparent"
                                                    onClick={() => handleViewGuide(skill.name, skill.display_name)}
                                                >
                                                    View Guide
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex-1 bg-transparent"
                                                    onClick={() => handleViewTrainingPlan(skill.name, skill.display_name)}
                                                >
                                                    Training Plan
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </CollapsibleContent>
                                </Collapsible>
                            )}
                        </Card>
                    ))}
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    <Card className="text-center">
                        <CardContent className="pt-6">
                            <div className="text-2xl font-bold text-primary mb-1">
                                {roadmap.skills.filter((s) => s.status === "completed").length}
                            </div>
                            <div className="text-sm text-muted-foreground">Skills Mastered</div>
                        </CardContent>
                    </Card>
                    <Card className="text-center">
                        <CardContent className="pt-6">
                            <div className="text-2xl font-bold text-secondary mb-1">
                                {roadmap.skills.filter((s) => s.status === "current").length}
                            </div>
                            <div className="text-sm text-muted-foreground">In Progress</div>
                        </CardContent>
                    </Card>
                    <Card className="text-center">
                        <CardContent className="pt-6">
                            <div className="text-2xl font-bold text-tertiary mb-1">{roadmap.skills.length}</div>
                            <div className="text-sm text-muted-foreground">Total Skills</div>
                        </CardContent>
                    </Card>
                    <Card className="text-center">
                        <CardContent className="pt-6">
                            <div className="text-2xl font-bold text-primary mb-1">0</div>
                            <div className="text-sm text-muted-foreground">Days Streak</div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <Link href="/progress" className="flex-1">
                        <Button className="w-full" size="lg">
                            Track Progress
                        </Button>
                    </Link>
                    <Link href="/skills" className="flex-1">
                        <Button variant="outline" className="w-full bg-transparent" size="lg">
                            View All Skills
                        </Button>
                    </Link>
                    <Link href="/analyze" className="flex-1">
                        <Button variant="outline" className="w-full bg-transparent" size="lg">
                            Analyze Form
                        </Button>
                    </Link>
                </div>
            </main>
        </div>
    )
}