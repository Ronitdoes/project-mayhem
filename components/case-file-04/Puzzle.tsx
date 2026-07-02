"use client";

import React from "react";
import GhostPuzzle from "./components/GhostPuzzle";
import { PuzzleProps } from "./types";

export default function Puzzle(props: PuzzleProps) {
  return <GhostPuzzle {...props} />;
}
