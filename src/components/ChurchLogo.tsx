import React from 'react';

interface ChurchLogoProps {
  className?: string;
  variant?: 'mark' | 'full' | 'horizontal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withGlow?: boolean;
}

export const ChurchLogo: React.FC<ChurchLogoProps> = ({
  className = '',
  variant = 'horizontal',
  size = 'md',
  withGlow = false,
}) => {
  // Dimension tokens
  const sizeMap = {
    sm: { icon: 34, textTitle: 'text-sm', textSubtitle: 'text-[10px]' },
    md: { icon: 44, textTitle: 'text-base', textSubtitle: 'text-xs' },
    lg: { icon: 72, textTitle: 'text-xl', textSubtitle: 'text-xs' },
    xl: { icon: 110, textTitle: 'text-2xl', textSubtitle: 'text-sm' },
  };

  const { icon: iconDim } = sizeMap[size];

  // Unique Vector Emblem for Assemblée de Dieu:
  // Features:
  // 1. Double Gold Arch / Celestial Ring (Eternal covenant)
  // 2. Open Holy Bible at base (Word of God, 2 Timothy 3:16)
  // 3. Central Latin Cross (Redemption, Calvary, 1 Corinthians 1:18)
  // 4. Threefold Pentecostal Holy Spirit Flame & Ascending Dove (Acts 2:3-4)
  // 5. Radiant divine rays of light
  const EmblemSVG = (
    <svg
      width={iconDim}
      height={iconDim}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 ${withGlow ? 'drop-shadow-[0_0_12px_rgba(217,119,6,0.35)]' : ''}`}
      aria-label="Logo officiel Assemblée de Dieu"
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="adGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="35%" stopColor="#D97706" />
          <stop offset="70%" stopColor="#B45309" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>

        <linearGradient id="adRoyalBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="50%" stopColor="#172554" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>

        <linearGradient id="adFlameGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="40%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>

        <linearGradient id="adBibleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F1F5F9" />
        </linearGradient>

        <radialGradient id="adCenterGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Outer Shield / Circular Medallion */}
      <circle cx="80" cy="80" r="76" fill="url(#adRoyalBlueGrad)" stroke="url(#adGoldGrad)" strokeWidth="3.5" />
      <circle cx="80" cy="80" r="71" stroke="#93C5FD" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 3" />

      {/* Internal Celestial Glow */}
      <circle cx="80" cy="72" r="54" fill="url(#adCenterGlow)" />

      {/* Radiant Divine Light Beams from Cross Center */}
      <g stroke="url(#adGoldGrad)" strokeWidth="1" opacity="0.65">
        <line x1="80" y1="20" x2="80" y2="34" />
        <line x1="42" y1="38" x2="52" y2="48" />
        <line x1="118" y1="38" x2="108" y2="48" />
        <line x1="24" y1="80" x2="38" y2="80" />
        <line x1="122" y1="80" x2="136" y2="80" />
        <line x1="38" y1="116" x2="48" y2="106" />
        <line x1="122" y1="116" x2="112" y2="106" />
      </g>

      {/* Pentecostal Fire of the Holy Spirit (Top Center behind Cross) */}
      <path
        d="M80 16 C76 28 69 34 69 44 C69 53 74 58 80 58 C86 58 91 53 91 44 C91 34 84 28 80 16 Z"
        fill="url(#adFlameGrad)"
        opacity="0.95"
      />
      <path
        d="M80 26 C78 34 74 38 74 46 C74 51 77 54 80 54 C83 54 86 51 86 46 C86 38 82 34 80 26 Z"
        fill="#FDE68A"
        opacity="0.9"
      />

      {/* Holy Spirit Dove Silhouette (Gliding within the flame) */}
      <path
        d="M80 34 C76 38 68 40 64 38 C68 42 73 45 77 46 C75 48 72 50 70 54 C74 52 78 50 80 48 C82 50 86 52 90 54 C88 50 85 48 83 46 C87 45 92 42 96 38 C92 40 84 38 80 34 Z"
        fill="#FFFFFF"
        opacity="0.95"
      />

      {/* Central Latin Cross of Calvary */}
      <g filter="drop-shadow(0 2px 4px rgba(0,0,0,0.5))">
        {/* Vertical beam */}
        <rect x="74.5" y="38" width="11" height="64" rx="2" fill="url(#adGoldGrad)" stroke="#FEF3C7" strokeWidth="0.8" />
        {/* Horizontal beam */}
        <rect x="52" y="52" width="56" height="10.5" rx="2" fill="url(#adGoldGrad)" stroke="#FEF3C7" strokeWidth="0.8" />
        {/* Golden Cross Highlight Line */}
        <line x1="80" y1="41" x2="80" y2="99" stroke="#FFFBEB" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="55" y1="57.2" x2="105" y2="57.2" stroke="#FFFBEB" strokeWidth="1.2" strokeLinecap="round" />
      </g>

      {/* Open Holy Bible at the base */}
      <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.6))">
        {/* Bible Cover Underlay */}
        <path
          d="M38 122 C52 118 68 119 80 124 C92 119 108 118 122 122 L120 129 C106 125 92 126 80 131 C68 126 54 125 40 129 Z"
          fill="#78350F"
        />

        {/* Left Page */}
        <path
          d="M40 102 C54 98 68 100 80 105 L80 125 C68 120 54 118 40 122 Z"
          fill="url(#adBibleGrad)"
          stroke="#CBD5E1"
          strokeWidth="0.8"
        />
        {/* Right Page */}
        <path
          d="M80 105 C92 100 106 98 120 102 L120 122 C106 118 92 120 80 125 Z"
          fill="url(#adBibleGrad)"
          stroke="#CBD5E1"
          strokeWidth="0.8"
        />
        {/* Center Spine Crease */}
        <line x1="80" y1="105" x2="80" y2="127" stroke="#94A3B8" strokeWidth="1.5" />

        {/* Scripture Text Simulated Lines */}
        <g stroke="#64748B" strokeWidth="0.9" strokeLinecap="round" opacity="0.75">
          {/* Left page text lines */}
          <line x1="47" y1="106" x2="73" y2="108" />
          <line x1="47" y1="110" x2="73" y2="112" />
          <line x1="47" y1="114" x2="71" y2="116" />
          <line x1="47" y1="118" x2="68" y2="120" />
          {/* Right page text lines */}
          <line x1="87" y1="108" x2="113" y2="106" />
          <line x1="87" y1="112" x2="113" y2="110" />
          <line x1="87" y1="116" x2="111" y2="114" />
          <line x1="87" y1="120" x2="108" y2="118" />
        </g>

        {/* Golden Ribbon Bookmark */}
        <path
          d="M80 125 Q77 132 82 138 Q85 142 80 146"
          stroke="url(#adGoldGrad)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      </g>

      {/* Heraldic Stars (4 Stars representing the 4 Fundamental Truths) */}
      <g fill="#FDE68A">
        <polygon points="26,62 28,66 33,66 29,69 31,74 26,71 22,74 24,69 20,66 25,66" />
        <polygon points="134,62 136,66 141,66 137,69 139,74 134,71 130,74 132,69 128,66 133,66" />
        <polygon points="32,96 34,99 38,99 35,101 36,105 32,103 29,105 30,101 27,99 31,99" />
        <polygon points="128,96 130,99 134,99 131,101 132,105 128,103 125,105 126,101 123,99 127,99" />
      </g>
    </svg>
  );

  if (variant === 'mark') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {EmblemSVG}
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {EmblemSVG}
        <div className="mt-3">
          <span className="font-sacred font-bold tracking-wider text-slate-900 uppercase block text-xl sm:text-2xl">
            Assemblée de Dieu
          </span>
          <span className="text-xs uppercase tracking-widest text-amber-700 font-semibold mt-1 block">
            Temple de la Résurrection · Adamavo 2, Lomé
          </span>
          <span className="text-[11px] text-slate-500 block mt-0.5 font-normal">
            « Jésus-Christ est le même hier, aujourd'hui et éternellement » — Héb. 13:8
          </span>
        </div>
      </div>
    );
  }

  // Horizontal variant (Ideal for Navbar & Top bar contract)
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {EmblemSVG}
      <div className="flex flex-col leading-tight">
        <span className="font-sacred font-bold tracking-wider text-slate-900 uppercase text-sm sm:text-base whitespace-nowrap">
          Assemblée de Dieu
        </span>
        <span className="text-[10px] tracking-wider text-amber-700 font-medium uppercase whitespace-nowrap">
          Temple de la Résurrection
        </span>
      </div>
    </div>
  );
};
