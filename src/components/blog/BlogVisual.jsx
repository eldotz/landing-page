const palettes = {
  ai: { accent: "#ff9d7c", secondary: "#b9d9a9", label: "AI workflow" },
  discovery: { accent: "#9ec6ff", secondary: "#ffcf91", label: "Product discovery" },
  website: { accent: "#f3a6d0", secondary: "#b9d9a9", label: "Website systems" },
  brand: { accent: "#d4b6ff", secondary: "#ffcf91", label: "Brand system" },
  partner: { accent: "#9de0d2", secondary: "#ffb298", label: "Partner fit" },
};

export default function BlogVisual({ kind = "ai", compact = false }) {
  const palette = palettes[kind] ?? palettes.ai;
  const id = `visual-${kind}-${compact ? "compact" : "wide"}`;
  return (
    <svg
      className={`blog-visual${compact ? " blog-visual-compact" : ""}`}
      viewBox="0 0 720 430"
      role="img"
      aria-label={`${palette.label} editorial illustration`}
    >
      <defs>
        <linearGradient id={`${id}-glow`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor={palette.accent} stopOpacity=".22" />
          <stop offset="1" stopColor={palette.secondary} stopOpacity=".02" />
        </linearGradient>
        <pattern id={`${id}-grid`} width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" fill="none" stroke="#eeefe9" strokeOpacity=".08" />
        </pattern>
      </defs>
      <rect width="720" height="430" fill="#171b18" />
      <rect width="720" height="430" fill={`url(#${id}-grid)`} />
      <circle cx="555" cy="118" r="185" fill={`url(#${id}-glow)`} />
      <path d="M48 370H670M48 60H670" stroke="#eeefe9" strokeOpacity=".14" />
      <text x="48" y="48" fill="#eeefe9" fillOpacity=".55" fontSize="10" letterSpacing="2.2">ELDOTZ / EDITORIAL SYSTEM</text>
      {kind === "ai" && (
        <>
          <circle cx="360" cy="210" r="100" fill="none" stroke={palette.accent} strokeOpacity=".35" />
          <circle cx="360" cy="210" r="53" fill={palette.accent} fillOpacity=".17" stroke={palette.accent} />
          <path d="M360 108V157M360 263v49M258 210h49M413 210h49M289 139l35 35M396 246l35 35M431 139l-35 35M324 246l-35 35" stroke={palette.secondary} strokeWidth="2" strokeLinecap="round" />
          <circle cx="360" cy="210" r="15" fill={palette.accent} />
          <circle cx="360" cy="108" r="5" fill={palette.secondary} /><circle cx="462" cy="210" r="5" fill={palette.secondary} /><circle cx="360" cy="312" r="5" fill={palette.secondary} /><circle cx="258" cy="210" r="5" fill={palette.secondary} />
          <text x="322" y="214" fill="#101211" fontSize="11" fontWeight="700">PILOT</text>
        </>
      )}
      {kind === "discovery" && (
        <>
          <path d="M108 280C180 280 187 150 266 150s77 130 154 130 89-130 189-130" fill="none" stroke={palette.accent} strokeWidth="3" />
          {[108, 266, 420, 609].map((x, index) => <g key={x}><circle cx={x} cy={index % 2 ? 150 : 280} r="18" fill="#171b18" stroke={index === 2 ? palette.secondary : palette.accent} strokeWidth="3" /><text x={x} y={(index % 2 ? 154 : 284)} textAnchor="middle" fill="#eeefe9" fontSize="11">0{index + 1}</text></g>)}
          <path d="M143 340h120M300 340h120M457 340h120" stroke="#eeefe9" strokeOpacity=".25" strokeDasharray="3 7" />
          <text x="108" y="365" fill="#eeefe9" fillOpacity=".65" fontSize="10" letterSpacing="1.5">QUESTION → EVIDENCE → DECISION</text>
        </>
      )}
      {kind === "website" && (
        <>
          <rect x="128" y="105" width="464" height="246" rx="10" fill="#202722" stroke={palette.accent} strokeOpacity=".8" />
          <path d="M128 142h464" stroke={palette.accent} strokeOpacity=".5" />
          <circle cx="153" cy="124" r="5" fill={palette.secondary} /><circle cx="171" cy="124" r="5" fill={palette.accent} /><circle cx="189" cy="124" r="5" fill="#eeefe9" fillOpacity=".35" />
          <rect x="162" y="174" width="145" height="14" rx="7" fill={palette.accent} fillOpacity=".75" /><rect x="162" y="205" width="220" height="9" rx="4" fill="#eeefe9" fillOpacity=".2" /><rect x="162" y="224" width="180" height="9" rx="4" fill="#eeefe9" fillOpacity=".12" />
          <rect x="432" y="172" width="113" height="92" rx="5" fill={palette.secondary} fillOpacity=".2" stroke={palette.secondary} /><path d="m451 240 24-28 18 16 18-25 20 37" fill="none" stroke={palette.secondary} strokeWidth="3" />
          <path d="M162 290h383" stroke="#eeefe9" strokeOpacity=".15" /><text x="162" y="314" fill="#eeefe9" fillOpacity=".55" fontSize="10" letterSpacing="1.6">JOB / EVIDENCE / NEXT STEP</text>
        </>
      )}
      {kind === "brand" && (
        <>
          <circle cx="360" cy="220" r="85" fill={palette.accent} fillOpacity=".18" stroke={palette.accent} strokeWidth="2" />
          <circle cx="360" cy="220" r="143" fill="none" stroke={palette.secondary} strokeOpacity=".8" strokeDasharray="2 12" strokeWidth="3" />
          <path d="M360 87v45M360 308v45M227 220h45M448 220h45" stroke={palette.accent} strokeWidth="2" />
          <text x="360" y="214" textAnchor="middle" fill="#eeefe9" fontSize="16" letterSpacing="3">PROMISE</text><text x="360" y="238" textAnchor="middle" fill="#eeefe9" fillOpacity=".55" fontSize="10" letterSpacing="2">MADE / KEPT</text>
          <text x="100" y="342" fill="#eeefe9" fillOpacity=".6" fontSize="10" letterSpacing="1.7">MEANING → MESSAGE → EXPERIENCE</text>
        </>
      )}
      {kind === "partner" && (
        <>
          <path d="M180 245 280 145l80 80 80-80 100 100" fill="none" stroke={palette.accent} strokeWidth="3" />
          <path d="M180 245 280 325l80-100 80 100 100-80" fill="none" stroke={palette.secondary} strokeWidth="3" strokeOpacity=".9" />
          {[180, 280, 360, 440, 540].map((x, index) => <circle key={x} cx={x} cy={index === 1 || index === 3 ? 145 : index === 2 ? 225 : 245} r="9" fill="#171b18" stroke={index === 2 ? palette.secondary : palette.accent} strokeWidth="3" />)}
          <text x="180" y="370" fill="#eeefe9" fillOpacity=".6" fontSize="10" letterSpacing="1.7">FIT IS A SYSTEM OF SHARED DECISIONS</text>
        </>
      )}
      <text x="670" y="398" textAnchor="end" fill="#eeefe9" fillOpacity=".4" fontSize="9" letterSpacing="1.5">ORIGINAL / ELDOTZ</text>
    </svg>
  );
}
