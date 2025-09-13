import { SkillAnalyzer } from "@/components/skill-analyzer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-medium text-foreground mb-2 text-balance">
            Calisthenics Skill Analyzer
          </h1>
          <p className="text-sm text-muted-foreground max-w-lg mx-auto text-pretty">
            Upload a photo of your skill and get AI-powered feedback to improve your form.
          </p>
        </div>
        <SkillAnalyzer />
      </div>
    </main>
  )
}
