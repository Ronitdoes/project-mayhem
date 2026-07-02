import React from "react";
import Image from "next/image";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface PuzzleTileProps {
  id: string;
  url: string;
}

export function PuzzleTile({ id, url }: PuzzleTileProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    touchAction: "none", // Prevent scrolling on mobile during drag
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative aspect-square w-full rounded-none overflow-hidden bg-zinc-950/60 cursor-grab transition-all duration-200 select-none ${
        isDragging
          ? "outline outline-2 outline-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.4)] cursor-grabbing opacity-90 scale-[1.03] z-50"
          : "outline outline-1 outline-zinc-900/30 hover:outline-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] hover:scale-[1.02] hover:z-10"
      }`}
    >
      {/* Decorative scanner line running on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.03] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Image Fragment */}
      <Image
        src={url}
        alt={`Archive Fragment ${id}`}
        fill
        sizes="(max-width: 768px) 50vw, 25vw"
        draggable={false}
        className="w-full h-full object-cover select-none pointer-events-none"
      />
    </div>
  );
}
