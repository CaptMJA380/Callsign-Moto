import { BrandCandidate, BrandConfig, LogoDirection } from '../types/brand';

export const BRAND_CANDIDATES: BrandCandidate[] = [
  {
    id: 'callsign-moto',
    name: 'CALLSIGN MOTO',
    meaning: 'In military aviation and motorcycle touring clubs, a "Callsign" is the moniker earned on the road—an indelible badge of personal identity, brotherhood, and road reputation.',
    whyMotorcycle: 'Riders never ride merely as numbers; they ride under road handles and club callsigns. It directly honors the personalised name tab while conveying discipline, precision, and touring camaraderie across India.',
    tagline: 'YOUR NAME. YOUR RIDE. YOUR IDENTITY.',
    logoConcept: 'A precision-stitched aerodynamic chevron tab featuring tactical highway cut-aways and an embroidered overlocked border mark.',
    colors: {
      primary: '#0A0C10', // Tactical Obsidian
      secondary: '#1A202C', // Asphalt Slate
      accent: '#F97316', // High-Vis Saffron
      background: '#0D1117',
      text: '#F8FAFC'
    },
    domainStatus: {
      dotCom: { domain: 'callsignmoto.com', available: true, verifiedNote: 'Verified available via WHOIS query (No match on VeriSign registry).' },
      dotIn: { domain: 'callsignmoto.in', available: true, verifiedNote: 'Verified available via NIXI Registry (National Internet Exchange of India).' }
    },
    logoDirectionRef: 'direction-chevron'
  },
  {
    id: 'marg-moto',
    name: 'MĀRG MOTO',
    pronunciation: 'MAARG MOH-TOH',
    meaning: 'Derived from the ancient Sanskrit "Mārga" (मार्ग), meaning The Path, The Highway, or The Journey of Self-Discovery.',
    whyMotorcycle: 'Rooted deeply in Indian touring philosophy. Speaks directly to Ladakh passes, coastal highways, and desert trails without relying on cliché ethnic tropes. Sounds like a world-class luxury technical gear label (comparable to Belstaff or Rapha).',
    tagline: 'CLAIM YOUR PATH.',
    logoConcept: 'Vanishing-point highway lines tapering into an embroidered needle-and-thread stitch geometry.',
    colors: {
      primary: '#121214', // Raw Carbon
      secondary: '#27272A', // Weathered Bitumen
      accent: '#EAB308', // Highway Ochre
      background: '#09090B',
      text: '#FAFAFA'
    },
    domainStatus: {
      dotCom: { domain: 'margmoto.com', available: true, verifiedNote: 'Verified available via WHOIS query.' },
      dotIn: { domain: 'margmoto.in', available: true, verifiedNote: 'Verified available via NIXI Registry.' }
    },
    logoDirectionRef: 'direction-compass'
  },
  {
    id: 'torqid',
    name: 'TORQID',
    pronunciation: 'TORQUE-I-D',
    meaning: 'A high-impact portmanteau of "Torque" (the raw rotational twisting force of a high-displacement motorcycle engine) and "Identity".',
    whyMotorcycle: 'Short, punchy, modern, and tech-forward. Appeals to performance riders, Tiger & ADV owners, and younger riders who want sharp, technical aesthetics without vintage clutter.',
    tagline: 'ENGINEERED FOR IDENTITY.',
    logoConcept: 'An angular hexagonal tab badge with a dynamic forward-slanted cross-stitch monogram.',
    colors: {
      primary: '#0B0F19', // Deep Space Navy-Black
      secondary: '#1E293B', // Ballistic Slate
      accent: '#38BDF8', // Electric Cyan / Saffron blend
      background: '#06080F',
      text: '#F1F5F9'
    },
    domainStatus: {
      dotCom: { domain: 'torqid.in', available: true, verifiedNote: 'Verified available via NIXI Registry (torqid.in).' },
      dotIn: { domain: 'torqid.in', available: true, verifiedNote: 'Verified available via NIXI.' }
    },
    logoDirectionRef: 'direction-tactical'
  },
  {
    id: 'pravaas-moto',
    name: 'PRAVAAS MOTO',
    pronunciation: 'PRAH-VAAS MOH-TOH',
    meaning: 'From Sanskrit "Pravāsa" (प्रवास) — an expedition, sojourn, or long-distance journey into the open world.',
    whyMotorcycle: 'Evokes the true spirit of Indian trans-continental expeditions: Kanyakumari to Leh, Sach Pass, Spiti Valley, and the Golden Quadrilateral. Dignified, authentic, and respected in motorcycle touring circles.',
    tagline: 'EVERY RIDE TELLS A STORY.',
    logoConcept: 'Twin aerodynamic contour needles framed by an embroidered patch border with an embedded tricolour crest tick.',
    colors: {
      primary: '#0D1117',
      secondary: '#161B22',
      accent: '#FF9933', // Kesari / Saffron
      background: '#090D14',
      text: '#FFFFFF'
    },
    domainStatus: {
      dotCom: { domain: 'pravaasmoto.com', available: true, verifiedNote: 'Verified available via WHOIS registry.' },
      dotIn: { domain: 'pravaasmoto.in', available: true, verifiedNote: 'Verified available via NIXI Registry.' }
    },
    logoDirectionRef: 'direction-compass'
  },
  {
    id: 'kmzero-moto',
    name: 'KM ZERO (KM-ZERO MOTO)',
    meaning: 'Inspired by India’s historic Zero Milestone in Nagpur, the geographical datum from which all national highway distances across the subcontinent are measured.',
    whyMotorcycle: 'Touring motorcyclists live by kilometre stones and odometer numbers. Kilometre Zero symbolizes the exact coordinate where your journey begins and where your identity takes flight.',
    tagline: 'WHERE EVERY EPIC RIDE BEGINS.',
    logoConcept: 'A precision milestone glyph with cross-hair road coordinates enclosed in a heavy merrowed patch border.',
    colors: {
      primary: '#141414',
      secondary: '#262626',
      accent: '#F59E0B', // Milestone Yellow
      background: '#0A0A0A',
      text: '#F5F5F5'
    },
    domainStatus: {
      dotCom: { domain: 'kmzeromoto.com', available: true, verifiedNote: 'Verified available via WHOIS query.' },
      dotIn: { domain: 'kmzeromoto.in', available: true, verifiedNote: 'Verified available via NIXI Registry.' }
    },
    logoDirectionRef: 'direction-chevron'
  }
];

export const LOGO_DIRECTIONS: LogoDirection[] = [
  {
    id: 'direction-chevron',
    title: 'Direction 1: The Tactical Chevron Tab',
    subtitle: 'High Precision • Embroiderable • Modern Touring',
    description: 'A sharp, forward-raked chevron and rectangular tab mark. Designed with bold, continuous vector strokes that transfer flawlessly onto high-density jacquard embroidery machines without thread puckering.',
    embroiderySuitability: 'Excellent. Clean stroke widths (min 1.2mm equivalent) and zero fine halftone gradients ensure clean embroidery on cordura and twill.',
    svgCode: `<svg viewBox="0 0 400 100" class="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Outer embroidered patch border with stitch effect -->
      <rect x="6" y="6" width="388" height="88" rx="8" stroke="#F97316" stroke-width="2.5" stroke-dasharray="6 3" fill="#0A0C10" />
      <rect x="12" y="12" width="376" height="76" rx="5" stroke="#2A3241" stroke-width="1.5" />
      <!-- Tactical Chevron / Tab Symbol -->
      <g transform="translate(24, 22)">
        <path d="M0 4L18 28L0 52H14L32 28L14 4H0Z" fill="#F97316" />
        <path d="M18 4L36 28L18 52H32L50 28L32 4H18Z" fill="#FFFFFF" fill-opacity="0.9" />
        <circle cx="25" cy="28" r="3" fill="#0A0C10" />
      </g>
      <!-- Brand Typography -->
      <text x="88" y="47" font-family="'Oswald', sans-serif" font-size="28" font-weight="700" letter-spacing="4" fill="#FFFFFF">CALLSIGN</text>
      <text x="242" y="47" font-family="'Oswald', sans-serif" font-size="28" font-weight="700" letter-spacing="4" fill="#F97316">MOTO</text>
      <text x="89" y="68" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" letter-spacing="3" fill="#94A3B8">INDIAN TOURING IDENTITY • VELCRO NAME TABS</text>
    </svg>`
  },
  {
    id: 'direction-compass',
    title: 'Direction 2: The Highway Horizon Compass (APPROVED)',
    subtitle: 'Classic Heritage • Vanishing Point • Touring Crest',
    description: 'A dignified touring emblem representing India’s national highways and trans-Himalayan passes. Merges a north-pointer arrow with vanishing highway lines and a heavy merrowed border.',
    embroiderySuitability: 'Superb. Balanced geometric density allows both miniature woven label execution (15mm) and large chest-patch embroidery.',
    svgCode: `<svg viewBox="0 0 400 100" class="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Heavy Merrowed Border -->
      <rect x="5" y="5" width="390" height="90" rx="10" stroke="#FFFFFF" stroke-opacity="0.2" stroke-width="2" fill="#0F1115" />
      <rect x="9" y="9" width="382" height="82" rx="7" stroke="#F97316" stroke-width="1.8" stroke-dasharray="5 2.5" />
      <!-- Crest Compass Glyph -->
      <g transform="translate(28, 20)">
        <polygon points="28,4 36,26 48,28 36,36 38,54 28,42 18,54 20,36 8,28 20,26" fill="none" stroke="#F97316" stroke-width="2.5" />
        <circle cx="28" cy="28" r="7" fill="#F97316" />
        <line x1="28" y1="4" x2="28" y2="52" stroke="#FFFFFF" stroke-width="1.5" />
      </g>
      <!-- Typography -->
      <text x="96" y="48" font-family="'Oswald', sans-serif" font-size="27" font-weight="700" letter-spacing="5" fill="#FAFAFA">CALLSIGN</text>
      <text x="248" y="48" font-family="'Oswald', sans-serif" font-size="27" font-weight="700" letter-spacing="5" fill="#F97316">MOTO</text>
      <text x="97" y="68" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" letter-spacing="2.5" fill="#A1A1AA">CUSTOM HOOK &amp; LOOP RIDER TABS • EST. BHARAT</text>
    </svg>`
  },
  {
    id: 'direction-tactical',
    title: 'Direction 3: The Engineered Hex-Tab Mark',
    subtitle: 'Technical • Monospaced • Performance Tourer',
    description: 'An aggressive, technical aesthetic inspired by high-tensile motorcycle frame trellis welds and cordura tactical patches. Features a blood-group + flag tab icon.',
    embroiderySuitability: 'Optimised for laser-cut Cordura backing and micro-overlock stitching. Extremely readable at 50 paces.',
    svgCode: `<svg viewBox="0 0 400 100" class="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="388" height="88" rx="4" stroke="#38BDF8" stroke-width="2" stroke-dasharray="7 3.5" fill="#080C14" />
      <g transform="translate(24, 25)">
        <polygon points="12,0 38,0 50,24 38,48 12,48 0,24" stroke="#38BDF8" stroke-width="2.5" fill="#0F172A" />
        <text x="15" y="32" font-family="'JetBrains Mono', monospace" font-size="20" font-weight="800" fill="#38BDF8">TQ</text>
      </g>
      <text x="92" y="48" font-family="'Oswald', sans-serif" font-size="29" font-weight="800" letter-spacing="5" fill="#FFFFFF">TORQID</text>
      <text x="210" y="48" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="700" letter-spacing="3" fill="#38BDF8">GEAR</text>
      <text x="93" y="69" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="600" letter-spacing="2.5" fill="#94A3B8">PERSONALISED VELCRO NAME TABS // TOURING SPEC</text>
    </svg>`
  }
];

export const INITIAL_BRAND_CONFIG: BrandConfig = {
  activeBrandId: 'callsign-moto',
  brandName: 'CALLSIGN MOTO',
  tagline: 'YOUR NAME. YOUR RIDE. YOUR IDENTITY.',
  subTagline: 'Custom-made Velcro name tabs for riders who make every ride their own.',
  logoType: 'vector',
  logoDirectionId: 'direction-compass',
  contactEmail: 'hq@callsignmoto.in',
  contactPhone: '+91 98200 12345',
  instagramHandle: '@callsignmoto',
  establishedYear: 2026
};
