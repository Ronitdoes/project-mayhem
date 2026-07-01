import React, { useState } from "react";
import { DownloadCard } from "./DownloadCard";
import { AnswerInput } from "./AnswerInput";
import { HintPanel } from "./HintPanel";
import { SuccessModal } from "./SuccessModal";
import { Terminal, Shield } from "lucide-react";

interface ArchiveFragmentPanelProps {
  storyText: string;
  filePath: string;
  hints: string[];
  fileSize?: string;
  statusText?: string;
  onSuccess: () => void;
}

export function ArchiveFragmentPanel({
  storyText,
  filePath,
  hints,
  fileSize = "216 Bytes",
  statusText = "No visible characters",
  onSuccess,
}: ArchiveFragmentPanelProps) {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // Extract the filename from the path
  const fileName = filePath.substring(filePath.lastIndexOf("/") + 1);

  const handleCorrectSubmit = () => {
    setIsSuccessOpen(true);
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-4xl px-4 py-8 select-none font-mono">
      {/* Title & Stage Details */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-cyan-400 text-xs font-semibold tracking-[0.3em] uppercase">
          <Shield size={14} className="animate-pulse" />
          <span>Stage 2: Recovered Archive Fragment</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-widest text-zinc-100 uppercase">
          Archive Decryption
        </h2>
      </div>

      {/* Main Panel Content Split */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-start mt-4">
        {/* Left Column: Story Text Console */}
        <div className="relative bg-zinc-950/75 border border-zinc-800 rounded-xl p-5 md:p-6 backdrop-blur-md shadow-inner text-left flex flex-col h-full min-h-[300px] justify-between group hover:border-cyan-500/20 transition-colors duration-300">
          {/* Top terminal bar */}
          <div className="flex items-center gap-1.5 border-b border-zinc-900 pb-3 mb-4 text-zinc-600 text-xs">
            <Terminal size={14} className="text-zinc-500" />
            <span className="font-bold tracking-widest">CONSOLE_RECEIVER v0.97</span>
          </div>

          {/* Typewriter/Terminal narrative block */}
          <div className="flex-1 text-zinc-300 text-xs md:text-sm leading-relaxed whitespace-pre-wrap font-mono uppercase tracking-wide">
            {storyText}
          </div>

          {/* Console footer status */}
          <div className="border-t border-zinc-900 pt-3 mt-4 text-[10px] text-zinc-500/60 flex justify-between uppercase tracking-widest font-semibold">
            <span>Correlation: Online</span>
            <span>SYSTEM_SECURE</span>
          </div>
        </div>

        {/* Right Column: Interactive Panel */}
        <div className="flex flex-col items-center gap-6">
          {/* Download card */}
          <DownloadCard
            fileName={fileName}
            filePath={filePath}
            fileSize={fileSize}
            statusText={statusText}
          />

          {/* Answer input */}
          <AnswerInput onSubmit={handleCorrectSubmit} />

          {/* Hint panel */}
          <HintPanel hints={hints} />
        </div>
      </div>

      {/* Stage 2 Success Animation modal */}
      <SuccessModal
        isOpen={isSuccessOpen}
        onConfirm={() => {
          setIsSuccessOpen(false);
          onSuccess();
        }}
      />
    </div>
  );
}
