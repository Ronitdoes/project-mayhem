"use client";

import React, { useState } from "react";

interface Packet {
  id: string;
  timestamp: string;
  sourceIP: string;
  destPort: number;
  protocol: string;
  sequence: number;
  flags: string;
  isAnomaly: boolean;
}

const LOG_DATA: Packet[] = [
  { id: "PKT-01", timestamp: "02:44:12.102", sourceIP: "10.17.4.12", destPort: 8080, protocol: "TCP", sequence: 1017, flags: "SYN", isAnomaly: false },
  { id: "PKT-02", timestamp: "02:44:12.119", sourceIP: "10.17.9.84", destPort: 8080, protocol: "TCP", sequence: 1034, flags: "ACK", isAnomaly: false },
  { id: "PKT-03", timestamp: "02:44:12.136", sourceIP: "10.17.2.19", destPort: 8080, protocol: "TCP", sequence: 1051, flags: "ACK", isAnomaly: false },
  { id: "PKT-04", timestamp: "02:44:12.153", sourceIP: "192.168.1.105", destPort: 443, protocol: "HTTPS", sequence: 9942, flags: "PUSH", isAnomaly: true },
  { id: "PKT-05", timestamp: "02:44:12.170", sourceIP: "10.17.5.33", destPort: 8080, protocol: "TCP", sequence: 1068, flags: "ACK", isAnomaly: false },
  { id: "PKT-06", timestamp: "02:44:12.187", sourceIP: "10.17.1.50", destPort: 8080, protocol: "TCP", sequence: 1085, flags: "FIN", isAnomaly: false },
  { id: "PKT-07", timestamp: "02:44:12.204", sourceIP: "10.17.8.11", destPort: 8080, protocol: "TCP", sequence: 1102, flags: "ACK", isAnomaly: false },
  { id: "PKT-08", timestamp: "02:44:12.221", sourceIP: "10.17.3.76", destPort: 8080, protocol: "TCP", sequence: 1119, flags: "ACK", isAnomaly: false },
];

const HIDDEN_PAYLOAD_MAP = {
  "PKT-01": "CAROUSEL",
  "PKT-02": "TICKET_STUB",
  "PKT-03": "COTTON_CANDY",
  "PKT-04": "INTRUDER_17",
  "PKT-05": "FERRIS_WHEEL",
  "PKT-06": "FUN_HOUSE",
  "PKT-07": "POPCORN_STAND",
  "PKT-08": "MIRROR_MAZE",
};

const PROGRESSIVE_HINTS = [
  "The sign above you isn’t decoration. Read it.",
  "All but one packet carry the carnival’s signature rhythm. Look at the Sequence numbers and subnets (10.17.x.x).",
  "The cards only show the headers. The payload is carried elsewhere on the page's HTML structure.",
  "Open your Browser Developer Tools (F12 / Right Click -> Inspect), check the Elements panel, and find the script block with ID 'hidden-payloads' to reveal the raw string maps!",
];

export default function ShootingRangeLogs() {
  const [selectedPacket, setSelectedPacket] = useState<Packet | null>(null);
  const [hintIndex, setHintIndex] = useState<number>(0);
  const [showSourceHint, setShowSourceHint] = useState<boolean>(false);
  const [answerInput, setAnswerInput] = useState<string>("");
  const [statusState, setStatusState] = useState<"IDLE" | "SUCCESS" | "FAIL">("IDLE");
  const [devToolsOpened, setDevToolsOpened] = useState<boolean>(false);

  const handleTargetSelect = (pkt: Packet) => {
    setSelectedPacket(pkt);
  };

  const triggerSourceHintToggle = () => {
    setShowSourceHint(true);
    setDevToolsOpened(true);
  };

  const verifyPuzzleAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (answerInput.trim().toUpperCase() === "INTRUDER_17") {
      setStatusState("SUCCESS");
    } else {
      setStatusState("FAIL");
      setTimeout(() => setStatusState("IDLE"), 3000);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-between p-4 md:p-8 font-mono select-none relative overflow-x-hidden">
      <script
        id="hidden-payloads"
        type="application/json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HIDDEN_PAYLOAD_MAP, null, 2) }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.07)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0.3)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />

      <header className="w-full max-w-6xl flex flex-col sm:flex-row justify-between items-center border-b border-purple-900/40 pb-4 mb-6 z-10">
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-wider text-purple-400 bg-clip-text">
            CRIMSON CARNIVAL // SEC-SEC-LOGS
          </h1>
          <p className="text-xs text-zinc-500 mt-1">FILE PROFILE: CF-04-AB-2903 // LEVEL_02</p>
        </div>
        <div className="mt-2 sm:mt-0 text-right">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-xs text-purple-300">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            NODE STABILIZATION LOOP: RETRIEVING
          </span>
        </div>
      </header>

      <section className="w-full max-w-4xl text-center mb-8 z-10">
        <div className="bg-red-950/30 border-2 border-dashed border-red-600/50 rounded-lg p-4 md:p-6 shadow-[0_0_25px_rgba(220,38,38,0.05)] relative overflow-hidden group">
          <h2 className="text-red-500 font-extrabold text-sm md:text-lg tracking-widest uppercase animate-pulse">
            “The good ones breathe in steps of SEVENTEEN. The intruder forgets the rhythm.”
          </h2>
          <p className="text-[10px] text-zinc-500 mt-2 tracking-tight uppercase">
            System Analysis Note: The terminal verifies tracking configuration, not bullet accuracy.
          </p>
        </div>
      </section>

      <section className="w-full max-w-6xl bg-zinc-900/30 border border-zinc-800/80 rounded-xl p-6 mb-8 backdrop-blur-sm shadow-inner relative z-10">
        <h3 className="text-xs text-zinc-400 mb-6 uppercase tracking-widest text-center border-b border-zinc-800 pb-2">
          LOG TRACK SELECTION GALLERYPLATES (8 UNITS DETECTED)
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 items-center justify-center">
          {LOG_DATA.map((pkt, index) => (
            <div
              key={pkt.id}
              onClick={() => handleTargetSelect(pkt)}
              className={`flex flex-col items-center cursor-pointer transition-all duration-300 relative group p-2 rounded-lg bg-zinc-950/20 hover:bg-purple-950/10 border ${
                selectedPacket?.id === pkt.id ? 'border-purple-500 bg-purple-950/20 scale-105' : 'border-transparent'
              }`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 relative transition-transform duration-500 group-hover:rotate-12 ${
                pkt.isAnomaly && devToolsOpened
                  ? 'border-pink-500/60 shadow-[0_0_15px_rgba(236,72,153,0.4)] animate-pulse'
                  : 'border-zinc-700 bg-zinc-800/40 group-hover:border-purple-600/50'
              }`}>
                <div className="absolute top-3 left-4 w-2 h-2 rounded-full bg-zinc-950 border border-zinc-800" />
                <div className="absolute bottom-4 right-3 w-1.5 h-1.5 rounded-full bg-zinc-950 border border-zinc-700" />
                <div className="w-8 h-8 rounded-full border border-dashed border-zinc-600/30 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-zinc-500 group-hover:text-purple-400 transition-colors">0{index + 1}</span>
                </div>
              </div>
              <div className="mt-3 text-center">
                <span className="text-[11px] font-bold tracking-wider text-zinc-400 group-hover:text-zinc-200">
                  {pkt.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-4xl min-h-[180px] bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 md:p-6 mb-8 transition-all duration-300 relative z-10 flex flex-col justify-center items-center">
        {selectedPacket ? (
          <div className="w-full max-w-2xl bg-zinc-950 border border-purple-900/50 rounded-lg p-5 relative shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            <h4 className="text-xs font-bold text-zinc-400 border-b border-zinc-800 pb-2 mb-4 flex justify-between items-center">
              <span>HEADER DUMP: {selectedPacket.id}</span>
              <span className={selectedPacket.isAnomaly ? "text-pink-400 animate-pulse text-[10px]" : "text-zinc-600 text-[10px]"}>
                {selectedPacket.isAnomaly ? "FLAGGED TRAFFIC ANOMALY" : "STABLE CARNIVAL SYSTEM LOG"}
              </span>
            </h4>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6 text-xs md:text-sm">
              <div><span className="text-zinc-500 uppercase text-[11px]">Timestamp:</span> <span className="text-zinc-300 font-bold ml-1">{selectedPacket.timestamp}</span></div>
              <div><span className="text-zinc-500 uppercase text-[11px]">Source IP:</span> <span className="text-zinc-300 font-bold ml-1">{selectedPacket.sourceIP}</span></div>
              <div><span className="text-zinc-500 uppercase text-[11px]">Dest Port:</span> <span className="text-zinc-300 font-bold ml-1">{selectedPacket.destPort}</span></div>
              <div><span className="text-zinc-500 uppercase text-[11px]">Protocol:</span> <span className="text-zinc-300 font-bold ml-1">{selectedPacket.protocol}</span></div>
              <div><span className="text-zinc-500 uppercase text-[11px]">Seq Number:</span> <span className="text-purple-400 font-bold ml-1">{selectedPacket.sequence}</span></div>
              <div><span className="text-zinc-500 uppercase text-[11px]">TCP Flags:</span> <span className="text-zinc-300 font-bold ml-1">{selectedPacket.flags}</span></div>
            </div>
          </div>
        ) : (
          <div className="text-center text-zinc-500 py-8">
            <p className="text-xs uppercase tracking-widest">Select a shooting target from the shelf above to verify headers</p>
          </div>
        )}
      </section>

      <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 items-start mt-4 z-10">
        
        {/* Left Card: Anomalous Capture Registry Form */}
        <div className="bg-zinc-900/30 border border-zinc-800 p-5 rounded-xl flex flex-col justify-between h-full">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-3">
              ANOMALOUS PAYLOAD CAPTURE REGISTRY
            </h4>
          </div>
          
          <form onSubmit={verifyPuzzleAnswer} className="space-y-3">
            <input 
              type="text" 
              placeholder="ENTER ANOMALOUS PAYLOAD VALUE..." 
              value={answerInput} 
              onChange={(e) => setAnswerInput(e.target.value)}
              disabled={statusState === "SUCCESS"}
              className="w-full bg-zinc-950 border border-zinc-800 rounded px-3 py-2 text-xs uppercase tracking-widest text-purple-400 focus:outline-none focus:border-purple-500 transition-colors"
            />
            <button 
              type="submit"
              disabled={statusState === "SUCCESS"}
              className="w-full bg-purple-900/40 hover:bg-purple-800/60 text-purple-300 text-xs font-bold uppercase py-2.5 rounded border border-purple-700/50"
            >
              CONTAIN ANOMALY STRUC
            </button>
          </form>

          <div className="mt-4 min-h-[40px] flex items-center justify-center">
            {statusState === "SUCCESS" && (
              <div className="w-full bg-emerald-950/40 border border-emerald-500/50 text-emerald-400 rounded p-2 text-center text-xs font-extrabold tracking-widest animate-bounce">
                {"SEGMENT 02 STABILIZED – ANOMALY CONTAINED"}
              </div>
            )}
            {statusState === "FAIL" && (
              <div className="w-full bg-pink-950/40 border border-pink-500/50 text-pink-400 rounded p-2 text-center text-xs font-extrabold tracking-widest">
                {"PATTERN MISMATCH SYSTEM RETRY INITIATED"}
              </div>
            )}
          </div>
        </div>

        {/* Right Card: Netrunner System Deck Overrides Terminal */}
        <div className="bg-zinc-900/30 border border-zinc-800 p-5 rounded-xl flex flex-col justify-between h-full space-y-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">
              NETRUNNER SYSTEM DECK OVERRIDES
            </h4>
            <div className="min-h-[60px] bg-zinc-950/80 rounded border border-zinc-900 p-3 text-[11px] text-zinc-400 tracking-tight leading-relaxed">
              <span className="text-purple-400 font-bold">INFO_LOG_DECK_HINT:</span> {PROGRESSIVE_HINTS[hintIndex]}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setHintIndex((prev) => (prev + 1) % PROGRESSIVE_HINTS.length)}
              className="flex-1 bg-zinc-950 border border-zinc-800 text-zinc-400 text-[10px] font-bold uppercase py-2 rounded transition-colors hover:bg-zinc-900"
            >
              NEXT PROGRESSIVE HINT
            </button>
            <button
              onClick={triggerSourceHintToggle}
              className="flex-1 bg-purple-950/20 border border-purple-900/40 text-purple-400 text-[10px] font-bold uppercase py-2 rounded transition-colors hover:bg-purple-950/40"
            >
              VIEW PAGE SOURCE ADVICE
            </button>
          </div>
          
          {showSourceHint && (
            <div className="bg-purple-950/10 border border-dashed border-purple-500/30 rounded p-2.5 text-[10px] text-purple-300 uppercase">
              {"Notice: Look for tag container ID \"hidden-payloads\" in DevTools elements."}
            </div>
          )}
        </div>
      </section>

      {/* Decorative Canvas Footer elements metrics block */}
      <footer className="w-full max-w-6xl text-center border-t border-zinc-900 pt-4 mt-8 text-[9px] text-zinc-600 uppercase tracking-widest z-10">
        {"Crimson Carnival Internal Subsystem Terminal Grid V1.8.4 // SECURITY LEVEL CLEARANCE DETECTED"}
      </footer>
    </main>
  );
}
