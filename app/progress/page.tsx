"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProgressTracker } from "@/components/progress-tracker"
import { AchievementBadge } from "@/components/achievement-badge"
import Image from "next/image"
import Link from "next/link"

interface ProgressEntry {
    id: string
    date: string
    progress: number
    notes: string
    duration: number
    difficulty: number
}

interface Skill {
    id: string
    name: string
    progress: number
    entries: ProgressEntry[]
}

export default function ProgressPage() {
    const [skills, setSkills] = useState<Skill[]>([])
    const [allSkillsProgress, setAllSkillsProgress] = useState<{ progress: number }[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadProgressData = () => {
            const progressSkills: Skill[] = []
            let allSkillsForProgress: { progress: number }[] = []

            // Load both push and pull roadmap data
            const roadmapTypes = ['push', 'pull'] as const

            roadmapTypes.forEach(type => {
                const savedRoadmap = localStorage.getItem(`roadmap_${type}`)
                if (savedRoadmap) {
                    const roadmap = JSON.parse(savedRoadmap)

                    // Remove planche_lean if it exists (cleanup migration)
                    if (type === "push" && roadmap.skills) {
                        const planche = roadmap.skills.find((skill: any) => skill.name === "planche")
                        if (planche && planche.subSkills) {
                            const plancheLeanIndex = planche.subSkills.findIndex((subSkill: any) => subSkill.name === "planche_lean")
                            if (plancheLeanIndex !== -1) {
                                planche.subSkills.splice(plancheLeanIndex, 1)

                                planche.subSkills.forEach((subSkill: any, index: number) => {
                                    subSkill.order_index = index + 1
                                })

                                localStorage.setItem(`roadmap_${type}`, JSON.stringify(roadmap))
                            }
                        }
                    }

                    // Extract skills from roadmap and convert to progress format
                    roadmap.skills?.forEach((skill: any) => {
                        // For overall progress calculation - include ALL skills
                        if (!skill.subSkills) {
                            // Main skill without sub-skills
                            allSkillsForProgress.push({
                                progress: skill.status === "completed" ? 100 : skill.best_score || 0
                            })
                        } else {
                            // Skill with sub-skills - add each sub-skill to the overall calculation
                            skill.subSkills.forEach((subSkill: any) => {
                                allSkillsForProgress.push({
                                    progress: subSkill.status === "completed" ? 100 : subSkill.best_score || 0
                                })
                            })
                        }

                        // For display - only show unlocked skills
                        if (!skill.subSkills && (skill.status === "completed" || skill.status === "current")) {
                            progressSkills.push({
                                id: skill.name.replace(/_/g, '-'),
                                name: skill.display_name,
                                progress: skill.status === "completed" ? 100 : skill.best_score || 0,
                                entries: [] // We don't have detailed entries yet, but could add them in the future
                            })
                        }

                        // Add sub-skills if they exist and are unlocked
                        if (skill.subSkills) {
                            skill.subSkills.forEach((subSkill: any) => {
                                if (subSkill.status === "completed" || subSkill.status === "current") {
                                    progressSkills.push({
                                        id: subSkill.name.replace(/_/g, '-'),
                                        name: subSkill.display_name,
                                        progress: subSkill.status === "completed" ? 100 : subSkill.best_score || 0,
                                        entries: []
                                    })
                                }
                            })
                        }
                    })
                }
            })

            // Sort skills by progress (highest first) then by name
            progressSkills.sort((a, b) => {
                if (a.progress !== b.progress) {
                    return b.progress - a.progress
                }
                return a.name.localeCompare(b.name)
            })

            setSkills(progressSkills)
            setAllSkillsProgress(allSkillsForProgress) // Store all skills for overall progress calculation
            setIsLoading(false)
        }

        loadProgressData()
    }, [])

    const achievements = [
        {
            id: "first-session",
            title: "First Steps",
            description: "Complete your first training session",
            icon: "🎯",
            unlocked: true,
            unlockedAt: "2025-09-13",
            rarity: "common" as const,
        },
        {
            id: "consistency",
            title: "Consistent",
            description: "Train for 7 days in a row",
            icon: "🔥",
            unlocked: false,
            rarity: "rare" as const,
        },
        {
            id: "first-skill",
            title: "Skill Master",
            description: "Master your first skill",
            icon: "🏆",
            unlocked: false,
            rarity: "epic" as const,
        },
        {
            id: "dedication",
            title: "Dedicated",
            description: "Train for 30 days total",
            icon: "💪",
            unlocked: false,
            rarity: "legendary" as const,
        },
    ]

    const handleProgressUpdate = (skillId: string, newProgress: number, entry: ProgressEntry) => {
        setSkills((prev) =>
            prev.map((skill) =>
                skill.id === skillId ? { ...skill, progress: newProgress, entries: [...skill.entries, entry] } : skill,
            ),
        )
    }

    const totalProgress = allSkillsProgress.length > 0 ? Math.round(allSkillsProgress.reduce((sum, skill) => sum + skill.progress, 0) / allSkillsProgress.length) : 0
    const completedSkills = skills.filter((skill) => skill.progress === 100).length
    const totalSessions = skills.reduce((sum, skill) => sum + skill.entries.length, 0)

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="text-muted-foreground">Loading your progress...</p>
                </div>
            </div>
        )
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
                                    Back to Dashboard
                                </Button>
                            </Link>
                            <Image
                                src="/now-logo.jpg" // Updated logo path from kuzan-logo.png to now-logo.jpg
                                alt="Now Logo" // Updated alt text from KUZAN to Now
                                width={40}
                                height={40}
                                className="transition-transform duration-300 hover:scale-105"
                            />
                            <h1 className="font-heading text-2xl font-bold text-foreground">Progress Tracking</h1>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Overview Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <div className="text-3xl font-bold text-primary mb-1">{totalProgress}%</div>
                            <div className="text-sm text-muted-foreground">Overall Progress</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <div className="text-3xl font-bold text-secondary mb-1">{completedSkills}</div>
                            <div className="text-sm text-muted-foreground">Skills Mastered</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <div className="text-3xl font-bold text-tertiary mb-1">{totalSessions}</div>
                            <div className="text-sm text-muted-foreground">Training Sessions</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <div className="text-3xl font-bold text-primary mb-1">
                                {achievements.filter((a) => a.unlocked).length}
                            </div>
                            <div className="text-sm text-muted-foreground">Achievements</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Progress Trackers */}
                <div className="mb-8">
                    <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Skill Progress</h2>
                    {skills.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {skills.map((skill) => (
                                <ProgressTracker
                                    key={skill.id}
                                    skillId={skill.id}
                                    skillName={skill.name}
                                    currentProgress={skill.progress}
                                    onProgressUpdate={(newProgress, entry) => handleProgressUpdate(skill.id, newProgress, entry)}
                                />
                            ))}
                        </div>
                    ) : (
                        <Card>
                            <CardContent className="pt-8 pb-8 text-center">
                                <div className="text-muted-foreground mb-4">
                                    <svg className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    <p className="text-lg font-medium">No progress data found</p>
                                    <p className="text-sm mt-2">Start analyzing your skills to see progress here!</p>
                                </div>
                                <Link href="/dashboard">
                                    <Button>Go to Dashboard</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Achievements */}
                <div>
                    <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Achievements</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {achievements.map((achievement) => (
                            <AchievementBadge key={achievement.id} achievement={achievement} size="md" />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}
