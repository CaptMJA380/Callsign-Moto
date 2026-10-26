import React from 'react';
import { VariantType } from '../../types/product';
import { storageService } from '../../services/storageService';
import { LivePatchPreview } from '../customizer/LivePatchPreview';
import { Check, ArrowRight } from 'lucide-react';

interface VariantComparisonProps {
  onSelectVariant: (v: VariantType) => void;
}

export const VariantComparison: React.FC<VariantComparisonProps> = ({ onSelectVariant }) => {
  const variants = storageService.getVariants();

  const handleCardSelect = (v: VariantType) => {
    onSelectVariant(v);
    const element = document.getElementById('customise');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="variants" className="py-24 sm:py-32 bg-[#F5F5F7]/80 dark:bg-black/70 backdrop-blur-md border-t border-black/[0.06] dark:border-white/[0.06] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[12px] font-sans text-[#86868B] uppercase tracking-widest block mb-2 font-medium">
            Compare Lineup
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7] mb-3">
            Three distinct editions.
          </h2>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {variants.map(variant => {
            const isFeatured = variant.id === 'TRICOLOUR_EDITION';

            return (
              <div
                key={variant.id}
                className={`relative rounded-3xl flex flex-col justify-between p-6 sm:p-8 transition-all duration-300 ${
                  isFeatured
                    ? 'glass-panel ring-1 ring-black/20 dark:ring-white/30 shadow-lg'
                    : 'glass-panel hover:border-black/20 dark:hover:border-white/20'
                }`}
              >
                <div>
                  {/* Subtle Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-sans uppercase tracking-wider text-[#86868B] dark:text-[#A1A1A6] font-medium">
                      {variant.badgeLabel}
                    </span>
                    {isFeatured && (
                      <span className="text-[10px] font-sans px-2.5 py-0.5 rounded-full bg-black text-white dark:bg-white dark:text-black font-semibold">
                        Popular
                      </span>
                    )}
                  </div>

                  {/* Title & Price */}
                  <h3 className="text-2xl font-sans font-bold text-[#1D1D1F] dark:text-white tracking-tight mb-2">
                    {variant.name}
                  </h3>

                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl font-sans font-bold text-[#1D1D1F] dark:text-white tracking-tight">₹{variant.basePrice}</span>
                    {variant.comparePrice && (
                      <span className="text-sm font-sans text-[#86868B] line-through">₹{variant.comparePrice}</span>
                    )}
                  </div>

                  {/* Preview Render */}
                  <div className="mb-6 pointer-events-none scale-90 origin-center">
                    <LivePatchPreview
                      variantId={variant.id}
                      riderName={
                        variant.id === 'NAME_ONLY'
                          ? 'FARHAN'
                          : variant.id === 'NAME_BLOOD'
                          ? 'BHUSHAN'
                          : 'SOHAM'
                      }
                      bloodGroup={variant.id === 'NAME_BLOOD' ? 'O+' : 'B+'}
                      hasFlag={variant.includesFlag}
                      showInspectionControls={false}
                    />
                  </div>

                  {/* Features List */}
                  <ul className="space-y-2.5 mb-8 border-t border-black/[0.06] dark:border-white/[0.06] pt-6">
                    {variant.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#515154] dark:text-[#A1A1A6]">
                        <Check className="w-3.5 h-3.5 text-black dark:text-white flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                <button
                  type="button"
                  onClick={() => handleCardSelect(variant.id)}
                  className={`w-full py-3 rounded-full text-xs font-sans font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                    isFeatured
                      ? 'bg-black text-white dark:bg-white dark:text-black hover:opacity-90 shadow-sm'
                      : 'bg-black/[0.05] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-[#1D1D1F] dark:text-white border border-black/[0.08] dark:border-white/[0.08]'
                  }`}
                >
                  <span>Select &amp; Customise</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
