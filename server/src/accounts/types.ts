/**
 * Shared types for the admin-only Accounting module.
 *
 * The module is intentionally self-contained: every table it touches is prefixed
 * with `acc_` and every route lives under /accounts, so nothing here can leak
 * into the public site.
 */

export type InvoiceStatus = "draft" | "sent" | "partial" | "paid" | "overdue";

export const INVOICE_STATUSES: InvoiceStatus[] = [
  "draft",
  "sent",
  "partial",
  "paid",
  "overdue",
];

export interface AccountClient {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  address: string | null;
  tax_id: string | null;
  notes: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface AccountClientInput {
  name: string;
  email?: string | null;
  phone?: string | null;
  company?: string | null;
  address?: string | null;
  tax_id?: string | null;
  notes?: string | null;
  is_active?: boolean;
}

export interface AccountInvoiceItem {
  id: string;
  invoice_id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  sort_order: number;
}

export interface AccountInvoice {
  id: string;
  invoice_number: string;
  client_id: string | null;
  issue_date: string;
  due_date: string | null;
  status: InvoiceStatus;
  currency: string;
  subtotal: number;
  discount: number;
  tax_rate: number;
  tax_amount: number;
  total: number;
  amount_paid: number;
  notes: string | null;
  terms: string | null;
  created_at: string;
  updated_at: string;
}

export interface AccountInvoiceWithClient extends AccountInvoice {
  client_name: string | null;
  client_email: string | null;
  item_count: number;
}

export interface InvoiceItemInput {
  description: string;
  quantity: number;
  rate: number;
}

export interface AccountInvoiceInput {
  invoice_number?: string;
  client_id?: string | null;
  issue_date: string;
  due_date?: string | null;
  status?: InvoiceStatus;
  currency?: string;
  discount?: number;
  tax_rate?: number;
  amount_paid?: number;
  notes?: string | null;
  terms?: string | null;
  items: InvoiceItemInput[];
}

export interface AccountExpense {
  id: string;
  expense_date: string;
  category: string;
  vendor: string | null;
  description: string | null;
  amount: number;
  tax_amount: number;
  total: number;
  payment_method: string | null;
  client_id: string | null;
  reference: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface AccountExpenseWithClient extends AccountExpense {
  client_name: string | null;
}

export interface AccountExpenseInput {
  expense_date: string;
  category: string;
  vendor?: string | null;
  description?: string | null;
  amount: number;
  tax_amount?: number;
  payment_method?: string | null;
  client_id?: string | null;
  reference?: string | null;
  notes?: string | null;
}

export interface AccountSettings {
  id: string;
  business_name: string | null;
  business_email: string | null;
  business_phone: string | null;
  business_address: string | null;
  tax_id: string | null;
  currency: string;
  default_tax_rate: number;
  invoice_prefix: string;
  next_invoice_number: number;
  financial_year?: string | null;
  payment_terms: string | null;
  bank_details: string | null;
  logo_url: string | null;
  signature_url?: string | null;
  signatory_name?: string | null;
  signatory_title?: string | null;
  created_at: string;
  updated_at: string;
}

export interface AccountSettingsInput {
  business_name?: string | null;
  business_email?: string | null;
  business_phone?: string | null;
  business_address?: string | null;
  tax_id?: string | null;
  currency?: string;
  default_tax_rate?: number;
  invoice_prefix?: string;
  next_invoice_number?: number;
  financial_year?: string | null;
  payment_terms?: string | null;
  bank_details?: string | null;
  logo_url?: string | null;
  signature_url?: string | null;
  signatory_name?: string | null;
  signatory_title?: string | null;
}

export interface DateRangeQuery {
  from?: string;
  to?: string;
}

export interface CategoryBreakdown {
  category: string;
  amount: number;
  count: number;
}

export interface MonthlyBreakdown {
  month: string;
  revenue: number;
  expenses: number;
  net: number;
}

export interface ClientBreakdown {
  client_id: string | null;
  client_name: string;
  revenue: number;
  invoiced: number;
  received: number;
}

export interface AccountsSummary {
  range: { from: string | null; to: string | null };
  currency: string;
  revenue: number;
  tax_collected: number;
  invoiced_total: number;
  received: number;
  outstanding: number;
  expenses: number;
  expense_tax: number;
  net_profit: number;
  tax_payable: number;
  cash_position: number;
  invoice_count: number;
  expense_count: number;
  overdue_count: number;
  expense_by_category: CategoryBreakdown[];
  monthly: MonthlyBreakdown[];
  by_client: ClientBreakdown[];
}
