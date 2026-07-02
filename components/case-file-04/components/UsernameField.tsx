"use client";

interface UsernameFieldProps {
  value: string;
  onChange: (val: string) => void;
  disabled: boolean;
}

export default function UsernameField({ value, onChange, disabled }: UsernameFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 block font-bold">
        User Identification
      </label>
      <div className="relative">
        {/* User Icon */}
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-600">
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="w-full bg-slate-900/60 border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 outline-none rounded pl-10 pr-3.5 py-2.5 text-sm font-mono text-white transition-all placeholder:text-zinc-700 disabled:opacity-50"
          placeholder="admin, operator, agent..."
          required
        />
      </div>
    </div>
  );
}
