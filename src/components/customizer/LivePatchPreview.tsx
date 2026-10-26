import React, { useState } from 'react';
import { BloodGroup, VariantType } from '../../types/product';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface LivePatchPreviewProps {
  variantId: VariantType;
  riderName: string;
  bloodGroup: BloodGroup | '';
  hasFlag: boolean;
  threadColor?: string;
  showInspectionControls?: boolean;
}

export const LivePatchPreview: React.FC<LivePatchPreviewProps> = ({
  variantId,
  riderName,
  bloodGroup,
  hasFlag,
  showInspectionControls = true
}) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const displayName = riderName.trim().toUpperCase() || 'BHUSHAN';
  const displayBlood = bloodGroup || (variantId !== 'NAME_ONLY' ? 'O+' : '');

  // Calculate dynamic font size based strictly on name length so the name is bold and fits
  const getNameFontSize = () => {
    const len = displayName.length;
    if (variantId === 'TRICOLOUR_EDITION') {
      if (len <= 5) return 46;
      if (len <= 7) return 42;
      if (len <= 9) return 37;
      if (len <= 11) return 33;
      return 29;
    } else if (variantId === 'NAME_BLOOD') {
      if (len <= 5) return 56;
      if (len <= 8) return 52;
      if (len <= 10) return 46;
      if (len <= 12) return 40;
      return 35;
    } else {
      // NAME ONLY (Full width available)
      if (len <= 5) return 64;
      if (len <= 8) return 58;
      if (len <= 10) return 52;
      if (len <= 12) return 46;
      return 40;
    }
  };

  const nameFontSize = getNameFontSize();

  return (
    <div className="flex flex-col items-center select-none w-full">
      {/* Apple-style Inspection bar */}
      {showInspectionControls && (
        <div className="flex items-center justify-between w-full max-w-xl mb-3.5 px-2 text-[12px] font-sans text-[#86868B]">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-[#1D1D1F] dark:text-[#F5F5F7] font-mono text-[11px]">
              125 × 30 mm
            </span>
            <span className="hidden sm:inline text-[#86868B]">
              Hook &amp; Loop Backing
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.04] text-[#1D1D1F] dark:text-[#A1A1A6] border border-black/[0.08] dark:border-white/[0.08] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] transition-all text-[11px] font-medium"
            >
              {isZoomed ? <ZoomOut className="w-3 h-3" /> : <ZoomIn className="w-3 h-3" />}
              <span>{isZoomed ? 'Standard' : 'Close-up'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Studio Stage */}
      <div
        className={`relative transition-all duration-500 ease-out flex items-center justify-center p-5 sm:p-10 rounded-3xl glass-panel shadow-xl w-full ${
          isZoomed ? 'max-w-2xl scale-[1.03]' : 'max-w-xl'
        }`}
      >
        {/* Subtle studio backdrop lighting */}
        <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(ellipse_at_top,rgba(250,204,21,0.06),transparent_60%)] pointer-events-none" />

        {/* Embroidered Front Patch SVG */}
        <div className="relative w-full max-w-[480px] aspect-[4.2/1] rounded-[8px] shadow-[0_16px_48px_rgba(0,0,0,0.9),0_2px_4px_rgba(250,204,21,0.1)] transform-gpu transition-all">
          <svg
            viewBox="0 0 500 120"
            className="w-full h-full drop-shadow-[0_8px_20px_rgba(0,0,0,0.95)]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Tactical Cordura Cross-Weave Texture */}
              <pattern id="corduraWeave" width="4" height="4" patternUnits="userSpaceOnUse">
                <rect width="4" height="4" fill="#0A0A0C" />
                <rect x="0" y="0" width="2" height="2" fill="#121215" />
                <rect x="2" y="2" width="2" height="2" fill="#18181D" />
              </pattern>

              {/* Golden Yellow Embroidery Thread Gradient (Matches physical patch) */}
              <linearGradient id="goldThreadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FEF08A" />
                <stop offset="20%" stopColor="#FACC15" />
                <stop offset="65%" stopColor="#EAB308" />
                <stop offset="100%" stopColor="#CA8A04" />
              </linearGradient>

              {/* Golden Yellow Border Satin Gradient */}
              <linearGradient id="goldBorderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FACC15" />
                <stop offset="35%" stopColor="#EAB308" />
                <stop offset="70%" stopColor="#CA8A04" />
                <stop offset="100%" stopColor="#EAB308" />
              </linearGradient>

              {/* Crimson Red Blood Group Thread Gradient */}
              <linearGradient id="redThreadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F87171" />
                <stop offset="30%" stopColor="#EF4444" />
                <stop offset="80%" stopColor="#DC2626" />
                <stop offset="100%" stopColor="#B91C1C" />
              </linearGradient>

              {/* Embroidery Thread Sheen & Emboss Filter */}
              <filter id="threadEmboss" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="0.7" result="blur" />
                <feOffset in="blur" dx="0.6" dy="0.8" result="offset" />
                <feSpecularLighting in="blur" surfaceScale="2" specularConstant="1.4" specularExponent="18" lightingColor="#ffffff" result="specular">
                  <fePointLight x="250" y="20" z="70" />
                </feSpecularLighting>
                <feComposite in="specular" in2="SourceAlpha" operator="in" result="specularIn" />
                <feComposite in="SourceGraphic" in2="specularIn" operator="arithmetic" k1="0" k2="1" k3="0.75" k4="0" />
              </filter>

              {/* Saffron Flag Gradient */}
              <linearGradient id="saffronThread" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFA447" />
                <stop offset="100%" stopColor="#E67E22" />
              </linearGradient>

              {/* Green Flag Gradient */}
              <linearGradient id="greenThread" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#159909" />
                <stop offset="100%" stopColor="#0E6B06" />
              </linearGradient>
            </defs>

            {/* Base Cordura Fabric Rectangle */}
            <rect
              x="4"
              y="4"
              width="492"
              height="112"
              rx="8"
              fill="url(#corduraWeave)"
              stroke="#000000"
              strokeWidth="2"
            />

            {/* Heavy Golden-Yellow Overlocked Merrowed Edge */}
            <rect
              x="5"
              y="5"
              width="490"
              height="110"
              rx="7"
              fill="none"
              stroke="url(#goldBorderGradient)"
              strokeWidth="7"
            />
            {/* Inner satin stitch highlight */}
            <rect
              x="5"
              y="5"
              width="490"
              height="110"
              rx="7"
              fill="none"
              stroke="#FEF08A"
              strokeWidth="1.5"
              strokeDasharray="4 2"
              strokeOpacity="0.8"
            />
            {/* Inner stitch contour */}
            <rect
              x="9.5"
              y="9.5"
              width="481"
              height="101"
              rx="5"
              fill="none"
              stroke="#A16207"
              strokeWidth="1"
              strokeOpacity="0.5"
            />

            {/* ================= CONDITION 1: TRICOLOUR EDITION ================= */}
            {variantId === 'TRICOLOUR_EDITION' && (
              <>
                {hasFlag && (
                  <g transform="translate(18, 15)">
                    {/* Flag embroidered border fitting the patch height */}
                    <rect x="0" y="0" width="104" height="90" rx="3" fill="#0A0A0C" stroke="#EAB308" strokeWidth="1.5" />
                    
                    {/* Saffron, White, Green Tricolour bands */}
                    <rect x="1.5" y="1.5" width="101" height="29" rx="2" fill="url(#saffronThread)" />
                    <rect x="1.5" y="30.5" width="101" height="29" fill="#F8FAFC" />
                    <rect x="1.5" y="59.5" width="101" height="29" rx="2" fill="url(#greenThread)" />

                    {/* Ashoka Chakra */}
                    <g transform="translate(52, 45)">
                      <circle cx="0" cy="0" r="11" fill="none" stroke="#000088" strokeWidth="1.3" />
                      <circle cx="0" cy="0" r="2.2" fill="#000088" />
                      {[...Array(12)].map((_, i) => (
                        <line
                          key={i}
                          x1="0"
                          y1="-11"
                          x2="0"
                          y2="11"
                          stroke="#000088"
                          strokeWidth="0.9"
                          transform={`rotate(${i * 15})`}
                        />
                      ))}
                    </g>

                    <rect x="1.5" y="1.5" width="101" height="87" rx="2" fill="none" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="3 2" />
                  </g>
                )}

                {/* Rider Name centered in the remaining area */}
                <text
                  x={hasFlag ? (displayBlood ? "286" : "304") : (displayBlood ? "250" : "250")}
                  y="62"
                  dominantBaseline="central"
                  textAnchor="middle"
                  fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Inter', 'Arial Black', sans-serif"
                  fontSize={nameFontSize}
                  fontWeight="900"
                  fill="url(#goldThreadGradient)"
                  filter="url(#threadEmboss)"
                >
                  {displayName}
                </text>

                {/* Blood Group in red on the right */}
                {displayBlood && (
                  <text
                    x="438"
                    y="62"
                    dominantBaseline="central"
                    textAnchor="middle"
                    fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Inter', 'Arial Black', sans-serif"
                    fontSize={nameFontSize * 0.82}
                    fontWeight="900"
                    fill="url(#redThreadGradient)"
                    filter="url(#threadEmboss)"
                  >
                    {displayBlood}
                  </text>
                )}
              </>
            )}

            {/* ================= CONDITION 2: NAME + BLOOD GROUP (EXACT PHYSICAL MATCH) ================= */}
            {variantId === 'NAME_BLOOD' && (
              <>
                {/* Rider Name in EXACT CENTER OF PATCH (x = 250) */}
                <text
                  x="250"
                  y="62"
                  dominantBaseline="central"
                  textAnchor="middle"
                  fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Inter', 'Arial Black', sans-serif"
                  fontSize={nameFontSize}
                  fontWeight="900"
                  fill="url(#goldThreadGradient)"
                  filter="url(#threadEmboss)"
                >
                  {displayName}
                </text>

                {/* Blood Group in vibrant red thread on the right */}
                {displayBlood && (
                  <text
                    x="438"
                    y="62"
                    dominantBaseline="central"
                    textAnchor="middle"
                    fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Inter', 'Arial Black', sans-serif"
                    fontSize={Math.min(nameFontSize * 0.85, 44)}
                    fontWeight="900"
                    fill="url(#redThreadGradient)"
                    filter="url(#threadEmboss)"
                  >
                    {displayBlood}
                  </text>
                )}
              </>
            )}

            {/* ================= CONDITION 3: NAME ONLY ================= */}
            {variantId === 'NAME_ONLY' && (
              <text
                x="250"
                y="62"
                dominantBaseline="central"
                textAnchor="middle"
                fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Inter', 'Arial Black', sans-serif"
                fontSize={nameFontSize}
                fontWeight="900"
                fill="url(#goldThreadGradient)"
                filter="url(#threadEmboss)"
              >
                {displayName}
              </text>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
};
