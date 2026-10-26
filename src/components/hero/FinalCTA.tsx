import React from 'react';
import { ArrowRight } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-28 sm:py-36 bg-[#F5F5F7]/80 dark:bg-black/70 backdrop-blur-md border-t border-black/[0.06] dark:border-white/[0.06] transition-colors duration-300 relative text-center">
      
      {/* Subtle Apple glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[radial-gradient(ellipse_at_center,rgba(255,119,0,0.06),transparent_70%)] blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10">
        
        <span className="text-[12px] font-sans text-[#86868B] uppercase tracking-widest block mb-3 font-medium">
          Rider Identification Standard
        </span>

        <h2 className="text-4xl sm:text-6xl font-sans font-bold tracking-tight text-[#1D1D1F] dark:text-white mb-6">
          Make your gear yours.
        </h2>

        <p className="text-base sm:text-lg text-[#86868B] max-w-xl mx-auto mb-10 leading-relaxed">
          Join touring riders across India wearing their name, blood group, and Tiranga on every highway.
        </p>

        <a
          href="#customise"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-90 text-xs font-sans font-semibold uppercase tracking-wider transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Create Your Name Tab</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>

        <div className="mt-10 flex items-center justify-center gap-6 text-[11px] font-sans text-[#86868B]">
          <span>Standard 125 × 30 mm Fit</span>
          <span>•</span>
          <span>Complimentary Loop Swatch</span>
          <span>•</span>
          <span>Express Pan-India Delivery</span>
        </div>

      </div>
    </section>
  );
};
