"use client";

import React, { useState } from "react";
import { GhostPuzzle } from "@/components/case-file-04";
import { markCaseCompleted } from "@/components/case-progress";

export default function StandaloneGhostPage() {
  const [solved, setSolved] = useState(false);

  const handleSolved = async () => {
    setSolved(true);
    await markCaseCompleted("04");
    window.location.href = "/hunt/case-04";
  };

  return <GhostPuzzle onSolved={handleSolved} disabled={solved} />;
}
