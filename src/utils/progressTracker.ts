// src/utils/progressTracker.ts

export const markStepAsCompleted = (stepId: string) => {
    if (typeof window !== "undefined") { // Check if running on client-side
      const completedSteps = JSON.parse(localStorage.getItem("completedSteps") || "[]");
      if (!completedSteps.includes(stepId)) {
        completedSteps.push(stepId);
        localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
      }
    }
  };
  
  export const checkIfStepIsCompleted = (stepId: string): boolean => {
    if (typeof window !== "undefined") { // Check if running on client-side
      const completedSteps = JSON.parse(localStorage.getItem("completedSteps") || "[]");
      return completedSteps.includes(stepId);
    }
    return false;
  };
  