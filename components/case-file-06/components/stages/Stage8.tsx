"use client";

export default function Stage8({ onComplete, onLogRecovered }: { onComplete: () => void, onLogRecovered: (id: string, text: string) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", alignItems: "center", justifyContent: "center" }}>
      <h1 style={{ color: "var(--text-primary)", fontSize: "2rem", marginBottom: "1rem" }}>
        [ NEW FINAL STAGE ]
      </h1>
      <p style={{ color: "var(--text-amber)", fontSize: "1.2rem", maxWidth: "600px", textAlign: "center", lineHeight: "1.6" }}>
        overrise sequence complete <br/><br/>
        Please provide the new custom game design parameters in the chat so the architecture can be compiled.
      </p>
    </div>
  );
}
