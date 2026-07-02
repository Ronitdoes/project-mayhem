"use client";

import React, { useState } from "react";
import { FakeLoginPuzzle } from "@/components/case-file-04";
import { markCaseCompleted } from "@/components/case-progress";

export default function StandaloneFakeLoginPage() {
  const [solved, setSolved] = useState(false);

  const handleSolved = async () => {
    setSolved(true);
    await markCaseCompleted("04");
    setTimeout(() => {
      window.location.href = "/hunt";
    }, 3000);
  };

  return <FakeLoginPuzzle onSolved={handleSolved} disabled={solved} />;
}
