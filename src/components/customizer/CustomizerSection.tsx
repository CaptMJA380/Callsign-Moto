import React, { useState } from 'react';
import { BloodGroup, VariantType } from '../../types/product';
import { useCart } from '../../context/CartContext';
import { storageService } from '../../services/storageService';
import { LivePatchPreview } from './LivePatchPreview';
import { Check, ShoppingBag, ArrowRight, AlertCircle } from 'lucide-react';

interface CustomizerSectionProps {
  selectedVariantId?: VariantType;
  onVariantChange?: (v: VariantType) => void;
}

export const CustomizerSection: React.FC<CustomizerSectionProps> = ({
  selectedVariantId = 'TRICOLOUR_EDITION',
  onVariantChange
}) => {
  const [activeVariant, setActiveVariant] = useState<VariantType>(selectedVariantId);
  const [riderName, setRiderName] = useState('BHUSHAN');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>('O+');
  const [hasFlag, setHasFlag] = useState(true);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { addItem, setIsCheckoutOpen } = useCart();
  const variants = storageService.getVariants();
  const productConfig = storageService.getProductConfig();

  const currentVariant = variants.find(v => v.id === activeVariant) || variants[2];

  const handleVariantSelect = (v: VariantType) => {
    setActiveVariant(v);
    if (onVariantChange) onVariantChange(v);
    setErrorMessage(null);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^a-zA-Z0-9 -]/g, '').slice(0, currentVariant.maxNameLength);
    setRiderName(val.toUpperCase());
    if (errorMessage) setErrorMessage(null);
  };

  const validateCustomisation = (): boolean => {
    const trimmed = riderName.trim();
    if (trimmed.length < productConfig.minNameLength) {
      setErrorMessage(`Name tab must have at least ${productConfig.minNameLength} characters.`);
      return false;
    }
    if (currentVariant.requiresBloodGroup && !bloodGroup) {
      setErrorMessage('Please select a blood group.');
      return false;
    }
    return true;
  };

  const handleAddToCart = () => {
    if (!validateCustomisation()) return;

    addItem({
      variantId: currentVariant.id,
      variantName: currentVariant.name,
      unitPrice: currentVariant.basePrice,
      quantity: 1,
      customisation: {
        variantId: currentVariant.id,
        riderName: riderName.trim().toUpperCase(),
        bloodGroup: currentVariant.requiresBloodGroup ? bloodGroup : '',
        hasFlag: currentVariant.includesFlag ? hasFlag : false,
        threadColor: 'Signature Golden Yellow & Crimson Red',
        fabricBase: '1000D Tactical Cordura Black',
        edgeType: 'Golden Yellow Merrowed Border'
      }
    });

    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 2000);
  };

  const handleBuyNow = () => {
    if (!validateCustomisation()) return;
    handleAddToCart();
    setIsCheckoutOpen(true);
  };

  return (
    <section id="customise" className="py-20 sm:py-28 bg-[#F5F5F7]/80 dark:bg-black/70 backdrop-blur-md border-t border-black/[0.06] dark:border-white/[0.06] transition-colors duration-300 relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[12px] font-sans text-[#86868B] uppercase tracking-widest block mb-2 font-medium">
            Studio Customiser
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7] mb-3">
            Design your patch.
          </h2>
        </div>

        {/* Studio Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Live Preview Stage */}
          <div className="lg:col-span-7 flex flex-col items-center lg:sticky lg:top-24">
            <LivePatchPreview
              variantId={activeVariant}
              riderName={riderName}
              bloodGroup={bloodGroup}
              hasFlag={hasFlag}
            />

            <div className="mt-4 text-center">
              <span className="text-[12px] text-[#86868B] font-sans">
                Standard 125 × 30 mm (5″ × 1.2″) • Hook &amp; Loop Compatible
              </span>
            </div>
          </div>

          {/* Right Column: Apple-style Minimal Configurator */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
            
            {/* 1. iOS-style Segmented Picker for Variant */}
            <div>
              <label className="block text-[11px] font-sans uppercase tracking-wider text-[#86868B] mb-2.5 font-medium">
                Select Edition
              </label>
              
              <div className="p-1 rounded-2xl bg-black/[0.05] dark:bg-white/[0.06] border border-black/[0.08] dark:border-white/[0.08] grid grid-cols-3 gap-1">
                {variants.map(v => {
                  const isSelected = activeVariant === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => handleVariantSelect(v.id)}
                      className={`py-2 px-2 rounded-xl text-[12px] font-sans transition-all text-center leading-tight ${
                        isSelected
                          ? 'bg-white dark:bg-white text-black font-semibold shadow-sm'
                          : 'text-[#86868B] dark:text-[#A1A1A6] hover:text-black dark:hover:text-white'
                      }`}
                    >
                      <div>
                        {v.id === 'NAME_ONLY' && 'Name Tab'}
                        {v.id === 'NAME_BLOOD' && 'Name + Blood'}
                        {v.id === 'TRICOLOUR_EDITION' && 'Tricolour'}
                      </div>
                      <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-zinc-600 font-mono' : 'text-[#86868B]'}`}>
                        ₹{v.basePrice}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Text Input for Callsign */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="rider-callsign" className="text-[11px] font-sans uppercase tracking-wider text-[#86868B] font-medium">
                  Rider Callsign / Name
                </label>
                <span className="text-[11px] font-mono text-[#86868B]">
                  {riderName.length}/{currentVariant.maxNameLength}
                </span>
              </div>
              <input
                id="rider-callsign"
                type="text"
                value={riderName}
                onChange={handleNameChange}
                placeholder="YOUR NAME"
                maxLength={currentVariant.maxNameLength}
                className="w-full px-4 py-3 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.1] dark:border-white/[0.08] text-[#1D1D1F] dark:text-white placeholder-zinc-500 focus:outline-none focus:border-black/30 dark:focus:border-white/40 text-base font-semibold tracking-wider transition-all"
              />
            </div>

            {/* 3. Blood Group Pill Chips */}
            {currentVariant.requiresBloodGroup && (
              <div>
                <label className="block text-[11px] font-sans uppercase tracking-wider text-[#86868B] mb-2 font-medium">
                  Blood Group
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {productConfig.supportedBloodGroups.map(bg => (
                    <button
                      key={bg}
                      type="button"
                      onClick={() => setBloodGroup(bg)}
                      className={`py-2 rounded-xl text-[12px] font-mono font-medium transition-all ${
                        bloodGroup === bg
                          ? 'bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/40 shadow-sm'
                          : 'bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.06] text-[#86868B] dark:text-[#A1A1A6] hover:text-black dark:hover:text-white'
                      }`}
                    >
                      {bg}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Flag Toggle (iOS Style Switch) */}
            {currentVariant.includesFlag && (
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🇮🇳</span>
                  <div className="text-[12px] font-sans">
                    <div className="text-[#1D1D1F] dark:text-white font-medium">Indian National Flag</div>
                    <div className="text-[#86868B] text-[11px]">24-spoke Ashoka Chakra</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setHasFlag(!hasFlag)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    hasFlag ? 'bg-[#FF7700]' : 'bg-black/20 dark:bg-white/20'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      hasFlag ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Price Row */}
            <div className="pt-3 border-t border-black/[0.08] dark:border-white/[0.08] flex items-baseline justify-between">
              <div>
                <span className="text-xs text-[#86868B]">Total Price</span>
                <div className="text-2xl font-sans font-bold text-[#1D1D1F] dark:text-white tracking-tight">
                  ₹{currentVariant.basePrice}
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-sans block font-medium">
                  Loop Swatch Included
                </span>
                <span className="text-[10px] text-[#86868B]">Pan-India Shipping</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-3.5 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-90 active:scale-[0.98] font-sans font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                {isAddedFeedback ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full py-3 rounded-full bg-black/[0.04] dark:bg-white/[0.04] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] text-[#1D1D1F] dark:text-[#F5F5F7] border border-black/[0.08] dark:border-white/[0.08] text-xs font-sans font-medium flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Express Checkout</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#86868B]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
