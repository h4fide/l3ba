// Decorative, non-interactive SVG background elements.
// Keep this file server-safe (no "use client") so it can be used in RootLayout.
export default function BackgroundDecor() {
  return (
    <div aria-hidden className="absolute inset-0 -z-20 pointer-events-none overflow-hidden">
      {/* External SVG from public/assets (place your file at /public/assets/retro-lightning-bolt-pixel.svg) */}
      <img
        src="/assets/retro-lightning-bolt-pixel.svg"
        alt=""
        aria-hidden
        className="absolute left-6 top-10 w-40 h-40 opacity-10 select-none"
        draggable={false}
      />
      {/* Top-left decorative mark */}
      <svg
        className="absolute left-4 top-6 w-48 h-48 opacity-10"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: 'rgba(236,72,153,0.12)' }}
      >
        <circle cx="100" cy="100" r="80" fill="currentColor" />
        <circle cx="60" cy="70" r="20" fill="rgba(255,255,255,0.06)" />
      </svg>

      {/* Bottom-right decorative mark */}
      <svg
        className="absolute right-0 bottom-8 w-64 h-64 opacity-8"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: 'rgba(59,130,246,0.08)' }}
      >
        <rect x="10" y="10" width="180" height="180" rx="24" fill="currentColor" />
      </svg>

      {/* Center faint pattern */}
      <svg
        className="absolute left-1/2 top-1/3 -translate-x-1/2 w-96 h-96 opacity-6"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color: 'rgba(14,165,132,0.06)' }}
      >
        <g fill="none" stroke="currentColor" strokeWidth="6">
          <circle cx="200" cy="200" r="140" strokeOpacity="0.3" />
          <circle cx="200" cy="200" r="90" strokeOpacity="0.18" />
          <circle cx="200" cy="200" r="40" strokeOpacity="0.12" />
        </g>
      </svg>
    </div>
  );
}
