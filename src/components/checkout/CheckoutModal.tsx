import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { storageService } from '../../services/storageService';
import { geocodingService, GeolocationError } from '../../services/geocodingService';
import { Order, OrderItem, PaymentMethod } from '../../types/order';
import { X, MapPin, Check, Smartphone, CreditCard, Banknote, AlertCircle, Loader2 } from 'lucide-react';

interface CheckoutModalProps {
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ onOrderSuccess }) => {
  const {
    items,
    isCheckoutOpen,
    setIsCheckoutOpen,
    subtotal,
    discountAmount,
    shippingFee,
    totalAmount,
    couponCode,
    clearCart
  } = useCart();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  const [isLocating, setIsLocating] = useState(false);
  const [locationNotice, setLocationNotice] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (!isCheckoutOpen) return null;

  const handleUseLocation = async () => {
    setLocationError(null);
    setLocationNotice(null);
    setIsLocating(true);

    try {
      const coords = await geocodingService.getCurrentPosition();
      const resolved = await geocodingService.reverseGeocode(coords.latitude, coords.longitude);

      if (resolved.addressLine1 && !addressLine1) setAddressLine1(resolved.addressLine1);
      if (resolved.addressLine2 && !addressLine2) setAddressLine2(resolved.addressLine2);
      if (resolved.city) setCity(resolved.city);
      if (resolved.state) setState(resolved.state);
      if (resolved.pincode) setPincode(resolved.pincode);

      setLocationNotice('Suggested address populated from your location. Review and confirm below.');
    } catch (err: unknown) {
      const geoErr = err as GeolocationError;
      setLocationError(geoErr.message || 'Unable to access device location. Please enter manually.');
    } finally {
      setIsLocating(false);
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!fullName.trim()) errors.fullName = 'Please enter your name.';
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) errors.phone = 'Valid 10-digit mobile number required.';
    if (!email.trim() || !email.includes('@')) errors.email = 'Valid email required for tracking.';
    if (!addressLine1.trim()) errors.addressLine1 = 'House/building details required.';
    if (!addressLine2.trim()) errors.addressLine2 = 'Street or area required.';
    if (!city.trim()) errors.city = 'City required.';
    if (!state.trim()) errors.state = 'State required.';

    const cleanPin = pincode.replace(/\D/g, '');
    if (cleanPin.length !== 6) errors.pincode = '6-digit Indian PIN code required.';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (items.length === 0) return;

    setIsProcessing(true);

    setTimeout(() => {
      const uniqueOrderNumber = `CM-${Math.floor(10000 + Math.random() * 90000)}`;

      const orderItems: OrderItem[] = items.map((item, index) => ({
        id: `ord-item-${Date.now()}-${index}`,
        variantId: item.variantId,
        variantName: item.variantName,
        customName: item.customisation.riderName,
        bloodGroup: item.customisation.bloodGroup,
        hasFlag: item.customisation.hasFlag,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.unitPrice * item.quantity,
        customisationSnapshot: { ...item.customisation }
      }));

      const newOrder: Order = {
        id: uniqueOrderNumber,
        orderNumber: uniqueOrderNumber,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        customer: {
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim()
        },
        shippingAddress: {
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          addressLine1: addressLine1.trim(),
          addressLine2: addressLine2.trim(),
          landmark: landmark.trim(),
          city: city.trim(),
          state: state.trim(),
          pincode: pincode.trim(),
          deliveryInstructions: deliveryInstructions.trim()
        },
        items: orderItems,
        subtotal,
        discountAmount,
        couponCode: couponCode || undefined,
        shippingFee,
        totalAmount,
        paymentStatus: paymentMethod === 'COD' ? 'COD_CONFIRMED' : 'PAID',
        paymentMethod,
        paymentTransactionId: paymentMethod === 'COD' ? undefined : `GATEWAY-${Date.now()}`,
        fulfilmentStatus: 'PENDING',
        auditLogs: [
          {
            id: `log-${Date.now()}`,
            timestamp: new Date().toISOString(),
            actor: 'Customer Checkout',
            action: `Order Created (${paymentMethod === 'COD' ? 'COD' : 'Paid in Test Mode'})`
          }
        ]
      };

      storageService.saveOrder(newOrder);

      clearCart();
      setIsProcessing(false);
      setIsCheckoutOpen(false);
      onOrderSuccess(newOrder);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-xl transition-opacity"
        onClick={() => setIsCheckoutOpen(false)}
      />

      <div className="min-h-screen px-4 py-8 flex items-center justify-center relative z-10">
        <div className="bg-white dark:bg-[#0D0D11] border border-black/[0.08] dark:border-white/[0.08] rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl transition-colors">
          
          {/* Header */}
          <div className="p-6 border-b border-black/[0.08] dark:border-white/[0.08] flex items-center justify-between">
            <div>
              <h2 className="font-sans font-bold text-lg text-[#1D1D1F] dark:text-white">
                Express Checkout
              </h2>
              <p className="text-xs text-[#86868B] mt-0.5">
                Shipping details for personalised tab dispatch across India.
              </p>
            </div>
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-1.5 rounded-full text-[#86868B] hover:text-black dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.06]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handlePlaceOrder} className="p-6 sm:p-8 space-y-6">
            
            {/* Contact */}
            <div>
              <h3 className="text-xs font-sans uppercase tracking-wider text-[#1D1D1F] dark:text-white mb-3 font-semibold">
                1. Contact
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-xs text-[#1D1D1F] dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-black/30 dark:focus:border-white/30"
                  />
                  {formErrors.fullName && <p className="text-[10px] text-red-500 mt-1">{formErrors.fullName}</p>}
                </div>

                <div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="10-digit mobile"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-xs text-[#1D1D1F] dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-black/30 dark:focus:border-white/30"
                  />
                  {formErrors.phone && <p className="text-[10px] text-red-500 mt-1">{formErrors.phone}</p>}
                </div>

                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-xs text-[#1D1D1F] dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-black/30 dark:focus:border-white/30"
                  />
                  {formErrors.email && <p className="text-[10px] text-red-500 mt-1">{formErrors.email}</p>}
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="border-t border-black/[0.06] dark:border-white/[0.06] pt-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-sans uppercase tracking-wider text-[#1D1D1F] dark:text-white font-semibold">
                  2. Shipping Address
                </h3>

                <button
                  type="button"
                  onClick={handleUseLocation}
                  disabled={isLocating}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.05] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.1] text-xs font-sans text-[#1D1D1F] dark:text-white border border-black/[0.08] dark:border-white/[0.08] transition-all disabled:opacity-50"
                >
                  {isLocating ? (
                    <>
                      <Loader2 className="w-3 h-3 animate-spin" />
                      <span>Locating...</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="w-3 h-3 text-[#FF7700]" />
                      <span>Use current location</span>
                    </>
                  )}
                </button>
              </div>

              {locationNotice && (
                <div className="p-3 mb-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 flex-shrink-0" />
                  <span>{locationNotice}</span>
                </div>
              )}

              {locationError && (
                <div className="p-3 mb-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{locationError}</span>
                </div>
              )}

              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      value={addressLine1}
                      onChange={e => setAddressLine1(e.target.value)}
                      placeholder="House / Flat No., Building"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-xs text-[#1D1D1F] dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-black/30 dark:focus:border-white/30"
                    />
                    {formErrors.addressLine1 && <p className="text-[10px] text-red-500 mt-1">{formErrors.addressLine1}</p>}
                  </div>

                  <div>
                    <input
                      type="text"
                      value={addressLine2}
                      onChange={e => setAddressLine2(e.target.value)}
                      placeholder="Street / Area / Locality"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-xs text-[#1D1D1F] dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-black/30 dark:focus:border-white/30"
                    />
                    {formErrors.addressLine2 && <p className="text-[10px] text-red-500 mt-1">{formErrors.addressLine2}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <input
                      type="text"
                      value={landmark}
                      onChange={e => setLandmark(e.target.value)}
                      placeholder="Landmark (opt)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-xs text-[#1D1D1F] dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-black/30 dark:focus:border-white/30"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      placeholder="City"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-xs text-[#1D1D1F] dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-black/30 dark:focus:border-white/30"
                    />
                    {formErrors.city && <p className="text-[10px] text-red-500 mt-1">{formErrors.city}</p>}
                  </div>

                  <div>
                    <input
                      type="text"
                      value={state}
                      onChange={e => setState(e.target.value)}
                      placeholder="State"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-xs text-[#1D1D1F] dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-black/30 dark:focus:border-white/30"
                    />
                    {formErrors.state && <p className="text-[10px] text-red-500 mt-1">{formErrors.state}</p>}
                  </div>

                  <div>
                    <input
                      type="text"
                      value={pincode}
                      onChange={e => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="PIN Code"
                      maxLength={6}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-xs text-[#1D1D1F] dark:text-white font-mono placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-black/30 dark:focus:border-white/30"
                    />
                    {formErrors.pincode && <p className="text-[10px] text-red-500 mt-1">{formErrors.pincode}</p>}
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    value={deliveryInstructions}
                    onChange={e => setDeliveryInstructions(e.target.value)}
                    placeholder="Delivery instructions (optional)"
                    className="w-full px-3.5 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.08] dark:border-white/[0.08] text-xs text-[#1D1D1F] dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-black/30 dark:focus:border-white/30"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="border-t border-black/[0.06] dark:border-white/[0.06] pt-6">
              <h3 className="text-xs font-sans uppercase tracking-wider text-[#1D1D1F] dark:text-white mb-3 font-semibold">
                3. Payment
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    paymentMethod === 'UPI'
                      ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-sm'
                      : 'bg-black/[0.03] dark:bg-white/[0.03] border-black/[0.08] dark:border-white/[0.08] text-[#86868B] dark:text-[#A1A1A6]'
                  }`}
                >
                  <Smartphone className="w-4 h-4 mb-1.5" />
                  <div className="font-semibold text-xs">UPI</div>
                  <div className="text-[10px] opacity-70">GPay, PhonePe, Paytm</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('CARD')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    paymentMethod === 'CARD'
                      ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-sm'
                      : 'bg-black/[0.03] dark:bg-white/[0.03] border-black/[0.08] dark:border-white/[0.08] text-[#86868B] dark:text-[#A1A1A6]'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mb-1.5" />
                  <div className="font-semibold text-xs">Card</div>
                  <div className="text-[10px] opacity-70">Visa, Mastercard</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('COD')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    paymentMethod === 'COD'
                      ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-sm'
                      : 'bg-black/[0.03] dark:bg-white/[0.03] border-black/[0.08] dark:border-white/[0.08] text-[#86868B] dark:text-[#A1A1A6]'
                  }`}
                >
                  <Banknote className="w-4 h-4 mb-1.5" />
                  <div className="font-semibold text-xs">Cash on Delivery</div>
                  <div className="text-[10px] opacity-70">Pay on parcel arrival</div>
                </button>
              </div>
            </div>

            {/* Submit */}
            <div className="border-t border-black/[0.08] dark:border-white/[0.08] pt-6 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#86868B] block">Total Payable</span>
                <span className="text-2xl font-sans font-bold text-[#1D1D1F] dark:text-white tracking-tight">₹{totalAmount}</span>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="px-8 py-3.5 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-90 font-semibold text-xs uppercase tracking-wider transition-all disabled:opacity-50"
              >
                {isProcessing ? 'Confirming...' : 'Place Order'}
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};
