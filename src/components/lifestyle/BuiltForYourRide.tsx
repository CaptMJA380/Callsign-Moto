import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const BuiltForYourRide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chest' | 'sleeve' | 'velcroMechanics'>('chest');

  return (
    <section id="built-for-your-ride" className="py-24 sm:py-32 bg-[#F5F5F7]/80 dark:bg-black/70 backdrop-blur-md border-t border-black/[0.06] dark:border-white/[0.06] transition-colors duration-300 relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[12px] font-sans text-[#86868B] uppercase tracking-widest block mb-2 font-medium">
            Jacket Compatibility
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7] mb-3">
            Built for your ride. Personalised for you.
          </h2>
        </div>

        {/* Segmented Controls */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 rounded-full bg-black/[0.05] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08]">
            <button
              onClick={() => setActiveTab('chest')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans transition-all ${
                activeTab === 'chest'
                  ? 'bg-white dark:bg-white text-black font-semibold shadow-sm'
                  : 'text-[#86868B] hover:text-black dark:hover:text-white'
              }`}
            >
              Chest Placement
            </button>
            <button
              onClick={() => setActiveTab('sleeve')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans transition-all ${
                activeTab === 'sleeve'
                  ? 'bg-white dark:bg-white text-black font-semibold shadow-sm'
                  : 'text-[#86868B] hover:text-black dark:hover:text-white'
              }`}
            >
              Sleeve Mounting
            </button>
            <button
              onClick={() => setActiveTab('velcroMechanics')}
              className={`px-4 py-1.5 rounded-full text-xs font-sans transition-all ${
                activeTab === 'velcroMechanics'
                  ? 'bg-white dark:bg-white text-black font-semibold shadow-sm'
                  : 'text-[#86868B] hover:text-black dark:hover:text-white'
              }`}
            >
              Hook-and-Loop
            </button>
          </div>
        </div>

        {/* Dynamic Display Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Visual Mockup Showcase */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden glass-panel p-4 sm:p-6 shadow-xl">
              
              {activeTab === 'chest' && (
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-black flex items-center justify-center group">
                  <img
                    src="/assets/rider-ladakh-chest.jpg"
                    alt="Motorcycle rider at Khardung La Pass in Ladakh wearing custom embroidered velcro name tab on chest"
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                  
                  {/* Chest indicator pill */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3.5 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/15 text-white">
                    <span className="text-[11px] font-sans font-semibold tracking-wide flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#EAB308]" />
                      Upper Chest Loop Mount (125 × 30 mm)
                    </span>
                    <span className="text-[10px] font-mono text-zinc-300">
                      Khardung La, Ladakh • Triumph Tiger Spec
                    </span>
                  </div>
                </div>
              )}

              {activeTab === 'sleeve' && (
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#0A0C10] flex items-center justify-center p-6">
                  <svg viewBox="0 0 700 440" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <path d="M200 40 Q400 30 520 80 Q560 220 500 400 L240 400 Q180 260 200 40 Z" fill="#181D28" stroke="#334155" strokeWidth="2" />
                    <rect x="290" y="160" width="190" height="52" rx="4" fill="#0B0E14" stroke="#475569" strokeWidth="2" strokeDasharray="4 2" />
                    
                    <g transform="translate(292, 162)">
                      <rect x="0" y="0" width="186" height="48" rx="4" fill="#0B0D13" stroke="#222" />
                      <rect x="2" y="2" width="182" height="44" rx="3" fill="none" stroke="#EAB308" strokeWidth="3" />
                      <rect x="2" y="2" width="182" height="44" rx="3" fill="none" stroke="#FEF08A" strokeWidth="1" strokeDasharray="3 2" />
                      
                      {/* Name in Center and Blood Group on Right */}
                      <text x="82" y="30" textAnchor="middle" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontSize="15" fontWeight="700" fill="#FACC15">
                        VALKYRIE
                      </text>
                      <text x="156" y="30" textAnchor="middle" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontSize="13" fontWeight="700" fill="#EF4444">
                        B+
                      </text>
                    </g>
                  </svg>
                </div>
              )}

              {activeTab === 'velcroMechanics' && (
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#0A0C10] flex items-center justify-center p-6">
                  <svg viewBox="0 0 700 440" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(100, 260)">
                      <rect x="0" y="0" width="500" height="80" rx="12" fill="#141416" stroke="#333" strokeWidth="1.5" />
                      <text x="250" y="35" fill="#F5F5F7" textAnchor="middle" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontSize="13" fontWeight="600">
                        1. JACKET LOOP PANEL (OR INCLUDED MATCHING SWATCH)
                      </text>
                    </g>

                    <g transform="translate(340, 180)">
                      <line x1="0" y1="0" x2="0" y2="60" stroke="#FF7700" strokeWidth="3" strokeDasharray="6 3" />
                      <polygon points="-6,50 0,66 6,50" fill="#FF7700" />
                      <polygon points="-6,16 0,0 6,16" fill="#FF7700" />
                    </g>

                    <g transform="translate(100, 80)">
                      <rect x="0" y="0" width="500" height="80" rx="12" fill="#1C1C1E" stroke="#FF7700" strokeWidth="1.5" />
                      <text x="250" y="35" fill="#FFFFFF" textAnchor="middle" fontFamily="-apple-system, BlinkMacSystemFont, sans-serif" fontSize="13" fontWeight="600">
                        2. HIGH-TENSILE MOLDED HOOK VELCRO BACKING
                      </text>
                    </g>
                  </svg>
                </div>
              )}

              <div className="mt-4 flex items-center justify-between text-[11px] text-[#86868B] font-sans">
                <span>Standard 125 × 30 mm loop surface</span>
                <span className="text-[#1D1D1F] dark:text-[#F5F5F7]">Triumph Tiger Touring Context</span>
              </div>
            </div>
          </div>

          {/* Right Column: Explanations */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-3xl glass-panel space-y-3">
              <h3 className="text-xl font-sans font-bold text-[#1D1D1F] dark:text-white tracking-tight">
                Mounting onto your gear.
              </h3>
              
              <div className="pt-4 space-y-3 border-t border-black/[0.06] dark:border-white/[0.06]">
                <div className="flex items-start gap-2.5 text-xs text-[#515154] dark:text-[#A1A1A6]">
                  <Check className="w-4 h-4 text-black dark:text-white flex-shrink-0 mt-0.5" />
                  <span><strong>Direct Attachment:</strong> Instant mate with standard loop panels on Rynox, Dainese, Alpinestars, Viaterra and Royal Enfield jackets.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#515154] dark:text-[#A1A1A6]">
                  <Check className="w-4 h-4 text-[#FF7700] flex-shrink-0 mt-0.5" />
                  <span><strong>Complimentary Loop Swatch:</strong> Every order includes a matching 125 × 30 mm loop fabric piece for any jacket lacking a loop panel.</span>
                </div>
              </div>
            </div>

            <a
              href="#customise"
              className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-[#1D1D1F] dark:text-white hover:text-[#FF7700] transition-colors"
            >
              <span>Customise your tab</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

          </div>

        </div>

      </div>
    </section>
  );
};
