"use client";

export default function Stage8({ onComplete, onLogRecovered }: { onComplete: () => void, onLogRecovered: (id: string, text: string) => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", alignItems: "center", justifyContent: "center" }}>
      <h1 style={{ color: "var(--text-primary)", fontSize: "2rem", marginBottom: "1rem" }}>
        [ NEW FINAL STAGE ]
      </h1>
      <p style={{ color: "var(--text-amber)", fontSize: "1.2rem", maxWidth: "600px", textAlign: "center", lineHeight: "1.6", marginBottom: "2rem" }}>
        overrise sequence complete <br/><br/>
        Please provide the new custom game design parameters in the chat so the architecture can be compiled.
      </p>
      <button 
        onClick={() => window.location.href = '/hunt'}
        style={{
          background: "rgba(51, 255, 51, 0.05)",
          color: "var(--text-primary)",
          border: "1px solid var(--text-primary)",
          padding: "0.75rem 1.5rem",
          cursor: "pointer",
          fontFamily: "var(--font-mono)",
          fontWeight: "bold",
          fontSize: "1rem",
          transition: "all 0.3s"
        }}
        onMouseEnter={(e) => {
          const t = e.target as HTMLElement;
          t.style.background = "var(--text-primary)";
          t.style.color = "#000";
          t.style.boxShadow = "0 0 15px var(--text-primary)";
        }}
        onMouseLeave={(e) => {
          const t = e.target as HTMLElement;
          t.style.background = "rgba(51, 255, 51, 0.05)";
          t.style.color = "var(--text-primary)";
          t.style.boxShadow = "none";
        }}
      >
        &gt; return_to_hub()
      </button>
    </div>
  );
}
