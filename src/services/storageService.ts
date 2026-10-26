import { BrandConfig } from '../types/brand';
import { Order, OrderStatus } from '../types/order';
import { ProductConfig, ProductVariant } from '../types/product';
import { INITIAL_BRAND_CONFIG } from '../config/brandConfig';
import { INITIAL_PRODUCT_CONFIG, INITIAL_VARIANTS } from '../config/productsConfig';

const STORAGE_KEYS = {
  BRAND: 'csm_brand_config_v1',
  VARIANTS: 'csm_product_variants_v1',
  PRODUCT_CONFIG: 'csm_product_config_v1',
  ORDERS: 'csm_orders_v1',
  ADMIN_SESSION: 'csm_admin_session_v1',
  INITIALIZED: 'csm_initialized_v1'
};

const SEED_ORDERS: Order[] = [
  {
    id: 'CM-98421',
    orderNumber: 'CM-98421',
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    customer: {
      fullName: 'Kabir Roy',
      phone: '+91 98201 44552',
      email: 'kabir.roy@ridersmail.in'
    },
    shippingAddress: {
      fullName: 'Kabir Roy',
      phone: '+91 98201 44552',
      email: 'kabir.roy@ridersmail.in',
      addressLine1: 'B-402, Highline Ridge Apartments',
      addressLine2: 'Off Bannerghatta Road, Arekere',
      landmark: 'Near Meenakshi Temple',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560076',
      deliveryInstructions: 'Leave with society security gate 2 if touring.'
    },
    items: [
      {
        id: 'item-101',
        variantId: 'TRICOLOUR_EDITION',
        variantName: 'Tricolour Edition Tab',
        customName: 'KABIR',
        bloodGroup: 'O+',
        hasFlag: true,
        quantity: 2,
        unitPrice: 499,
        totalPrice: 998,
        customisationSnapshot: {
          variantId: 'TRICOLOUR_EDITION',
          riderName: 'KABIR',
          bloodGroup: 'O+',
          hasFlag: true,
          threadColor: 'Classic White',
          fabricBase: '1000D Tactical Cordura Black',
          edgeType: 'Overlocked Merrowed Border'
        }
      }
    ],
    subtotal: 998,
    discountAmount: 0,
    shippingFee: 0,
    totalAmount: 998,
    paymentStatus: 'PAID',
    paymentMethod: 'UPI',
    paymentTransactionId: 'UPI-RAZOR-9912093481',
    fulfilmentStatus: 'DISPATCHED',
    courierName: 'BlueDart Express',
    trackingNumber: 'BD749102849IN',
    internalNotes: 'Double-check stitch density on Tiranga flag crest.',
    auditLogs: [
      {
        id: 'log-1',
        timestamp: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
        actor: 'Customer Checkout',
        action: 'Order Placed (Paid via UPI)'
      },
      {
        id: 'log-2',
        timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
        actor: 'Admin (System)',
        action: 'Status updated to IN_PRODUCTION'
      },
      {
        id: 'log-3',
        timestamp: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
        actor: 'Fulfilment Lead',
        action: 'Dispatched via BlueDart (Tracking: BD749102849IN)'
      }
    ]
  },
  {
    id: 'CM-98422',
    orderNumber: 'CM-98422',
    createdAt: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
    customer: {
      fullName: 'Ananya Sharma',
      phone: '+91 97110 88291',
      email: 'ananya.moto@gmail.com'
    },
    shippingAddress: {
      fullName: 'Ananya Sharma',
      phone: '+91 97110 88291',
      email: 'ananya.moto@gmail.com',
      addressLine1: 'Plot 74, Sector 28',
      addressLine2: 'Near Golf Course Road',
      landmark: 'Behind DLF Phase 1 Metro',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122002',
      deliveryInstructions: 'Call before delivery.'
    },
    items: [
      {
        id: 'item-102',
        variantId: 'NAME_BLOOD',
        variantName: 'Name + Blood Group Tab',
        customName: 'VALKYRIE',
        bloodGroup: 'B+',
        hasFlag: false,
        quantity: 1,
        unitPrice: 449,
        totalPrice: 449,
        customisationSnapshot: {
          variantId: 'NAME_BLOOD',
          riderName: 'VALKYRIE',
          bloodGroup: 'B+',
          hasFlag: false,
          threadColor: 'Classic White',
          fabricBase: '1000D Tactical Cordura Black',
          edgeType: 'Overlocked Merrowed Border'
        }
      }
    ],
    subtotal: 449,
    discountAmount: 0,
    shippingFee: 49,
    totalAmount: 498,
    paymentStatus: 'PAID',
    paymentMethod: 'CARD',
    paymentTransactionId: 'PAY-HDFC-00128472',
    fulfilmentStatus: 'IN_PRODUCTION',
    internalNotes: 'Triumph Tiger 660 rider. Requested extra high-contrast white lettering.',
    auditLogs: [
      {
        id: 'log-4',
        timestamp: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
        actor: 'Customer Checkout',
        action: 'Order Placed (Paid via Credit Card)'
      },
      {
        id: 'log-5',
        timestamp: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
        actor: 'Admin',
        action: 'Status updated to IN_PRODUCTION (Hoop #4)'
      }
    ]
  },
  {
    id: 'CM-98423',
    orderNumber: 'CM-98423',
    createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    customer: {
      fullName: 'Vikramaditya Rao',
      phone: '+91 99882 11029',
      email: 'vikram.rao@touringindia.org'
    },
    shippingAddress: {
      fullName: 'Vikramaditya Rao',
      phone: '+91 99882 11029',
      email: 'vikram.rao@touringindia.org',
      addressLine1: 'Flat 12B, Emerald Towers',
      addressLine2: 'Bandra West, Hill Road',
      landmark: 'Opposite Mehboob Studio',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050'
    },
    items: [
      {
        id: 'item-103',
        variantId: 'NAME_ONLY',
        variantName: 'Rider Name Tab',
        customName: 'VIKRAM',
        bloodGroup: '',
        hasFlag: false,
        quantity: 2,
        unitPrice: 399,
        totalPrice: 798,
        customisationSnapshot: {
          variantId: 'NAME_ONLY',
          riderName: 'VIKRAM',
          bloodGroup: '',
          hasFlag: false,
          threadColor: 'Classic White',
          fabricBase: '1000D Tactical Cordura Black',
          edgeType: 'Overlocked Merrowed Border'
        }
      }
    ],
    subtotal: 798,
    discountAmount: 0,
    shippingFee: 49,
    totalAmount: 847,
    paymentStatus: 'PAID',
    paymentMethod: 'UPI',
    paymentTransactionId: 'UPI-GPAY-77291044',
    fulfilmentStatus: 'PENDING',
    internalNotes: 'Awaiting embroidery queue batching.',
    auditLogs: [
      {
        id: 'log-6',
        timestamp: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
        actor: 'Customer Checkout',
        action: 'Order Placed (Paid via UPI)'
      }
    ]
  }
];

export const storageService = {
  // Brand Configuration
  getBrandConfig(): BrandConfig {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.BRAND);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return INITIAL_BRAND_CONFIG;
  },

  saveBrandConfig(config: BrandConfig): void {
    localStorage.setItem(STORAGE_KEYS.BRAND, JSON.stringify(config));
  },

  // Product Variants
  getVariants(): ProductVariant[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.VARIANTS);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return INITIAL_VARIANTS;
  },

  saveVariants(variants: ProductVariant[]): void {
    localStorage.setItem(STORAGE_KEYS.VARIANTS, JSON.stringify(variants));
  },

  // Product General Config
  getProductConfig(): ProductConfig {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PRODUCT_CONFIG);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return INITIAL_PRODUCT_CONFIG;
  },

  saveProductConfig(config: ProductConfig): void {
    localStorage.setItem(STORAGE_KEYS.PRODUCT_CONFIG, JSON.stringify(config));
  },

  // Orders
  getOrders(): Order[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    // Seed initial synthetic orders if none exist
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(SEED_ORDERS));
    return SEED_ORDERS;
  },

  saveOrder(newOrder: Order): void {
    const orders = this.getOrders();
    const updated = [newOrder, ...orders];
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
  },

  updateOrderStatus(orderId: string, status: OrderStatus, trackingNumber?: string, internalNotes?: string, actor: string = 'Admin'): Order | null {
    const orders = this.getOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index === -1) return null;

    const current = orders[index];
    const log = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor,
      action: `Status changed from ${current.fulfilmentStatus} to ${status}${trackingNumber ? ` (Tracking: ${trackingNumber})` : ''}`,
      notes: internalNotes
    };

    const updatedOrder: Order = {
      ...current,
      fulfilmentStatus: status,
      updatedAt: new Date().toISOString(),
      trackingNumber: trackingNumber !== undefined ? trackingNumber : current.trackingNumber,
      internalNotes: internalNotes !== undefined ? internalNotes : current.internalNotes,
      auditLogs: [...current.auditLogs, log]
    };

    orders[index] = updatedOrder;
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    return updatedOrder;
  },

  resetToDefaults(): void {
    localStorage.removeItem(STORAGE_KEYS.BRAND);
    localStorage.removeItem(STORAGE_KEYS.VARIANTS);
    localStorage.removeItem(STORAGE_KEYS.PRODUCT_CONFIG);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(SEED_ORDERS));
  }
};
