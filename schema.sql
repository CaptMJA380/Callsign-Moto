-- ============================================================================
-- MOTORCYCLE CUSTOM VELCRO NAME TABS E-COMMERCE DATABASE SCHEMA (PostgreSQL / Supabase)
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. ADMIN USERS & ROLES
CREATE TYPE admin_role AS ENUM ('SUPER_ADMIN', 'FULFILMENT_ADMIN', 'READONLY');

CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role admin_role NOT NULL DEFAULT 'FULFILMENT_ADMIN',
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. PRODUCTS & EDITIONS
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    short_description TEXT,
    base_material VARCHAR(100) DEFAULT '1000D Tactical Cordura',
    thread_material VARCHAR(100) DEFAULT 'High-tensile Rayon Embroidery Thread',
    attachment_system VARCHAR(100) DEFAULT 'Hook & Loop (Velcro compatible)',
    width_mm INTEGER NOT NULL DEFAULT 125,
    height_mm INTEGER NOT NULL DEFAULT 30,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. PRODUCT VARIANTS
CREATE TYPE variant_code AS ENUM ('NAME_ONLY', 'NAME_BLOOD', 'TRICOLOUR_EDITION');

CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    code variant_code UNIQUE NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(150) NOT NULL,
    badge_label VARCHAR(100),
    description TEXT,
    base_price_inr NUMERIC(10, 2) NOT NULL,
    compare_price_inr NUMERIC(10, 2),
    includes_flag BOOLEAN NOT NULL DEFAULT FALSE,
    requires_blood_group BOOLEAN NOT NULL DEFAULT FALSE,
    max_name_characters INTEGER NOT NULL DEFAULT 14,
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. CUSTOMERS
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    total_orders_count INTEGER NOT NULL DEFAULT 0,
    total_spent_inr NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    last_order_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_customers_phone ON customers(phone);
CREATE INDEX idx_customers_email ON customers(email);

-- 5. CUSTOMER SHIPPING ADDRESSES
CREATE TABLE customer_addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address_line_1 VARCHAR(255) NOT NULL,
    address_line_2 VARCHAR(255) NOT NULL,
    landmark VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    delivery_instructions TEXT,
    is_default BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_customer_addresses_pincode ON customer_addresses(pincode);

-- 6. COUPONS & DISCOUNTS
CREATE TYPE discount_type AS ENUM ('PERCENTAGE', 'FLAT');

CREATE TABLE coupons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_type discount_type NOT NULL,
    discount_value NUMERIC(10, 2) NOT NULL,
    min_order_value_inr NUMERIC(10, 2) NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    expires_at TIMESTAMPTZ,
    usage_count INTEGER NOT NULL DEFAULT 0
);

-- 7. ORDERS
CREATE TYPE order_status AS ENUM ('PENDING', 'IN_PRODUCTION', 'DISPATCHED', 'DELIVERED', 'CANCELLED');
CREATE TYPE payment_status AS ENUM ('PAID', 'PENDING', 'FAILED', 'REFUNDED', 'COD_CONFIRMED');
CREATE TYPE payment_method AS ENUM ('UPI', 'CARD', 'NETBANKING', 'COD', 'TEST_MODE');

CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id UUID REFERENCES customers(id) ON DELETE RESTRICT,
    shipping_address_id UUID REFERENCES customer_addresses(id) ON DELETE RESTRICT,
    subtotal_inr NUMERIC(10, 2) NOT NULL,
    discount_inr NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    coupon_id UUID REFERENCES coupons(id),
    shipping_fee_inr NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    total_amount_inr NUMERIC(10, 2) NOT NULL,
    payment_status payment_status NOT NULL DEFAULT 'PENDING',
    payment_method payment_method NOT NULL,
    payment_transaction_id VARCHAR(100),
    fulfilment_status order_status NOT NULL DEFAULT 'PENDING',
    courier_name VARCHAR(100),
    tracking_number VARCHAR(100),
    internal_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_orders_number ON orders(order_number);
CREATE INDEX idx_orders_fulfilment_status ON orders(fulfilment_status);
CREATE INDEX idx_orders_created_at ON orders(created_at);

-- 8. ORDER ITEMS (Preserves exact customisation independently of product catalogue)
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES product_variants(id) ON DELETE SET NULL,
    variant_sku VARCHAR(50) NOT NULL,
    variant_name VARCHAR(150) NOT NULL,
    custom_rider_name VARCHAR(50) NOT NULL,
    blood_group VARCHAR(10),
    has_flag BOOLEAN NOT NULL DEFAULT FALSE,
    fabric_base VARCHAR(100) NOT NULL DEFAULT '1000D Tactical Cordura Black',
    thread_color VARCHAR(100) NOT NULL DEFAULT 'Classic White',
    edge_type VARCHAR(100) NOT NULL DEFAULT 'Overlocked Merrowed Border',
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price_inr NUMERIC(10, 2) NOT NULL,
    total_price_inr NUMERIC(10, 2) NOT NULL,
    customisation_snapshot JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. AUDIT LOGS
CREATE TABLE order_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    actor VARCHAR(100) NOT NULL,
    action VARCHAR(255) NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX idx_audit_order_id ON order_audit_logs(order_id);

-- Row-level security policies (RLS)
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_audit_logs ENABLE ROW LEVEL SECURITY;
