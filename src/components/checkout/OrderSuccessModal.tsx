import React, { useEffect } from 'react';
import { Order } from '../../types/order';
import confetti from 'canvas-confetti';
import { Check, Package, MapPin, ArrowRight } from 'lucide-react';
import { LivePatchPreview } from '../customizer/LivePatchPreview';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  useEffect(() => {
    if (order) {
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }
  }, [order]);

  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity" onClick={onClose} />

      <div className="min-h-screen px-4 py-8 flex items-center justify-center relative z-10">
        <div className="bg-[#0D0D11] border border-white/[0.08] rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl p-6 sm:p-8">
          
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-white text-black mx-auto flex items-center justify-center mb-4">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>

            <span className="text-[11px] font-sans uppercase tracking-widest text-[#86868B] block mb-1">
              Order Confirmed
            </span>

            <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white tracking-tight mb-2">
              #{order.orderNumber}
            </h2>

            <p className="text-xs sm:text-sm text-[#86868B] max-w-sm mx-auto">
              Thank you, {order.customer.fullName}. Your custom tab configuration has been queued for precision embroidery.
            </p>
          </div>

          <div className="mb-6 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <div className="text-xs font-sans text-white mb-3 flex items-center gap-1.5 font-semibold">
              <Package className="w-3.5 h-3.5" />
              <span>Confirmed Specification</span>
            </div>

            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-black/60 border border-white/[0.04]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-sans font-medium text-white text-xs">
                      {item.variantName} (Qty: {item.quantity})
                    </span>
                    <span className="font-mono text-xs text-white">
                      ₹{item.totalPrice}
                    </span>
                  </div>

                  <div className="scale-85 origin-center pointer-events-none mb-2">
                    <LivePatchPreview
                      variantId={item.variantId}
                      riderName={item.customName}
                      bloodGroup={item.bloodGroup || ''}
                      hasFlag={item.hasFlag}
                      showInspectionControls={false}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-[11px] font-mono text-[#86868B] pt-2 border-t border-white/[0.06]">
                    <div>Name: <span className="text-white">{item.customName}</span></div>
                    <div>Blood: <span className="text-rose-400">{item.bloodGroup || 'N/A'}</span></div>
                    <div>Flag: <span className="text-white">{item.hasFlag ? 'Yes' : 'No'}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] mb-6 text-xs text-[#86868B] space-y-1">
            <div className="text-[11px] text-white font-medium flex items-center gap-1.5 mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Shipping to</span>
            </div>
            <div className="text-white">{order.shippingAddress.fullName} ({order.shippingAddress.phone})</div>
            <div>{order.shippingAddress.addressLine1}, {order.shippingAddress.addressLine2}</div>
            <div>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-full bg-white text-black hover:bg-[#E5E5EA] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm"
          >
            <span>Return to Store</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

        </div>
      </div>
    </div>
  );
};
