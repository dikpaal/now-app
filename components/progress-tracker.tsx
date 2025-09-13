"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface ProgressEntry {
    id: string
    date: string
    progress: number
    notes: string
    duration: number // in minutes
    difficulty: number // 1-10 scale
}

interface ProgressTrackerProps {
    skillId: string
    skillName: string
    currentProgress: number
    onProgressUpdate: (newProgress: number, entry: ProgressEntry) => void
}

export function ProgressTracker({ skillId, skillName, currentProgress, onProgressUpdate }: ProgressTrackerProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [newProgress, setNewProgress] = useState([currentProgress])
    const [notes, setNotes] = useState("")
    const [duration, setDuration] = useState([30])
    const [difficulty, setDifficulty] = useState([5])
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async () => {
        setIsSubmitting(true)

        const entry: ProgressEntry = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            progress: newProgress[0],
            notes,
            duration: duration[0],
            difficulty: difficulty[0],
        }

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        onProgressUpdate(newProgress[0], entry)

        // Reset form
        setNotes("")
        setDuration([30])
        setDifficulty([5])
        setIsSubmitting(false)
        setIsOpen(false)
    }

    const getProgressMessage = (progress: number) => {
        if (progress === 0) return "Ready to start your journey!"
        if (progress < 25) return "Great start! Keep building those fundamentals."
        if (progress < 50) return "You're making solid progress! Stay consistent."
        if (progress < 75) return "Excellent work! You're more than halfway there."
        if (progress < 100) return "Almost there! The final push is the hardest."
        return "Congratulations! You've mastered this skill!"
    }

    const getProgressColor = (progress: number) => {
        if (progress < 25) return "text-secondary"
        if (progress < 50) return "text-primary"
        if (progress < 75) return "text-primary"
        return "text-secondary"
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="font-heading text-lg text-foreground">{skillName}</CardTitle>
                    </div>
                    <div className="text-right">
                        <div className={`text-2xl font-bold ${getProgressColor(currentProgress)} mb-1`}>{currentProgress}%</div>
                        <Badge variant="outline" className="text-xs">
                            {currentProgress === 100 ? "Mastered" : "In Progress"}
                        </Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <Progress value={currentProgress} className="h-3" />

                <p className={`text-sm font-medium ${getProgressColor(currentProgress)}`}>
                    {getProgressMessage(currentProgress)}
                </p>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className="w-full" variant={currentProgress === 100 ? "outline" : "default"}>
                            {currentProgress === 100 ? "Update Progress" : "Log Training Session"}
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="font-heading">Update Your Progress</DialogTitle>
                            <DialogDescription>Log your training session and update your progress on {skillName}</DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6 py-4">
                            {/* Progress Slider */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Progress: {newProgress[0]}%</Label>
                                <Slider value={newProgress} onValueChange={setNewProgress} max={100} step={5} className="w-full" />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Beginner</span>
                                    <span>Intermediate</span>
                                    <span>Advanced</span>
                                    <span>Mastered</span>
                                </div>
                            </div>

                            {/* Session Duration */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">Session Duration: {duration[0]} minutes</Label>
                                <Slider value={duration} onValueChange={setDuration} min={5} max={120} step={5} className="w-full" />
                            </div>

                            {/* Difficulty Rating */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">How challenging was today's session? {difficulty[0]}/10</Label>
                                <Slider value={difficulty} onValueChange={setDifficulty} min={1} max={10} step={1} className="w-full" />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Too Easy</span>
                                    <span>Perfect</span>
                                    <span>Too Hard</span>
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="space-y-2">
                                <Label htmlFor="notes" className="text-sm font-medium">
                                    Session Notes (Optional)
                                </Label>
                                <Textarea
                                    id="notes"
                                    placeholder="How did the session go? Any breakthroughs or challenges?"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="min-h-[80px]"
                                />
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1" disabled={isSubmitting}>
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit} className="flex-1" disabled={isSubmitting}>
                                {isSubmitting ? "Saving..." : "Save Progress"}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Quick Actions */}
                <div className="flex gap-2 pt-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => {
                            setNewProgress([Math.min(currentProgress + 5, 100)])
                            setIsOpen(true)
                        }}
                    >
                        Quick +5%
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => {
                            setNewProgress([Math.min(currentProgress + 10, 100)])
                            setIsOpen(true)
                        }}
                    >
                        Breakthrough +10%
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
