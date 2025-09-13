import { createClient } from "@/utils/supabase/server"

export interface Roadmap {
  id: number
  name: string
  display_name: string
  description: string
  total_weeks: number
  color_from: string
  color_to: string
}

export interface Skill {
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
}

export interface UserRoadmapData {
  roadmap_id: number
  roadmap_name: string
  roadmap_display_name: string
  roadmap_description: string
  total_weeks: number
  color_from: string
  color_to: string
  current_skill_id: number
  current_sub_skill_id: number
  skip_roadmap: boolean
  skills_completed: number
  total_skills: number
  total_analyses: number
  average_score: number
}

interface FormAnalysisWithSkill {
  id: number
  score: number
  skill_level: string
  created_at: string
  skills: {
    display_name: string
  }[]
}

export async function getAllRoadmaps(): Promise<Roadmap[]> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("roadmaps").select("*").order("id")

  if (error) {
    console.error("Error fetching roadmaps:", error)
    throw error
  }

  return data || []
}

export async function getRoadmapSkills(roadmapId: number): Promise<Skill[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .eq("roadmap_id", roadmapId)
    .order("is_sub_skill, order_index")

  if (error) {
    console.error("Error fetching roadmap skills:", error)
    throw error
  }

  return data || []
}

export async function initializeUserRoadmap(userId: string, roadmapId: number): Promise<void> {
  const supabase = await createClient()

  const { error } = await supabase.rpc("initialize_user_roadmap", {
    p_user_id: userId,
    p_roadmap_id: roadmapId,
  })

  if (error) {
    console.error("Error initializing user roadmap:", error)
    throw error
  }
}

export async function setUserSkipRoadmap(userId: string): Promise<void> {
  const supabase = await createClient()

  const { error } = await supabase.rpc("set_user_skip_roadmap", {
    p_user_id: userId,
  })

  if (error) {
    console.error("Error setting user skip roadmap:", error)
    throw error
  }
}

export async function getUserRoadmapData(userId: string): Promise<UserRoadmapData | null> {
  const supabase = await createClient()

  const { data, error } = await supabase.rpc("get_user_roadmap_data", {
    p_user_id: userId,
  })

  if (error) {
    console.error("Error fetching user roadmap data:", error)
    throw error
  }

  return data?.[0] || null
}

export async function getRoadmapSkillsWithProgress(userId: string, roadmapId: number): Promise<Skill[]> {
  const supabase = await createClient()

  const { data, error } = await supabase.rpc("get_roadmap_skills_with_progress", {
    p_user_id: userId,
    p_roadmap_id: roadmapId,
  })

  if (error) {
    console.error("Error fetching roadmap skills with progress:", error)
    throw error
  }

  return data || []
}

export async function getRecentAnalyses(userId: string, limit = 5): Promise<any[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("form_analyses")
    .select(`
      id,
      score,
      skill_level,
      created_at,
      skills!inner(display_name)
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching recent analyses:", error)
    throw error
  }

  return (
    (data as FormAnalysisWithSkill[])?.map((analysis) => ({
      date: new Date(analysis.created_at).toLocaleDateString(),
      skill: analysis.skills[0]?.display_name || "Unknown Skill",
      score: analysis.score,
    })) || []
  )
}

export async function recordFormAnalysis(
  userId: string,
  skillId: number,
  imageUrl: string,
  processedImageData: string,
  analysisResult: any,
  score: number,
  feedback: string,
  skillLevel: string,
): Promise<number> {
  const supabase = await createClient()

  const { data, error } = await supabase.rpc("record_form_analysis", {
    p_user_id: userId,
    p_skill_id: skillId,
    p_image_url: imageUrl,
    p_processed_image_data: processedImageData,
    p_analysis_result: analysisResult,
    p_score: score,
    p_feedback: feedback,
    p_skill_level: skillLevel,
  })

  if (error) {
    console.error("Error recording form analysis:", error)
    throw error
  }

  return data
}

// Helper function to organize skills into main skills with sub-skills
export function organizeSkillsWithSubSkills(skills: Skill[]): Skill[] {
  const mainSkills = skills.filter((skill) => !skill.is_sub_skill)
  const subSkills = skills.filter((skill) => skill.is_sub_skill)

  return mainSkills.map((mainSkill) => ({
    ...mainSkill,
    subSkills: subSkills.filter((subSkill) => subSkill.parent_skill_id === mainSkill.id),
  })) as any
}
