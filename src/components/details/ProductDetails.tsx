import React from 'react';
import { storageService } from '../../services/storageService';

export const ProductDetails: React.FC = () => {
  const config = storageService.getProductConfig();

  return (
    <section id="details" className="py-24 sm:py-32 bg-[#000000] border-t border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[12px] font-sans text-[#86868B] uppercase tracking-widest block mb-2 font-medium">
            Tech Specs
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-[#F5F5F7] mb-3">
            Crafted for the highway.
          </h2>
          <p className="text-base text-[#86868B]">
            Constructed to withstand high-speed airflow, dust, vibration, and monsoon rains.
          </p>
        </div>

        {/* Spec Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          
          <div className="p-6 rounded-3xl glass-panel">
            <span className="text-[11px] font-sans text-[#86868B] uppercase tracking-wider block mb-1">Dimensions</span>
            <div className="text-2xl font-sans font-bold text-white tracking-tight mb-2">
              {config.dimensionsMm.width} × {config.dimensionsMm.height} mm
            </div>
            <p className="text-xs text-[#86868B] leading-relaxed">
              Standard {config.dimensionsInches} touring format. Precision-matched to factory chest and sleeve loop panels.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel">
            <span className="text-[11px] font-sans text-[#86868B] uppercase tracking-wider block mb-1">Base Textile</span>
            <div className="text-2xl font-sans font-bold text-white tracking-tight mb-2">
              1000D Cordura
            </div>
            <p className="text-xs text-[#86868B] leading-relaxed">
              High-tensile woven ballistic nylon backing in jet black with high abrasion and tear resistance.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel">
            <span className="text-[11px] font-sans text-[#86868B] uppercase tracking-wider block mb-1">Embroidery Edge</span>
            <div className="text-2xl font-sans font-bold text-white tracking-tight mb-2">
              Merrowed Border
            </div>
            <p className="text-xs text-[#86868B] leading-relaxed">
              Continuous overcast merrowed edge prevents fraying, keeping letters sharp across thousands of kilometres.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel">
            <span className="text-[11px] font-sans text-[#86868B] uppercase tracking-wider block mb-1">Attachment</span>
            <div className="text-2xl font-sans font-bold text-white tracking-tight mb-2">
              Hook &amp; Loop
            </div>
            <p className="text-xs text-[#86868B] leading-relaxed">
              Permanent hook Velcro backing. Every order includes a complimentary matching loop swatch.
            </p>
          </div>

        </div>

        {/* Responsible Safety Notice */}
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] max-w-3xl mx-auto text-center text-xs text-[#86868B] leading-relaxed">
          <strong className="text-white font-sans block mb-0.5">Medical Responsibility Notice:</strong>
          While the embroidered blood group assists first responders with roadside secondary identification, medical teams follow standard clinical transfusion guidelines. Riders should always carry official ID and emergency contacts.
        </div>

      </div>
    </section>
  );
};
