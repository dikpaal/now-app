"use client"

import { useState } from "react"
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
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: "elbow-lever",
      name: "Elbow Lever",
      progress: 25,
      entries: [],
    },
    {
      id: "l-sit",
      name: "L-Sit",
      progress: 0,
      entries: [],
    },
    {
      id: "planche",
      name: "Planche",
      progress: 0,
      entries: [],
    },
  ])

  const achievements = [
    {
      id: "first-session",
      title: "First Steps",
      description: "Complete your first training session",
      icon: "🎯",
      unlocked: true,
      unlockedAt: "2024-01-15",
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

  const totalProgress = Math.round(skills.reduce((sum, skill) => sum + skill.progress, 0) / skills.length)
  const completedSkills = skills.filter((skill) => skill.progress === 100).length
  const totalSessions = skills.reduce((sum, skill) => sum + skill.entries.length, 0)

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
                src="/kuzan-logo.png"
                alt="NOW Logo"
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
