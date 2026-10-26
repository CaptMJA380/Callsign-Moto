import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem } from '../types/order';
import { storageService } from '../services/storageService';

interface Coupon {
  code: string;
  discountType: 'PERCENTAGE' | 'FLAT';
  value: number; // e.g. 10 for 10%, 100 for ₹100
  minOrderValue: number;
}

const AVAILABLE_COUPONS: Coupon[] = [
  { code: 'RIDER10', discountType: 'PERCENTAGE', value: 10, minOrderValue: 500 },
  { code: 'TIGERCLUB', discountType: 'FLAT', value: 150, minOrderValue: 800 },
  { code: 'BHARAT', discountType: 'FLAT', value: 50, minOrderValue: 399 }
];

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  couponCode: string;
  appliedCoupon: Coupon | null;
  couponError: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
  totalQuantity: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('csm_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  const productConfig = storageService.getProductConfig();

  useEffect(() => {
    localStorage.setItem('csm_cart_items', JSON.stringify(items));
  }, [items]);

  const addItem = (newItemData: Omit<CartItem, 'id'>) => {
    // Check if identical customisation already exists in cart
    const existingIndex = items.findIndex(
      item =>
        item.variantId === newItemData.variantId &&
        item.customisation.riderName.toUpperCase() === newItemData.customisation.riderName.toUpperCase() &&
        item.customisation.bloodGroup === newItemData.customisation.bloodGroup &&
        item.customisation.hasFlag === newItemData.customisation.hasFlag
    );

    if (existingIndex > -1) {
      const updated = [...items];
      updated[existingIndex].quantity += newItemData.quantity;
      setItems(updated);
    } else {
      const newItem: CartItem = {
        ...newItemData,
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`
      };
      setItems(prev => [newItem, ...prev]);
    }

    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems(prev =>
      prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    setCouponError(null);

    const match = AVAILABLE_COUPONS.find(c => c.code === clean);
    if (!match) {
      setCouponError('Invalid promo code. Try RIDER10 or BHARAT.');
      return false;
    }

    if (subtotal < match.minOrderValue) {
      setCouponError(`This coupon requires a minimum cart value of ₹${match.minOrderValue}.`);
      return false;
    }

    setAppliedCoupon(match);
    setCouponCode(clean);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError(null);
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrderValue) {
    if (appliedCoupon.discountType === 'PERCENTAGE') {
      discountAmount = Math.round((subtotal * appliedCoupon.value) / 100);
    } else {
      discountAmount = Math.min(subtotal, appliedCoupon.value);
    }
  }

  const shippingFee = subtotal === 0 || subtotal >= productConfig.freeShippingThreshold ? 0 : productConfig.shippingFlatRate;
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        couponCode,
        appliedCoupon,
        couponError,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        shippingFee,
        totalAmount,
        totalQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
