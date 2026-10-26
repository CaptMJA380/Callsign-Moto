import React, { useState } from 'react';
import { ArrowRight, ChevronRight, Sparkles, ShieldCheck, MapPin, Eye } from 'lucide-react';
import { LivePatchPreview } from '../customizer/LivePatchPreview';

export const Hero: React.FC = () => {
  const [heroView, setHeroView] = useState<'ladakh' | 'pov' | 'customiser'>('ladakh');

  return (
    <section className="relative pt-24 pb-20 sm:pt-32 sm:pb-32 overflow-hidden bg-transparent text-center transition-colors duration-300">
      
      {/* Subtle radial spotlight glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(250,204,21,0.08),transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-5 sm:px-8 relative z-10">
        
        {/* Subtle pill badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.08] text-[12px] font-sans text-[#86868B] dark:text-[#A1A1A6] mb-6 transition-colors backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EAB308] animate-pulse" />
          <span>Personalised Velcro Name Tabs for Motorcycle Riders</span>
        </div>

        {/* Master Apple-style Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-sans font-bold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7] leading-[1.08] mb-5">
          Your Name. Your Ride.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1D1D1F] via-[#71717A] to-[#86868B] dark:from-white dark:via-[#D4D4D8] dark:to-[#71717A]">
            Your Identity.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[#86868B] max-w-xl mx-auto font-normal leading-relaxed mb-8">
          Personalised Velcro name tabs engineered for motorcycle touring.
        </p>

        {/* Action Pills */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
          <a
            href="#customise"
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-90 text-[13px] font-sans font-medium transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5"
          >
            <span>Customise Your Tab</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <a
            href="#variants"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-[#1D1D1F] dark:text-[#F5F5F7] border border-black/[0.08] dark:border-white/[0.08] text-[13px] font-sans transition-all flex items-center justify-center gap-1 backdrop-blur-md"
          >
            <span>Explore Editions</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#86868B]" />
          </a>
        </div>

        {/* Hero View Switcher Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex p-1 rounded-full bg-black/[0.05] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.08] backdrop-blur-md">
            <button
              onClick={() => setHeroView('ladakh')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans transition-all ${
                heroView === 'ladakh'
                  ? 'bg-white dark:bg-white text-black font-semibold shadow-sm'
                  : 'text-[#86868B] hover:text-black dark:hover:text-white'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Ladakh Pass (Worn)</span>
            </button>

            <button
              onClick={() => setHeroView('pov')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans transition-all ${
                heroView === 'pov'
                  ? 'bg-white dark:bg-white text-black font-semibold shadow-sm'
                  : 'text-[#86868B] hover:text-black dark:hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-amber-500" />
              <span>Rider's POV</span>
            </button>

            <button
              onClick={() => setHeroView('customiser')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-sans transition-all ${
                heroView === 'customiser'
                  ? 'bg-white dark:bg-white text-black font-semibold shadow-sm'
                  : 'text-[#86868B] hover:text-black dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Live Customiser</span>
            </button>
          </div>
        </div>

        {/* Dynamic Hero Showcase Stage */}
        <div className="relative max-w-3xl mx-auto">
          {heroView === 'ladakh' ? (
            /* 1. REALISTIC DOCUMENTARY PHOTOGRAPH: RIDER AT KHARDUNG LA PASS, LADAKH */
            <div className="relative rounded-3xl overflow-hidden glass-panel p-2.5 sm:p-3.5 shadow-2xl border border-black/10 dark:border-white/10 group">
              <div className="relative aspect-[16/10] sm:aspect-[16/9.5] rounded-2xl overflow-hidden bg-black">
                <img
                  src="/assets/rider-ladakh-chest.jpg"
                  alt="Motorcycle rider standing at Khardung La Pass in Ladakh wearing custom embroidered velcro name tab on chest"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-[1.02]"
                />

                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

                {/* Chest Callout Beacon - Realistic 125x30mm scale */}
                <div className="absolute top-[42%] left-[43%] -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-2">
                  <div className="relative flex items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-5 w-5 rounded-full bg-[#EAB308] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#EAB308] border-2 border-white shadow-md" />
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/20 text-white shadow-xl text-left">
                    <div className="text-[11px] font-sans font-semibold tracking-wide text-[#FEF08A] flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#EAB308]" />
                      BHUSHAN O+ (125 × 30 mm)
                    </div>
                    <div className="text-[10px] text-zinc-300 font-mono">
                      Left Upper Chest Loop Pocket Mount
                    </div>
                  </div>
                </div>

                {/* Bottom Card Caption Overlay with Real Place in Ladakh */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-4 py-2.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 text-white">
                  <div className="flex items-center space-x-2 text-left">
                    <span className="w-2 h-2 rounded-full bg-[#EAB308]" />
                    <span className="text-[12px] font-sans font-medium text-zinc-200">
                      Khardung La Pass, Ladakh • Triumph Tiger Rally Pro
                    </span>
                  </div>
                  <a
                    href="#customise"
                    className="text-[11px] font-sans font-semibold text-[#FEF08A] hover:underline flex items-center gap-1"
                  >
                    <span>Create Yours</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ) : heroView === 'pov' ? (
            /* 2. FIRST-PERSON RIDER'S POV: INDIAN TERRAIN & LADAKH MOUNTAIN PASS */
            <div className="relative rounded-3xl overflow-hidden glass-panel p-2.5 sm:p-3.5 shadow-2xl border border-black/10 dark:border-white/10 group">
              <div className="relative aspect-[16/10] sm:aspect-[16/9.5] rounded-2xl overflow-hidden bg-black">
                <img
                  src="/assets/rider-pov-ladakh.jpg"
                  alt="First-person motorcycle rider perspective cockpit view riding on scenic Ladakh mountain pass road"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-[1.02]"
                />

                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20 pointer-events-none" />

                {/* Bottom Card Caption Overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-4 py-2.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 text-white">
                  <div className="flex items-center space-x-2 text-left">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-[12px] font-sans font-medium text-zinc-200">
                      Rider's Perspective: Open Roads of Ladakh, India
                    </span>
                  </div>
                  <a
                    href="#customise"
                    className="text-[11px] font-sans font-semibold text-[#FEF08A] hover:underline flex items-center gap-1"
                  >
                    <span>Customise Tab</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ) : (
            /* 3. INTERACTIVE LIVE EMBROIDERY STAGE */
            <div className="relative z-20 transition-transform duration-500 hover:scale-[1.01]">
              <LivePatchPreview
                variantId="NAME_BLOOD"
                riderName="BHUSHAN"
                bloodGroup="O+"
                hasFlag={false}
                showInspectionControls={true}
              />
            </div>
          )}

          <div className="w-3/4 h-8 bg-black/10 dark:bg-black/80 blur-xl mx-auto -mt-4 rounded-full pointer-events-none" />
        </div>

        {/* Micro Specs */}
        <div className="mt-14 pt-8 border-t border-black/[0.08] dark:border-white/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-6 text-center max-w-3xl mx-auto text-[13px] font-sans">
          <div>
            <div className="text-[#1D1D1F] dark:text-[#F5F5F7] font-semibold">125 × 30 mm</div>
            <div className="text-[#86868B] text-[12px] mt-0.5">Touring loop standard</div>
          </div>
          <div>
            <div className="text-[#1D1D1F] dark:text-[#F5F5F7] font-semibold">1000D Cordura</div>
            <div className="text-[#86868B] text-[12px] mt-0.5">High-tensile ballistic base</div>
          </div>
          <div>
            <div className="text-[#1D1D1F] dark:text-[#F5F5F7] font-semibold">Hook &amp; Loop</div>
            <div className="text-[#86868B] text-[12px] mt-0.5">Matching loop swatch included</div>
          </div>
        </div>

      </div>
    </section>
  );
};
