"use client";

import React, { useState, useEffect } from "react";
import { useCaseStore } from "../../CaseFileProvider";
import AudioPlayer from "./AudioPlayer";
import WaveformVisualizer from "./WaveformVisualizer";
import { Disc, Film, Cpu } from "lucide-react";

export function WilhelmScream() {
  const solved = useCaseStore((state) => state.solved);
  const isSolved = solved.includes(2); // Puzzle #2 is Wilhelm Scream

  const [isPlaying, setIsPlaying] = useState(false);
  const [playedOnce, setPlayedOnce] = useState(isSolved);

  // Sync state if already solved
  useEffect(() => {
    if (isSolved) {
      setPlayedOnce(true);
    }
  }, [isSolved]);

  const handleAudioEnded = () => {
    setPlayedOnce(true);
  };

  // Movie appearances list
  const movies = [
    { title: "Distant Drums", year: "1951", note: "First Recorded Use" },
    { title: "The Charge at Feather River", year: "1953", note: "Named after Private Wilhelm" },
    { title: "Them!", year: "1954", note: "Classic Sci-Fi" },
    { title: "A Star Is Born", year: "1954", note: "Musical Drama" },
    { title: "Land of the Pharaohs", year: "1955", note: "Historical Epic" },
    { title: "Star Wars: A New Hope", year: "1977", note: "Sound effect revival" },
    { title: "The Empire Strikes Back", year: "1980", note: "Laser gate fall" },
    { title: "Raiders of the Lost Ark", year: "1981", note: "Nazi truck fall" },
    { title: "Poltergeist", year: "1982", note: "Cult Horror" },
    { title: "Return of the Jedi", year: "1983", note: "Sarlacc pit fall" },
    { title: "Indiana Jones & the Temple of Doom", year: "1984", note: "Crocodile pit" },
    { title: "Spaceballs", year: "1987", note: "Mel Brooks Parody" },
    { title: "Aladdin", year: "1992", note: "Disney Animation" },
    { title: "Toy Story", year: "1995", note: "First CGI Animation" },
    { title: "Titanic", year: "1997", note: "Engine room escape" },
    { title: "The Fifth Element", year: "1997", note: "Sci-Fi Action" },
    { title: "The Lord of the Rings: The Two Towers", year: "2002", note: "Helm's Deep battle" },
    { title: "Kill Bill: Volume 1", year: "2003", note: "Crazy 88 fight scene" },
    { title: "Avatar", year: "2009", note: "Sci-Fi Epic" },
    { title: "Once Upon a Time in Hollywood", year: "2019", note: "Tarantino tribute" }
  ];

  return (
    <div className="p-4 sm:p-6 w-full space-y-6 select-text text-zinc-100 font-mono">
      {/* Dynamic Status Banner */}
      <div className={`w-full border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden transition-all duration-300 ${
        isSolved 
          ? "bg-emerald-950/20 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.05)]" 
          : "bg-zinc-950/30 border-zinc-900"
      }`}>
        <div className="space-y-1 relative z-10 text-left">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">
            <Cpu size={14} className={isPlaying ? "animate-spin text-emerald-500" : "text-zinc-500"} />
            SONIC FREQUENCY IDENTIFIER
          </div>
          <h3 className={`text-lg font-bold uppercase tracking-wider ${
            isSolved ? "text-emerald-400" : "text-zinc-200"
          }`}>
            {isSolved 
              ? "ANOMALY RESOLVED // Private Wilhelm Stabilized" 
              : "ACOUSTIC ANALYSIS MODULE ACTIVE"}
          </h3>
          <p className="text-[11px] leading-relaxed text-zinc-400 max-w-2xl">
            {isSolved
              ? "The sound has been identified as the Wilhelm Scream, first used in Distant Drums (1951) and named after Private Wilhelm in the 1953 film. The audio node signature has been locked."
              : "We have intercepted an audio waveform file. Listen to the scream sequence to activate the visualization and review historical metadata to identify the character name."}
          </p>
        </div>

        {/* Status Indicator */}
        <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 bg-black/40 border border-zinc-900 rounded font-bold text-[10px] tracking-wider uppercase select-none">
          <span className={`w-2 h-2 rounded-full ${
            isSolved 
              ? "bg-emerald-500 animate-pulse" 
              : isPlaying
              ? "bg-amber-500 animate-pulse"
              : "bg-zinc-700"
          }`} />
          <span className={isSolved ? "text-emerald-400" : isPlaying ? "text-amber-400" : "text-zinc-500"}>
            {isSolved ? "STABILIZED" : isPlaying ? "PLAYING" : "STANDBY"}
          </span>
        </div>
      </div>

      {/* Grid: Left (Audio & Waveform) & Right (Historical dossier / credit scroll) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Side: Waveform & Audio Player (7 cols) */}
        <div className="lg:col-span-7 w-full flex flex-col gap-4">
          <WaveformVisualizer isPlaying={isPlaying} />
          <AudioPlayer onPlayStateChange={setIsPlaying} onAudioEnded={handleAudioEnded} />
        </div>

        {/* Right Side: Historical credits (5 cols) */}
        <div className="lg:col-span-5 w-full flex flex-col justify-between p-5 bg-zinc-950/40 border border-zinc-900 rounded-lg relative overflow-hidden text-left min-h-[300px]">
          {/* Top text */}
          <div className="relative z-10">
            <h4 className="text-[10px] font-bold text-emerald-500/80 tracking-widest uppercase flex items-center gap-1.5 mb-2 select-none">
              <Film size={12} />
              CINEMATIC HISTOGRAM
            </h4>
            <p className="text-[11px] leading-relaxed text-zinc-400 mb-4">
              This specific scream was recorded by actor Sheb Wooley. When played, we decode the historical record of movies that integrated this legendary sound effect.
            </p>
          </div>

          {/* Vertical Movie Credits Ticker - Only scrolls or shows after played once or if solved */}
          <div className="relative flex-1 border border-zinc-900/60 bg-black/40 rounded p-3 h-36 overflow-hidden flex flex-col justify-center">
            {playedOnce ? (
              <>
                {/* Fade masks */}
                <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
                <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />

                {/* Credit scrolling container */}
                <div className="credits-scroller w-full h-full flex flex-col space-y-4">
                  {movies.concat(movies).map((movie, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[10px] text-zinc-300 font-mono pr-2">
                      <span className="truncate max-w-[160px] text-zinc-200">{movie.title} ({movie.year})</span>
                      <span className="text-zinc-500 text-[8px] italic">{movie.note}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center space-y-2 select-none py-6">
                <Disc size={20} className="mx-auto text-zinc-700 animate-pulse" />
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">
                  PLAY INTERCEPTED AUDIO TO REVEAL dossier
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Global CSS styles for the smooth vertical credits roll */}
      <style jsx global>{`
        @keyframes scroll-credits {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .credits-scroller {
          animation: scroll-credits 20s linear infinite;
        }
        .credits-scroller:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

export default WilhelmScream;
