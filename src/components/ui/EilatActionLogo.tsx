interface Props {
  className?: string
  width?: number
}

export function EilatActionLogo({ className = '', width = 140 }: Props) {
  const h = Math.round(width * 0.53)
  return (
    <svg
      viewBox="0 0 265 140"
      width={width}
      height={h}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Eilat Action"
    >
      {/* Sun / orange circle */}
      <circle cx="155" cy="58" r="52" fill="#E8521A" />

      {/* Jeep silhouette */}
      <g fill="#1A0A00">
        {/* Body */}
        <rect x="52" y="68" width="158" height="32" rx="4" />
        {/* Cabin roof */}
        <path d="M72 68 L88 42 L180 42 L196 68 Z" />
        {/* Front hood */}
        <path d="M196 68 L210 55 L220 68 Z" />
        {/* Bumpers */}
        <rect x="42" y="88" width="16" height="8" rx="2" />
        <rect x="205" y="88" width="16" height="8" rx="2" />
        {/* Windshield highlight */}
        <rect x="92" y="48" width="78" height="18" rx="2" fill="#2A1408" opacity="0.6" />
      </g>

      {/* Wheels */}
      <circle cx="98" cy="102" r="20" fill="#1A0A00" />
      <circle cx="98" cy="102" r="10" fill="#3A2010" />
      <circle cx="164" cy="102" r="20" fill="#1A0A00" />
      <circle cx="164" cy="102" r="10" fill="#3A2010" />

      {/* Ground shadow */}
      <ellipse cx="132" cy="124" rx="115" ry="10" fill="#1A0A00" opacity="0.85" />

      {/* EILAT text */}
      <text
        x="132"
        y="66"
        textAnchor="middle"
        fontFamily="Arial Black, Arial, sans-serif"
        fontWeight="900"
        fontSize="36"
        fill="white"
        letterSpacing="3"
        style={{ textTransform: 'uppercase' }}
      >
        EILAT
      </text>

      {/* ACTION text */}
      <text
        x="132"
        y="100"
        textAnchor="middle"
        fontFamily="Arial Black, Arial, sans-serif"
        fontWeight="900"
        fontSize="30"
        fill="white"
        letterSpacing="2"
        style={{ textTransform: 'uppercase' }}
      >
        ACTION
      </text>
    </svg>
  )
}
