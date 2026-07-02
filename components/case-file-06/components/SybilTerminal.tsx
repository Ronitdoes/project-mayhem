"use client";

import { useState, useEffect } from "react";
import { markCaseCompleted } from "@/components/case-progress";
import Header from "./Header";
import Stage1 from "./stages/Stage1";
import Stage2 from "./stages/Stage2";
import InvestigationTable from "./InvestigationTable";
import Stage3 from "./stages/Stage3";
import Stage4 from "./stages/Stage4";
import Stage5 from "./stages/Stage5";
import Stage6 from "./stages/Stage6";
import Stage7 from "./stages/Stage7";
import Stage8 from "./stages/Stage8";

export default function CaseFile06() {
  const [stage, setStage] = useState<number>(1);
  const [logs, setLogs] = useState<{ id: string; text: string }[]>([]);
  const [sessionTime, setSessionTime] = useState<number>(0);
  const [view, setView] = useState<"terminal" | "table">("terminal");
  const [stage7FilePrinted, setStage7FilePrinted] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Load DB progress on mount
  useEffect(() => {
    async function loadProgress() {
      try {
        const res = await fetch("/api/progress?caseId=06");
        const data = await res.json();
        if (data.success && data.progress?.case6State) {
          const state = data.progress.case6State;
          if (state.stage !== undefined) setStage(state.stage);
          if (Array.isArray(state.logs)) setLogs(state.logs);
          if (state.stage7FilePrinted !== undefined) setStage7FilePrinted(state.stage7FilePrinted);
        }
      } catch (err) {
        console.error("Failed to load Case 6 progress:", err);
      }
    }
    loadProgress();
  }, []);

  // Save progress whenever stage, logs, or stage7FilePrinted change
  useEffect(() => {
    if (stage === 1 && logs.length === 0 && !stage7FilePrinted) return;
    fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ caseId: "06", key: "case6State", value: { stage, logs, stage7FilePrinted } }),
    }).catch((err) => console.error("Failed to save Case 6 progress:", err));
  }, [stage, logs, stage7FilePrinted]);

  // Mark Case 6 completed when reaching Stage 8
  useEffect(() => {
    if (stage === 8) {
      markCaseCompleted("06");
    }
  }, [stage]);

  const addLog = (id: string, text: string) => {
    if (!logs.find(log => log.id === id)) {
      setLogs((prev) => [...prev, { id, text }]);
    }
  };

  const advanceStage = () => {
    setStage((prev) => Math.min(prev + 1, 8));
  };

  const renderStage = () => {
    switch (stage) {
      case 1: return <Stage1 onComplete={advanceStage} onLogRecovered={addLog} />;
      case 2: return <Stage2 onComplete={advanceStage} onLogRecovered={addLog} />;
      case 3: return <Stage3 onComplete={advanceStage} onLogRecovered={addLog} />;
      case 4: return <Stage4 onComplete={advanceStage} onLogRecovered={addLog} />;
      case 5: return <Stage5 onComplete={advanceStage} onLogRecovered={addLog} />;
      case 6: return <Stage6 onComplete={advanceStage} onLogRecovered={addLog} />;
      case 7: return <Stage7 onComplete={advanceStage} onLogRecovered={addLog} setFilePrinted={() => setStage7FilePrinted(true)} />;
      case 8: return <Stage8 onComplete={advanceStage} onLogRecovered={addLog} />;
      default: return <div style={{ padding: "2rem" }}>LOADING STAGE {stage}...</div>;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
      <Header sessionTime={sessionTime} view={view} setView={setView} />
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <div style={{
          display: "flex", 
          width: "200%", 
          height: "100%", 
          transform: view === "terminal" ? "translateX(0)" : "translateX(-50%)",
          transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)" // Smooth sliding animation
        }}>
          <main style={{ width: "50%", height: "100%", position: "relative", padding: "2rem", display: "flex", flexDirection: "column" }}>
            {renderStage()}
          </main>
          <div style={{ width: "50%", height: "100%", position: "relative" }}>
            <InvestigationTable 
              stage={stage} 
              stage7FilePrinted={stage7FilePrinted}
              onComplete={advanceStage}
              onLogRecovered={addLog}
              setView={setView}
              logs={logs}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
