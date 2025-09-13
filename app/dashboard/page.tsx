"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronDown, ChevronRight, Target, Trophy, Clock, Zap } from "lucide-react"

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
  const router = useRouter()

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
    if (type === "push") {
      return {
        id: 1,
        name: "push_static",
        display_name: "Push Static Mastery",
        description: "Build incredible pushing strength through progressive static holds",
        total_weeks: 52,
        color_from: "#c17b5a",
        color_to: "#7a8471",
        current_skill_id: 1,
        skills: [
          {
            id: 1,
            roadmap_id: 1,
            name: "elbow_lever",
            display_name: "Elbow Lever",
            description: "Master the foundation of arm balancing with proper elbow placement",
            icon: "💪",
            difficulty_level: "beginner",
            estimated_weeks: 8,
            order_index: 1,
            is_sub_skill: false,
            status: "current",
            best_score: 75,
            total_attempts: 12,
            subSkills: [
              {
                id: 11,
                roadmap_id: 1,
                name: "elbow_lever_tuck",
                display_name: "Tuck Elbow Lever",
                description: "Learn the basic tucked position",
                icon: "🔥",
                difficulty_level: "beginner",
                estimated_weeks: 3,
                order_index: 1,
                is_sub_skill: true,
                parent_skill_id: 1,
                status: "completed",
                best_score: 85,
                total_attempts: 8,
              },
              {
                id: 12,
                roadmap_id: 1,
                name: "elbow_lever_advanced_tuck",
                display_name: "Advanced Tuck",
                description: "Progress to advanced tuck position",
                icon: "⚡",
                difficulty_level: "beginner",
                estimated_weeks: 3,
                order_index: 2,
                is_sub_skill: true,
                parent_skill_id: 1,
                status: "current",
                best_score: 75,
                total_attempts: 4,
              },
              {
                id: 13,
                roadmap_id: 1,
                name: "elbow_lever_straight",
                display_name: "Straight Elbow Lever",
                description: "Master the full straight position",
                icon: "🎯",
                difficulty_level: "intermediate",
                estimated_weeks: 2,
                order_index: 3,
                is_sub_skill: true,
                parent_skill_id: 1,
                status: "locked",
              },
            ],
          },
          {
            id: 2,
            roadmap_id: 1,
            name: "l_sit",
            display_name: "L-Sit",
            description: "Develop core strength and control with perfect L-sit form",
            icon: "🔥",
            difficulty_level: "intermediate",
            estimated_weeks: 16,
            order_index: 2,
            is_sub_skill: false,
            status: "locked",
            subSkills: [
              {
                id: 21,
                roadmap_id: 1,
                name: "l_sit_support",
                display_name: "Support Hold",
                description: "Build basic support strength",
                icon: "💪",
                difficulty_level: "beginner",
                estimated_weeks: 4,
                order_index: 1,
                is_sub_skill: true,
                parent_skill_id: 2,
                status: "locked",
              },
              {
                id: 22,
                roadmap_id: 1,
                name: "l_sit_tuck",
                display_name: "Tuck L-Sit",
                description: "Progress to tucked L-sit",
                icon: "🔥",
                difficulty_level: "intermediate",
                estimated_weeks: 6,
                order_index: 2,
                is_sub_skill: true,
                parent_skill_id: 2,
                status: "locked",
              },
              {
                id: 23,
                roadmap_id: 1,
                name: "l_sit_full",
                display_name: "Full L-Sit",
                description: "Master the complete L-sit",
                icon: "🎯",
                difficulty_level: "intermediate",
                estimated_weeks: 6,
                order_index: 3,
                is_sub_skill: true,
                parent_skill_id: 2,
                status: "locked",
              },
            ],
          },
          {
            id: 3,
            roadmap_id: 1,
            name: "planche",
            display_name: "Planche",
            description: "The ultimate pushing static hold - the pinnacle of upper body strength",
            icon: "👑",
            difficulty_level: "advanced",
            estimated_weeks: 28,
            order_index: 3,
            is_sub_skill: false,
            status: "locked",
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
              },
            ],
          },
        ],
        overallProgress: 25,
      }
    } else {
      return {
        id: 2,
        name: "pull_static",
        display_name: "Pull Static Mastery",
        description: "Develop incredible pulling strength and back control",
        total_weeks: 36,
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
            estimated_weeks: 16,
            order_index: 1,
            is_sub_skill: false,
            status: "current",
            best_score: 60,
            total_attempts: 6,
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
                best_score: 60,
                total_attempts: 6,
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
            estimated_weeks: 20,
            order_index: 2,
            is_sub_skill: false,
            status: "locked",
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
              },
            ],
          },
        ],
        overallProgress: 15,
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
        return <Clock className="w-5 h-5 text-muted-foreground" />
      default:
        return <Target className="w-5 h-5 text-muted-foreground" />
    }
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
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Image
                src="/kuzan-logo.png"
                alt="KUZAN Logo"
                width={40}
                height={40}
                className="transition-transform duration-300 hover:scale-105"
              />
              <h1 className="font-heading text-2xl font-bold text-foreground">KUZAN</h1>
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
          <p className="text-muted-foreground text-lg">
            Track your progress and master calisthenics skills step by step
          </p>
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
              <Collapsible open={expandedSkills.has(skill.id)} onOpenChange={() => toggleSkillExpansion(skill.id)}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
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
                                : skill.status === "current"
                                  ? 50
                                  : 0}
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
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        View Guide
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        Training Plan
                      </Button>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
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
