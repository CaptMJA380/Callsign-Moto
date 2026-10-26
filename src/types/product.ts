export type VariantType = 'NAME_ONLY' | 'NAME_BLOOD' | 'TRICOLOUR_EDITION';

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export interface ProductVariant {
  id: VariantType;
  sku: string;
  name: string;
  badgeLabel: string;
  description: string;
  basePrice: number; // in INR
  comparePrice?: number; // MRP in INR
  features: string[];
  includesFlag: boolean;
  requiresBloodGroup: boolean;
  maxNameLength: number;
  available: boolean;
  imageThumbnail: string;
}

export interface CustomisationData {
  variantId: VariantType;
  riderName: string;
  bloodGroup: BloodGroup | '';
  hasFlag: boolean;
  threadColor: string; // 'Classic White' | 'Saffron Gold' | 'High-Vis Yellow'
  fabricBase: string; // '1000D Tactical Black'
  edgeType: string; // 'Overlocked Merrowed Border'
}

export interface ProductConfig {
  minNameLength: number;
  maxNameLength: number;
  supportedBloodGroups: BloodGroup[];
  defaultThreadColor: string;
  defaultFabricBase: string;
  dimensionsMm: {
    width: number;
    height: number;
  };
  dimensionsInches: string;
  shippingFlatRate: number;
  freeShippingThreshold: number;
  taxPercentage: number;
}
