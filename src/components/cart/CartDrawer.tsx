import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { X, Trash2, Plus, Minus, Tag, ArrowRight, ShoppingBag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    updateQuantity,
    removeItem,
    subtotal,
    discountAmount,
    shippingFee,
    totalAmount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    couponError
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    if (applyCoupon(couponInput)) {
      setCouponInput('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/60 dark:bg-black/75 backdrop-blur-md transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-8">
        <div className="w-screen max-w-md bg-white dark:bg-[#0C0C0E] border-l border-black/[0.08] dark:border-white/[0.08] flex flex-col justify-between shadow-2xl transition-colors">
          
          {/* Header */}
          <div className="p-6 border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#1D1D1F] dark:text-white" />
              <h2 className="font-sans font-semibold text-sm text-[#1D1D1F] dark:text-white">Review Bag</h2>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-black/[0.05] dark:bg-white/[0.06] text-[#86868B] dark:text-[#A1A1A6]">
                {items.length}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-[#86868B] hover:text-black dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.06] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingBag className="w-10 h-10 text-zinc-400 dark:text-zinc-700 mx-auto mb-3" />
                <h3 className="text-sm font-sans font-medium text-[#1D1D1F] dark:text-white mb-1">Your bag is empty</h3>
                <p className="text-xs text-[#86868B] mb-6">Customise your first rider name tab to get started.</p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    const el = document.getElementById('customise');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black font-semibold text-xs transition-transform hover:scale-[1.02]"
                >
                  Start Customising
                </button>
              </div>
            ) : (
              items.map(item => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-sans font-semibold text-sm text-[#1D1D1F] dark:text-white">
                        {item.variantName}
                      </h4>
                      <div className="text-xs text-[#86868B] mt-0.5 font-mono">
                        ₹{item.unitPrice}
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-zinc-400 hover:text-red-500 p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-2.5 rounded-xl bg-black/[0.04] dark:bg-black/60 border border-black/[0.04] dark:border-white/[0.04] text-xs font-mono space-y-1">
                    <div className="flex justify-between">
                      <span className="text-[#86868B]">Callsign:</span>
                      <span className="text-[#1D1D1F] dark:text-white font-bold">{item.customisation.riderName}</span>
                    </div>

                    {item.customisation.bloodGroup && (
                      <div className="flex justify-between">
                        <span className="text-[#86868B]">Blood Group:</span>
                        <span className="text-rose-500 font-bold">{item.customisation.bloodGroup}</span>
                      </div>
                    )}

                    {item.customisation.hasFlag && (
                      <div className="flex justify-between text-[11px]">
                        <span className="text-[#86868B]">Indian Flag:</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">Included</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-black/[0.06] dark:border-white/[0.06]">
                    <div className="flex items-center border border-black/[0.08] dark:border-white/[0.08] rounded-full bg-black/[0.03] dark:bg-black/40">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1.5 text-[#86868B] hover:text-black dark:hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-mono text-[#1D1D1F] dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1.5 text-[#86868B] hover:text-black dark:hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="font-sans font-bold text-sm text-[#1D1D1F] dark:text-white">
                      ₹{item.unitPrice * item.quantity}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-black/[0.08] dark:border-white/[0.08] bg-[#F5F5F7] dark:bg-[#0A0A0C] space-y-4">
              
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{appliedCoupon.code}</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-[#86868B] hover:text-black dark:hover:text-white underline font-mono"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value)}
                    placeholder="PROMO CODE (RIDER10)"
                    className="flex-1 px-3 py-2 rounded-xl bg-white dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-xs uppercase font-mono text-[#1D1D1F] dark:text-white placeholder-zinc-400 dark:placeholder-zinc-700 focus:outline-none focus:border-black/30 dark:focus:border-white/30"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-black/[0.06] dark:bg-white/[0.06] hover:bg-black/[0.1] dark:hover:bg-white/[0.1] text-xs font-sans text-[#1D1D1F] dark:text-white border border-black/[0.08] dark:border-white/[0.08]"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponError && (
                <div className="text-[11px] text-red-500 font-mono">{couponError}</div>
              )}

              <div className="space-y-1 text-xs text-[#86868B]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#1D1D1F] dark:text-white font-mono">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Discount</span>
                    <span className="font-mono">-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-[#1D1D1F] dark:text-white font-mono">
                    {shippingFee === 0 ? <span className="text-emerald-600 dark:text-emerald-400">Free</span> : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#1D1D1F] dark:text-white pt-2 border-t border-black/[0.08] dark:border-white/[0.08]">
                  <span>Total</span>
                  <span className="font-sans">₹{totalAmount}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleProceedCheckout}
                className="w-full py-3.5 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-90 font-sans font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
