"use client";

import { MirrorScriptPuzzle } from "@/components/case-file-04";
import { useRouter } from "next/navigation";

export default function StandaloneMirrorPage() {
  const router = useRouter();

  const handleSolved = () => {
    router.push("/hunt/case-04/fortune-teller");
  };

  return <MirrorScriptPuzzle onSolved={handleSolved} />;
}
