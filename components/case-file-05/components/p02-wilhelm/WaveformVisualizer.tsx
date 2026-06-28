"use client";

import React, { useEffect, useRef } from "react";
import { Howler } from "howler";

interface WaveformVisualizerProps {
  isPlaying: boolean;
}

export function WaveformVisualizer({ isPlaying }: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  // Coupling with Howler and drawing real-time waveform
  useEffect(() => {
    if (!isPlaying || !Howler.ctx) {
      return;
    }

    const ctx = Howler.ctx;
    
    // Ensure the context is running
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 512;
    analyser.smoothingTimeConstant = 0.8;
    
    try {
      // Tap into Howler master gain
      Howler.masterGain.connect(analyser);
      analyserRef.current = analyser;
    } catch (err) {
      console.error("Error connecting Howler.masterGain to analyser:", err);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!canvasRef.current) return;
      animationRef.current = requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      // Clear with subtle trail effect
      canvasCtx.fillStyle = "rgba(9, 9, 11, 0.2)";
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw gridlines in background
      canvasCtx.strokeStyle = "rgba(16, 185, 129, 0.05)";
      canvasCtx.lineWidth = 0.5;
      canvasCtx.beginPath();
      // Horizontal center
      canvasCtx.moveTo(0, canvas.height / 2);
      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      // Vertical grid
      for (let x = 50; x < canvas.width; x += 50) {
        canvasCtx.moveTo(x, 0);
        canvasCtx.lineTo(x, canvas.height);
      }
      canvasCtx.stroke();

      // Draw beautiful glow waveform line
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = "#10b981"; // Neon green
      canvasCtx.shadowBlur = 10;
      canvasCtx.shadowColor = "#10b981";

      canvasCtx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          // Add a tiny bit of random ripple if there's audio to make it look alive
          const noise = isPlaying ? (Math.random() - 0.5) * 0.5 : 0;
          canvasCtx.lineTo(x, y + noise);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
      
      // Reset shadow for performance
      canvasCtx.shadowBlur = 0;
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (analyserRef.current) {
        try {
          Howler.masterGain.disconnect(analyserRef.current);
        } catch (e) {
          // ignore
        }
      }
    };
  }, [isPlaying]);

  // Baseline flat state when idle
  useEffect(() => {
    if (isPlaying) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) return;

    // Reset canvas to dark zinc background
    canvasCtx.fillStyle = "#09090b";
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw dark gridlines
    canvasCtx.strokeStyle = "rgba(6, 95, 70, 0.05)";
    canvasCtx.lineWidth = 0.5;
    canvasCtx.beginPath();
    canvasCtx.moveTo(0, canvas.height / 2);
    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    for (let x = 50; x < canvas.width; x += 50) {
      canvasCtx.moveTo(x, 0);
      canvasCtx.lineTo(x, canvas.height);
    }
    canvasCtx.stroke();

    // Draw solid green baseline
    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = "#065f46"; // Muted dark green
    canvasCtx.shadowBlur = 0;
    canvasCtx.beginPath();
    canvasCtx.moveTo(0, canvas.height / 2);
    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
  }, [isPlaying]);

  return (
    <div className="relative border border-zinc-900 rounded bg-zinc-950/90 p-2 flex items-center justify-center select-none overflow-hidden h-36">
      <div className="absolute top-2 left-2 text-[7px] text-emerald-500/60 font-bold uppercase tracking-wider font-mono z-10">
        // FREQUENCY OSCILLOSCOPE
      </div>
      <canvas 
        ref={canvasRef} 
        width={500} 
        height={140} 
        className="w-full h-full"
      />
    </div>
  );
}

export default WaveformVisualizer;
