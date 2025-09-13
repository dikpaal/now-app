"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: string
  rarity: "common" | "rare" | "epic" | "legendary"
}

interface AchievementBadgeProps {
  achievement: Achievement
  size?: "sm" | "md" | "lg"
}

export function AchievementBadge({ achievement, size = "md" }: AchievementBadgeProps) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-secondary text-secondary-foreground"
      case "rare":
        return "bg-primary text-primary-foreground"
      case "epic":
        return "bg-tertiary text-tertiary-foreground"
      case "legendary":
        return "bg-gradient-to-r from-primary to-secondary text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "sm":
        return "w-16 h-16 text-xs"
      case "lg":
        return "w-24 h-24 text-base"
      default:
        return "w-20 h-20 text-sm"
    }
  }

  return (
    <Card
      className={`${achievement.unlocked ? "opacity-100" : "opacity-50"} transition-all duration-300 hover:scale-105`}
    >
      <CardContent className="p-4 text-center">
        <div
          className={`${getSizeClasses(size)} mx-auto mb-2 rounded-full flex items-center justify-center ${getRarityColor(achievement.rarity)}`}
        >
          <span className="text-2xl">{achievement.icon}</span>
        </div>
        <h4 className="font-heading font-semibold text-foreground mb-1">{achievement.title}</h4>
        <p className="text-xs text-muted-foreground mb-2">{achievement.description}</p>
        <Badge variant="outline" className="text-xs">
          {achievement.rarity}
        </Badge>
        {achievement.unlocked && achievement.unlockedAt && (
          <p className="text-xs text-muted-foreground mt-1">
            Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
