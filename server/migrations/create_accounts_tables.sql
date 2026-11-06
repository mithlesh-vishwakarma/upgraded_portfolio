-- Migration: Create accounting tables (clients, invoices, invoice items, expenses, settings)
--
-- This powers the admin-only Accounting module. Every read/write goes through the
-- authenticated Express API (server/src/accounts), which uses the Supabase service
-- role key. RLS is enabled on every table and NO public/anon policy is created,
-- so financial data can never be read straight from the browser with the anon key.
--
-- Execute in the Supabase SQL Editor, or run `pnpm migrate` from server/.

-- ---------------------------------------------------------------------------
-- Shared updated_at trigger helper
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION acc_set_updated_at() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ---------------------------------------------------------------------------
-- Clients
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS acc_clients (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT NOT NULL,
    email       TEXT,
    phone       TEXT,
    company     TEXT,
    address     TEXT,
    tax_id      TEXT,
    notes       TEXT,
    is_active   BOOLEAN NOT NULL DEFAULT true,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_acc_clients_name ON acc_clients (name);

DROP TRIGGER IF EXISTS trg_acc_clients_updated_at ON acc_clients;
CREATE TRIGGER trg_acc_clients_updated_at
    BEFORE UPDATE ON acc_clients
    FOR EACH ROW EXECUTE FUNCTION acc_set_updated_at();

-- ---------------------------------------------------------------------------
-- Invoices
--
-- An invoice IS a billing: every invoice line contributes to revenue, so the
-- profit & loss report never double counts. `status` drives the lifecycle:
--   draft   -> not counted as revenue (work in progress / not sent yet)
--   sent    -> issued, payment pending
--   partial -> some amount received
--   paid    -> settled in full
--   overdue -> sent/partial and the due date has passed
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS acc_invoices (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_number  TEXT NOT NULL,
    client_id       UUID REFERENCES acc_clients(id) ON DELETE SET NULL,
    issue_date      DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date        DATE,
    status          TEXT NOT NULL DEFAULT 'draft',
    currency        TEXT NOT NULL DEFAULT 'INR',
    subtotal        NUMERIC(14,2) NOT NULL DEFAULT 0,
    discount        NUMERIC(14,2) NOT NULL DEFAULT 0,
    tax_rate        NUMERIC(6,3) NOT NULL DEFAULT 0,
    tax_amount      NUMERIC(14,2) NOT NULL DEFAULT 0,
    total           NUMERIC(14,2) NOT NULL DEFAULT 0,
    amount_paid     NUMERIC(14,2) NOT NULL DEFAULT 0,
    notes           TEXT,
    terms           TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_acc_invoices_number ON acc_invoices (invoice_number);
CREATE INDEX IF NOT EXISTS idx_acc_invoices_issue_date ON acc_invoices (issue_date);
CREATE INDEX IF NOT EXISTS idx_acc_invoices_client_id ON acc_invoices (client_id);
CREATE INDEX IF NOT EXISTS idx_acc_invoices_status ON acc_invoices (status);

DROP TRIGGER IF EXISTS trg_acc_invoices_updated_at ON acc_invoices;
CREATE TRIGGER trg_acc_invoices_updated_at
    BEFORE UPDATE ON acc_invoices
    FOR EACH ROW EXECUTE FUNCTION acc_set_updated_at();

-- ---------------------------------------------------------------------------
-- Invoice line items
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS acc_invoice_items (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id  UUID NOT NULL REFERENCES acc_invoices(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    quantity    NUMERIC(12,3) NOT NULL DEFAULT 1,
    rate        NUMERIC(14,2) NOT NULL DEFAULT 0,
    amount      NUMERIC(14,2) NOT NULL DEFAULT 0,
    sort_order  INTEGER NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_acc_invoice_items_invoice_id ON acc_invoice_items (invoice_id);

-- ---------------------------------------------------------------------------
-- Expenses
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS acc_expenses (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    expense_date    DATE NOT NULL DEFAULT CURRENT_DATE,
    category        TEXT NOT NULL DEFAULT 'Other',
    vendor          TEXT,
    description     TEXT,
    amount          NUMERIC(14,2) NOT NULL DEFAULT 0,
    tax_amount      NUMERIC(14,2) NOT NULL DEFAULT 0,
    total           NUMERIC(14,2) NOT NULL DEFAULT 0,
    payment_method  TEXT,
    client_id       UUID REFERENCES acc_clients(id) ON DELETE SET NULL,
    reference       TEXT,
    notes           TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_acc_expenses_expense_date ON acc_expenses (expense_date);
CREATE INDEX IF NOT EXISTS idx_acc_expenses_category ON acc_expenses (category);
CREATE INDEX IF NOT EXISTS idx_acc_expenses_client_id ON acc_expenses (client_id);

DROP TRIGGER IF EXISTS trg_acc_expenses_updated_at ON acc_expenses;
CREATE TRIGGER trg_acc_expenses_updated_at
    BEFORE UPDATE ON acc_expenses
    FOR EACH ROW EXECUTE FUNCTION acc_set_updated_at();

-- ---------------------------------------------------------------------------
-- Business settings (single row, fixed id)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS acc_settings (
    id                   UUID PRIMARY KEY DEFAULT '00000000-0000-0000-0000-000000000001',
    business_name        TEXT,
    business_email       TEXT,
    business_phone       TEXT,
    business_address     TEXT,
    tax_id               TEXT,
    currency             TEXT NOT NULL DEFAULT 'INR',
    default_tax_rate     NUMERIC(6,3) NOT NULL DEFAULT 0,
    invoice_prefix       TEXT NOT NULL DEFAULT 'INV',
    next_invoice_number  INTEGER NOT NULL DEFAULT 1,
    financial_year       TEXT DEFAULT '26-27',
    payment_terms        TEXT,
    bank_details         TEXT,
    logo_url             TEXT,
    signature_url        TEXT,
    signatory_name       TEXT DEFAULT 'Mithlesh Vishwakarma (OC)',
    signatory_title      TEXT DEFAULT 'Authorised Signature',
    created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE acc_settings ADD COLUMN IF NOT EXISTS financial_year TEXT DEFAULT '26-27';
ALTER TABLE acc_settings ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE acc_settings ADD COLUMN IF NOT EXISTS signature_url TEXT;
ALTER TABLE acc_settings ADD COLUMN IF NOT EXISTS signatory_name TEXT DEFAULT 'Mithlesh Vishwakarma (OC)';
ALTER TABLE acc_settings ADD COLUMN IF NOT EXISTS signatory_title TEXT DEFAULT 'Authorised Signature';

DROP TRIGGER IF EXISTS trg_acc_settings_updated_at ON acc_settings;
CREATE TRIGGER trg_acc_settings_updated_at
    BEFORE UPDATE ON acc_settings
    FOR EACH ROW EXECUTE FUNCTION acc_set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security: enabled everywhere, no public/anon access.
-- The service role key used by the Express API bypasses RLS; the browser-side
-- anon key is denied, keeping this module admin-only.
-- ---------------------------------------------------------------------------
ALTER TABLE acc_clients      ENABLE ROW LEVEL SECURITY;
ALTER TABLE acc_invoices     ENABLE ROW LEVEL SECURITY;
ALTER TABLE acc_invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE acc_expenses     ENABLE ROW LEVEL SECURITY;
ALTER TABLE acc_settings     ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "acc_clients_admin_access" ON acc_clients;
CREATE POLICY "acc_clients_admin_access" ON acc_clients
    FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "acc_invoices_admin_access" ON acc_invoices;
CREATE POLICY "acc_invoices_admin_access" ON acc_invoices
    FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "acc_invoice_items_admin_access" ON acc_invoice_items;
CREATE POLICY "acc_invoice_items_admin_access" ON acc_invoice_items
    FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "acc_expenses_admin_access" ON acc_expenses;
CREATE POLICY "acc_expenses_admin_access" ON acc_expenses
    FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "acc_settings_admin_access" ON acc_settings;
CREATE POLICY "acc_settings_admin_access" ON acc_settings
    FOR ALL TO service_role USING (true) WITH CHECK (true);

INSERT INTO acc_settings (
    id,
    business_name,
    business_email,
    business_phone,
    business_address,
    currency,
    invoice_prefix,
    next_invoice_number,
    financial_year,
    payment_terms,
    bank_details
)
VALUES (
    '00000000-0000-0000-0000-000000000001',
    'Mithlesh Vishwakarma (OC)',
    'mithlesh.workplace@gmail.com',
    '+91 9327832747',
    'Surat, Gujarat',
    'INR',
    'INV',
    1,
    '26-27',
    'Ponytail is an open-source AI coding skill and plugin created by Dietrich Gebert that forces AI agents (such as Claude Code, Codex, and Cursor) to behave like a pragmatic, minimalist "lazy senior developer"',
    'A/C HOLDER NAME: VISHWAKARMA MITHLESH SHRI VIJAY
BANK NAME: KOTAK MAHINDRA BANK
IFSC CODE: KKBK0002852
A/C NUMBER: 7512318326'
)
ON CONFLICT (id) DO UPDATE SET
    business_name = EXCLUDED.business_name,
    business_email = EXCLUDED.business_email,
    business_phone = EXCLUDED.business_phone,
    business_address = EXCLUDED.business_address,
    payment_terms = EXCLUDED.payment_terms,
    bank_details = EXCLUDED.bank_details;
