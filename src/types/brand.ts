export interface BrandCandidate {
  id: string;
  name: string;
  pronunciation?: string;
  meaning: string;
  whyMotorcycle: string;
  tagline: string;
  logoConcept: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  domainStatus: {
    dotCom: { domain: string; available: boolean; verifiedNote: string };
    dotIn: { domain: string; available: boolean; verifiedNote: string };
  };
  logoDirectionRef: string;
}

export interface LogoDirection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  embroiderySuitability: string;
  svgCode: string;
}

export interface BrandConfig {
  activeBrandId: string;
  brandName: string;
  tagline: string;
  subTagline: string;
  logoType: 'vector' | 'text';
  logoDirectionId: string;
  contactEmail: string;
  contactPhone: string;
  instagramHandle: string;
  establishedYear: number;
}
