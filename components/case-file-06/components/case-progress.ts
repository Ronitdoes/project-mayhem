export const markCaseCompleted = (caseId: string) => {
  console.log(`Case ${caseId} marked as completed.`);
  if (typeof window !== "undefined") {
    localStorage.setItem(`case_${caseId}_completed`, "true");
  }
};
