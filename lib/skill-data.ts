export interface SkillVariation {
  id: string
  name: string
}

export interface TrainingWeek {
  week: string
  goal: string
  drills: string
}

export interface SkillGuide {
  description: string
  strengthFocus: string[]
  tips: string
}

export interface SkillData {
  id: string
  name: string
  timeToLearn: string
  category: "push" | "pull"
  guide: SkillGuide
  trainingPlan: TrainingWeek[]
  variations: SkillVariation[]
}

export const skillsData: Record<string, SkillData> = {
  "elbow-lever": {
    id: "elbow-lever",
    name: "Elbow Lever",
    timeToLearn: "4–12 weeks",
    category: "push",
    guide: {
      description: "A horizontal balance supported by elbows pressed into the torso.",
      strengthFocus: [
        "Core & hips: planks, hollow holds, frog stands",
        "Shoulders & triceps: pseudo-planche push-ups, crow pose",
        "Wrists & balance: wrist circles, finger push-ups",
      ],
      tips: "Start tucked, progress to straddle/full; warm up wrists.",
    },
    trainingPlan: [
      { week: "1", goal: "Build base", drills: "Wrist mobility, frog stand, planks" },
      { week: "2", goal: "Tucked lever", drills: "3×10 s tuck holds, crow pose" },
      { week: "3", goal: "Longer tuck holds", drills: "Wall-assisted, planche leans" },
      { week: "4", goal: "Diagonal lever", drills: "3×10 s diagonal holds" },
      { week: "5", goal: "Straddle lever", drills: "5 s holds, continue tuck" },
      { week: "6", goal: "Full lever attempts", drills: "3×5 s full, frog stand" },
      { week: "7", goal: "Consolidate full", drills: "3×10 s holds" },
      { week: "8", goal: "Advance/refine", drills: "Longer holds, one-arm trials" },
    ],
    variations: [],
  },
  "l-sit": {
    id: "l-sit",
    name: "L-Sit",
    timeToLearn: "12–24 weeks",
    category: "push",
    guide: {
      description: "Support on straight arms with legs extended at right angle.",
      strengthFocus: [
        "Shoulders/triceps: support holds, dips",
        "Core/hip flexors: seated leg lifts, hollow holds",
        "Hamstrings: pike stretches",
      ],
      tips: "Progress: feet down → tuck → one leg → full.",
    },
    trainingPlan: [
      { week: "1", goal: "Support holds", drills: "3×20 s support, planks" },
      { week: "2", goal: "Core prep", drills: "Leg lifts, knee raises" },
      { week: "3", goal: "Tuck L-sit", drills: "3×10 s tuck, hollow rocks" },
      { week: "4", goal: "One-leg L-sit", drills: "3×10 s per leg" },
      { week: "5", goal: "Partial extension", drills: "3×10 s half-L" },
      { week: "6", goal: "Full attempts", drills: "3×5 s holds" },
      { week: "7", goal: "Longer holds", drills: "3×15 s" },
      { week: "8–10", goal: "Consolidate", drills: "20–30 s full, add V-sit lifts" },
    ],
    variations: [],
  },
  planche: {
    id: "planche",
    name: "Planche",
    timeToLearn: "26–104 weeks (6 months to 2 years)",
    category: "push",
    guide: {
      description: "Straight-arm horizontal hold with shoulders leaning forward.",
      strengthFocus: [
        "Shoulders: planche leans, pseudo-push-ups",
        "Core/glutes: hollow holds, tuck planche",
        "Scapula/wrists: scapular push-ups, wrist prep",
      ],
      tips: "Hold each progression ~20 s before advancing; 2–3×/week.",
    },
    trainingPlan: [
      { week: "1–2", goal: "Prep", drills: "Wrist drills, scap push-ups, lean 3×10 s" },
      { week: "3–4", goal: "Tuck", drills: "Frog stand, tuck 5×5–10 s" },
      { week: "5–6", goal: "Adv. tuck", drills: "Hips open, pseudo-push-ups" },
      { week: "7–8", goal: "Straddle tuck", drills: "Straddle knees, 3–5 s holds" },
      { week: "9–10", goal: "Straddle planche", drills: "Band-assisted, elevated leans" },
      { week: "11–12", goal: "Consolidate", drills: "5–10 s straddle, refine form" },
    ],
    variations: [
      { id: "planche_lean", name: "Planche lean" },
      { id: "tuck_planche", name: "Tuck planche" },
      { id: "advanced_tuck_planche", name: "Advanced tuck planche" },
      { id: "straddle_planche", name: "Straddle planche" },
      { id: "full_planche", name: "Full planche" },
    ],
  },
  "back-lever": {
    id: "back-lever",
    name: "Back Lever",
    timeToLearn: "12–52 weeks",
    category: "pull",
    guide: {
      description: "Horizontal hold, body facing down, arms behind.",
      strengthFocus: [
        "Shoulders: skin-the-cat, German hangs",
        "Back/lats: pull-ups, rows, dragon flags",
        "Core/glutes: reverse planks, hollow holds",
      ],
      tips: "Progress: tuck → advanced tuck → one-leg → straddle → full.",
    },
    trainingPlan: [
      { week: "1–2", goal: "Mobility/tuck", drills: "German hangs, tuck 3×5–10 s" },
      { week: "3–4", goal: "Longer tuck", drills: "3×10–15 s, advanced tuck" },
      { week: "5–6", goal: "One-leg", drills: "5–10 s holds, rows" },
      { week: "7–8", goal: "Straddle", drills: "3–5 s holds, dragon flags" },
      { week: "9–10", goal: "Full attempts", drills: "1–3 s holds, negatives" },
      { week: "11–12", goal: "Longer holds", drills: "5–10 s" },
      { week: "13–16", goal: "Consolidate", drills: "10–15 s, dynamic raises" },
    ],
    variations: [
      { id: "tuck_back_lever", name: "Tuck back-lever" },
      { id: "advanced_tuck_back_lever", name: "Advanced tuck back-lever" },
      { id: "straddle_back_lever", name: "Straddle back-lever" },
      { id: "full_back_lever", name: "Full back-lever" },
    ],
  },
  "front-lever": {
    id: "front-lever",
    name: "Front Lever",
    timeToLearn: "36–104 weeks (9 months to 2 years)",
    category: "pull",
    guide: {
      description: "Horizontal hold, body facing up, arms locked overhead.",
      strengthFocus: [
        "Back/lats: pull-ups, weighted pulls, rows",
        "Core: hollow holds, knee raises, dragon flags",
        "Scapula: scapular pull-ups, lever raises",
      ],
      tips: "Progress: tuck → advanced tuck → one-leg → straddle → full.",
    },
    trainingPlan: [
      { week: "1–2", goal: "Base strength", drills: "Pull-ups, rows, hollow holds" },
      { week: "3–4", goal: "Tuck", drills: "5–10 s holds, scap pulls" },
      { week: "5–6", goal: "Adv. tuck", drills: "5–10 s, weighted pulls" },
      { week: "7–8", goal: "One-leg", drills: "3–5 s holds, lever raises" },
      { week: "9–10", goal: "Straddle", drills: "Band-assist, rows" },
      { week: "11–12", goal: "Full attempts", drills: "1–3 s, negatives" },
      { week: "13–16", goal: "Consolidate", drills: "5–10 s full, dragon flags" },
      { week: "17–20", goal: "Advanced", drills: "10–15 s, one-arm variations" },
    ],
    variations: [
      { id: "tuck_front_lever", name: "Tuck front-lever" },
      { id: "advanced_tuck_front_lever", name: "Advanced tuck front-lever" },
      { id: "straddle_front_lever", name: "Straddle front-lever" },
      { id: "full_front_lever", name: "Full front-lever" },
    ],
  },
}

// Legacy compatibility - maintain the old structure for existing components
export const skillData = {
  planche: skillsData.planche,
  "front-lever": skillsData["front-lever"],
  "back-lever": skillsData["back-lever"],
  "elbow-lever": skillsData["elbow-lever"],
  "l-sit": skillsData["l-sit"],
}
