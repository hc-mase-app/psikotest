export interface ParticipantData {
  name: string
  position: "Operator" | "Administrasi" | "Group Leader" | "Supervisor"
  department: "Produksi" | "SCM" | "Plant" | "HCGA" | "HSE" | "Finance" | "Engineering"
  email: string
  phone: string
}

export interface TestQuestion {
  id: string
  question: string
  options: string[]
  type: "cognitive" | "personality" | "skills" | "rolefit" | "mentalhealth"
  difficulty?: "easy" | "medium" | "hard"
}

export interface VisualIQQuestion {
  id: string
  imageUrl: string
  options: string[]
  correctAnswer: number
}

export interface TestModule {
  id: string
  name: string
  description: string
  type: "A" | "B" | "C" | "D" | "E"
  questions: (TestQuestion | VisualIQQuestion)[]
}

export interface TestResults {
  participantData: ParticipantData
  responses: Record<string, number>
  testModulesTaken: string[]
  completedAt: string
  timingData: Record<string, number>
  totalTimeSpent: number
}

export type TestPlan = "plan1" | "plan2" | "plan3"
