import { BloodGroup, CustomisationData, VariantType } from './product';

export interface CartItem {
  id: string; // unique item id in cart
  variantId: VariantType;
  variantName: string;
  unitPrice: number;
  quantity: number;
  customisation: CustomisationData;
  previewSnapshotUrl?: string; // data URL or generated identifier
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  addressLine1: string; // House/Flat No, Building
  addressLine2: string; // Street, Area
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  deliveryInstructions?: string;
}

export type OrderStatus = 'PENDING' | 'IN_PRODUCTION' | 'DISPATCHED' | 'DELIVERED' | 'CANCELLED';
export type PaymentStatus = 'PAID' | 'PENDING' | 'FAILED' | 'REFUNDED' | 'COD_CONFIRMED';
export type PaymentMethod = 'CARD' | 'UPI' | 'NETBANKING' | 'COD' | 'TEST_MODE';

export interface OrderAuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  notes?: string;
}

export interface OrderItem {
  id: string;
  variantId: VariantType;
  variantName: string;
  customName: string;
  bloodGroup?: BloodGroup | '';
  hasFlag: boolean;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  customisationSnapshot: CustomisationData;
}

export interface Order {
  id: string; // e.g. "CM-84920"
  orderNumber: string;
  createdAt: string;
  updatedAt: string;
  customer: {
    fullName: string;
    phone: string;
    email: string;
  };
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  shippingFee: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  paymentTransactionId?: string;
  fulfilmentStatus: OrderStatus;
  trackingNumber?: string;
  courierName?: string;
  internalNotes?: string;
  auditLogs: OrderAuditLog[];
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: 'SUPER_ADMIN' | 'FULFILMENT_ADMIN' | 'READONLY';
  lastLogin?: string;
}
