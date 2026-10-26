import { ProductConfig, ProductVariant } from '../types/product';

export const INITIAL_PRODUCT_CONFIG: ProductConfig = {
  minNameLength: 2,
  maxNameLength: 14,
  supportedBloodGroups: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  defaultThreadColor: 'Signature Golden Yellow & Crimson Red',
  defaultFabricBase: '1000D Tactical Cordura Black',
  dimensionsMm: {
    width: 125,
    height: 30
  },
  dimensionsInches: '5.0" × 1.2"',
  shippingFlatRate: 49,
  freeShippingThreshold: 999,
  taxPercentage: 18 // Included in displayed prices
};

export const INITIAL_VARIANTS: ProductVariant[] = [
  {
    id: 'NAME_ONLY',
    sku: 'CSM-TAB-V1',
    name: 'Rider Name Tab',
    badgeLabel: 'ESSENTIAL CALLSIGN',
    description: 'Clean, bold embroidered rider name or highway callsign on high-density black Cordura with hook Velcro backing.',
    basePrice: 399,
    comparePrice: 599,
    features: [
      'Custom Rider Name or Club Nickname',
      'Industrial-grade Hook Velcro Backing',
      'High-tensile Rayon Embroidery Thread',
      'Matching Loop Swatch included for any jacket',
      'Standard 125mm × 30mm Touring Spec'
    ],
    includesFlag: false,
    requiresBloodGroup: false,
    maxNameLength: 14,
    available: true,
    imageThumbnail: '/patches/variant-name-only.svg'
  },
  {
    id: 'NAME_BLOOD',
    sku: 'CSM-TAB-V2',
    name: 'Name + Blood Group Tab',
    badgeLabel: 'TOURING ESSENTIAL',
    description: 'Rider name paired with your certified medical blood group in high-contrast red-bordered or white embroidery.',
    basePrice: 449,
    comparePrice: 649,
    features: [
      'Custom Rider Name + Official Blood Group',
      'Crucial roadside identification for touring rallies',
      'Precision divided embroidery layout',
      'Industrial-grade Hook Velcro Backing',
      'Matching Loop Swatch included for any jacket'
    ],
    includesFlag: false,
    requiresBloodGroup: true,
    maxNameLength: 12,
    available: true,
    imageThumbnail: '/patches/variant-name-blood.svg'
  },
  {
    id: 'TRICOLOUR_EDITION',
    sku: 'CSM-TAB-V3',
    name: 'Tricolour Edition Tab',
    badgeLabel: 'SIGNATURE PATRIOT SPEC',
    description: 'The definitive Indian touring tab: Embroidered Indian Tiranga flag, rider callsign, and emergency blood group.',
    basePrice: 499,
    comparePrice: 749,
    features: [
      'High-density Embroidered Indian Flag (Ashoka Chakra)',
      'Custom Rider Name + Blood Group identification',
      'Double-overlocked merrowed safety edge',
      'Industrial-grade Hook Velcro Backing',
      'Matching Loop Swatch included for any jacket'
    ],
    includesFlag: true,
    requiresBloodGroup: true,
    maxNameLength: 10,
    available: true,
    imageThumbnail: '/patches/variant-tricolour.svg'
  }
];
