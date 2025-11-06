import type { TestPlan } from "./types"

export function getTestPlan(position: string, department: string): TestPlan {
  // Plan 1: Operator – Departemen Produksi (Tests B, C, E)
  if (position === "Operator") {
    return "plan1"
  }

  // Plan 2: Administrasi – Semua Departemen (Tests A, B, C, E)
  if (position === "Administrasi") {
    return "plan2"
  }

  // Plan 3: Group Leader / Supervisor – Semua Departemen (Tests A, B, C, D, E)
  if (position === "Group Leader" || position === "Supervisor") {
    return "plan3"
  }

  return "plan2" // Default
}

export function getTestModules(testPlan: TestPlan): string[] {
  const moduleMap: Record<TestPlan, string[]> = {
    plan1: ["B", "C", "E"], // Operator
    plan2: ["A", "B", "C", "E"], // Administrasi
    plan3: ["A", "B", "C", "D", "E"], // Group Leader / Supervisor
  }
  return moduleMap[testPlan]
}

export function getQuestionCount(testPlan: TestPlan): number {
  const countMap: Record<TestPlan, number> = {
    plan1: 10, // Operator: 10 questions per module
    plan2: 15, // Administrasi: 15 questions per module
    plan3: 20, // Group Leader / Supervisor: 20 questions per module
  }
  return countMap[testPlan]
}
