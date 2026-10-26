# CALLSIGN MOTO — Customised Velcro Name Tabs for Motorcycle Riders

An e-commerce website, interactive live product visualizer, checkout system, and administrative command portal designed for Indian motorcycle touring riders.

---

## 1. Quick Start & Local Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server (running on port 5173)
npm run dev

# 3. Production build
npm run build
```

Application local URL: `http://localhost:5173/`

---

## 2. Brand Identity & Discovery Studio

As specified in the design brief, **brand identity approval must happen before the brand name and logo are finalized**.

The application is scaffolded using a configurable identity architecture (`src/config/brandConfig.ts`).
You can inspect the 5 brand candidates, domain checks, and 3 vector logo directions directly on the website by clicking **"Brand Approval"** in the top navigation bar or reviewing Section 1 in the delivery summary.

When you approve a candidate, simply select it in the modal or update `activeBrandId` in `src/config/brandConfig.ts`. It immediately updates the entire website consistently.

### The 5 Candidates (Domains verified via WHOIS / NIXI):
1. **CALLSIGN MOTO** (`callsignmoto.com`, `callsignmoto.in` both available)
2. **MĀRG MOTO** (`margmoto.com`, `margmoto.in` both available)
3. **TORQID** (`torqid.in` available)
4. **PRAVAAS MOTO** (`pravaasmoto.com`, `pravaasmoto.in` both available)
5. **KM ZERO MOTO** (`kmzeromoto.com`, `kmzeromoto.in` both available)

---

## 3. Product Features & Interactive Visualizer

- **Live Patch Customiser**:
  - **Variant A**: Name Tab (rider's name or highway callsign)
  - **Variant B**: Name + Blood Group (roadside emergency medical ID)
  - **Variant C**: Tricolour Edition (embroidered Indian flag with 24-spoke Ashoka Chakra, rider name & blood group)
- **High-Density Vector Embroidery Simulation**:
  - Photorealistic cordura textile weave filter
  - Thread emboss and specular sheen lighting
  - Heavy merrowed overcast borders
  - Interactive "Inspect Velcro Back" toggle demonstrating molded hook backing
  - Responsive character scaling ensuring zero text overflow or distortion.
- **"Built for Your Ride. Personalised for You."**:
  - Accurate Triumph Tiger adventure motorcycle context
  - Jacket chest receiving loop panel placement
  - Sleeve mounting diagram
  - Hook-and-loop mechanics breakdown.

---

## 4. Admin Dashboard (`/admin`)

Access via the **"Admin"** button in the header or portal.

### Security Features:
- **No universal hardcoded password**: On first visit, a secure setup wizard guides the primary admin to initialize root credentials.
- **Server/session role checking**: Super Admin, Fulfilment Admin, and Read-Only roles.
- **CWE-1236 Formula Injection Protection**: Excel exports safely escape formula triggers (`=`, `+`, `-`, `@`).

### Modules:
1. **Overview**: Real KPI cards (Gross Revenue, Net Orders, Units Sold, Average Order Value, Status Distribution, Sales Trends by Day/Week/Month).
2. **Order Management**: Real-time search, status filtering, order details modal, tracking number entry, internal notes, audit trail.
3. **Product & Pricing**: Live price updates, character limits, blood group toggles, shipping threshold.
4. **Sales & Business Analytics**: Variant volume breakdowns, pipeline analytics.
5. **Customer Directory**: Order histories, lifetime spending, contact information.
6. **Excel Export**: Functioning `.xlsx` export of all or filtered orders.

---

## 5. Database Schema & Migration

A production-grade PostgreSQL schema is located in [`schema.sql`](./schema.sql).

To deploy on **Supabase**:
1. Create a new Supabase project at `https://supabase.com`.
2. Go to **SQL Editor** in the Supabase Dashboard.
3. Paste the contents of [`schema.sql`](./schema.sql) and execute.
4. Configure Row-Level Security (RLS) policies as specified.

---

## 6. Environment Variables (`.env.example`)

Create a `.env` file in the root directory:

```env
# Application Port
VITE_PORT=5173

# Payment Gateway (Razorpay / Cashfree / Stripe)
VITE_PAYMENT_GATEWAY_MODE=test # 'test' or 'live'
VITE_RAZORPAY_KEY_ID=rzp_test_your_key_here
RAZORPAY_KEY_SECRET=your_secret_here

# Geocoding Service (OpenStreetMap Nominatim default, or Google Maps)
VITE_GEOCODING_PROVIDER=nominatim # 'nominatim' or 'google'
VITE_GOOGLE_MAPS_API_KEY=

# Supabase Database Backend (Optional for cloud sync)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-do-not-expose-in-frontend
```

---

## 7. How to Replace Photos & Confirm Prices

1. **Product & Lifestyle Artwork**: Replace SVG diagrams in `src/components/lifestyle/BuiltForYourRide.tsx` or link high-resolution studio photographs into `public/assets/` and update references in `src/config/productsConfig.ts`.
2. **Confirming Selling Prices**: Open the Admin Dashboard -> **Products & Pricing** tab -> click "Edit Price" on any variant and save. Alternatively, adjust `INITIAL_VARIANTS` in `src/config/productsConfig.ts`.
