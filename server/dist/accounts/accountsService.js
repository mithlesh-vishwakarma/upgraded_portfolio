"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSummary = exports.deleteExpense = exports.updateExpense = exports.createExpense = exports.listExpenses = exports.updateInvoiceStatus = exports.deleteInvoice = exports.updateInvoice = exports.createInvoice = exports.peekNextInvoiceNumber = exports.getNextSequenceForFY = exports.buildInvoiceNumber = exports.getFinancialYear = exports.getInvoice = exports.listInvoices = exports.deleteClient = exports.updateClient = exports.createClient = exports.listClients = exports.updateSettings = exports.getSettings = exports.deriveInvoiceStatus = exports.computeInvoiceTotals = exports.todayISODate = exports.round3 = exports.round2 = exports.toNumber = void 0;
const supabase_1 = require("../config/supabase");
const SETTINGS_ID = "00000000-0000-0000-0000-000000000001";
/* -------------------------------------------------------------------------- */
/* Numeric helpers                                                            */
/* -------------------------------------------------------------------------- */
/** Postgres NUMERIC can arrive as a string over PostgREST. Coerce defensively. */
const toNumber = (value) => {
    const parsed = typeof value === "number" ? value : parseFloat(String(value ?? ""));
    return Number.isFinite(parsed) ? parsed : 0;
};
exports.toNumber = toNumber;
/** Round to 2 decimals, avoiding classic float drift (1.005 -> 1.01). */
const round2 = (value) => Math.round((value + Number.EPSILON) * 100) / 100;
exports.round2 = round2;
const round3 = (value) => Math.round((value + Number.EPSILON) * 1000) / 1000;
exports.round3 = round3;
const todayISODate = () => new Date().toISOString().slice(0, 10);
exports.todayISODate = todayISODate;
/**
 * subtotal  = sum(qty * rate)
 * discount  = clamped so it can never exceed the subtotal
 * taxAmount = (subtotal - discount) * taxRate / 100
 * total     = (subtotal - discount) + taxAmount
 */
const computeInvoiceTotals = (items, discountInput, taxRateInput) => {
    const subtotal = (0, exports.round2)(items.reduce((sum, item) => {
        const qty = (0, exports.toNumber)(item.quantity);
        const rate = (0, exports.toNumber)(item.rate);
        return sum + (0, exports.round2)(qty * rate);
    }, 0));
    const discount = Math.min(Math.max((0, exports.round2)((0, exports.toNumber)(discountInput)), 0), subtotal);
    const taxableBase = (0, exports.round2)(subtotal - discount);
    const taxRate = Math.max((0, exports.toNumber)(taxRateInput), 0);
    const taxAmount = (0, exports.round2)((taxableBase * taxRate) / 100);
    const total = (0, exports.round2)(taxableBase + taxAmount);
    return { subtotal, discount, taxRate, taxAmount, total };
};
exports.computeInvoiceTotals = computeInvoiceTotals;
/**
 * Derive the lifecycle status from the money on the invoice.
 * Drafts are never revenue. Everything else is billed work.
 */
const deriveInvoiceStatus = (total, amountPaid, dueDate, today) => {
    if (total > 0 && amountPaid >= total)
        return "paid";
    if (amountPaid > 0)
        return "partial";
    if (dueDate && dueDate < today)
        return "overdue";
    return "sent";
};
exports.deriveInvoiceStatus = deriveInvoiceStatus;
/* -------------------------------------------------------------------------- */
/* Settings                                                                   */
/* -------------------------------------------------------------------------- */
const DEFAULT_SETTINGS = {
    business_name: "Mithlesh Vishwakarma (OC)",
    business_email: "mithlesh.workplace@gmail.com",
    business_phone: "+91 9327832747",
    business_address: "Surat, Gujarat",
    tax_id: "",
    currency: "INR",
    default_tax_rate: 0,
    invoice_prefix: "INV",
    next_invoice_number: 1,
    financial_year: "26-27",
    payment_terms: "Ponytail is an open-source AI coding skill and plugin created by Dietrich Gebert that forces AI agents (such as Claude Code, Codex, and Cursor) to behave like a pragmatic, minimalist \"lazy senior developer\"",
    bank_details: "A/C HOLDER NAME: VISHWAKARMA MITHLESH SHRI VIJAY\nBANK NAME: KOTAK MAHINDRA BANK\nIFSC CODE: KKBK0002852\nA/C NUMBER: 7512318326",
    logo_url: "",
    signature_url: "",
    signatory_name: "Mithlesh Vishwakarma (OC)",
    signatory_title: "Authorised Signature",
};
const getSettings = async () => {
    const { data, error } = await supabase_1.supabase
        .from("acc_settings")
        .select("*")
        .eq("id", SETTINGS_ID)
        .maybeSingle();
    if (error)
        throw error;
    if (data)
        return data;
    // Bootstrap the singleton row if the migration has not seeded it yet.
    const { data: created, error: createError } = await supabase_1.supabase
        .from("acc_settings")
        .upsert({ id: SETTINGS_ID, ...DEFAULT_SETTINGS }, { onConflict: "id" })
        .select()
        .single();
    if (createError)
        throw createError;
    return created;
};
exports.getSettings = getSettings;
const updateSettings = async (payload) => {
    const clean = {};
    if (payload.business_name !== undefined)
        clean.business_name = payload.business_name;
    if (payload.business_email !== undefined)
        clean.business_email = payload.business_email;
    if (payload.business_phone !== undefined)
        clean.business_phone = payload.business_phone;
    if (payload.business_address !== undefined)
        clean.business_address = payload.business_address;
    if (payload.tax_id !== undefined)
        clean.tax_id = payload.tax_id;
    if (payload.currency !== undefined)
        clean.currency = payload.currency;
    if (payload.default_tax_rate !== undefined)
        clean.default_tax_rate = Math.max((0, exports.toNumber)(payload.default_tax_rate), 0);
    if (payload.invoice_prefix !== undefined)
        clean.invoice_prefix = String(payload.invoice_prefix || "INV").trim() || "INV";
    if (payload.next_invoice_number !== undefined)
        clean.next_invoice_number = Math.max(1, Math.floor((0, exports.toNumber)(payload.next_invoice_number)));
    if (payload.financial_year !== undefined)
        clean.financial_year = payload.financial_year ? String(payload.financial_year).trim() : null;
    if (payload.payment_terms !== undefined)
        clean.payment_terms = payload.payment_terms;
    if (payload.bank_details !== undefined)
        clean.bank_details = payload.bank_details;
    if (payload.logo_url !== undefined)
        clean.logo_url = payload.logo_url;
    if (payload.signature_url !== undefined)
        clean.signature_url = payload.signature_url;
    if (payload.signatory_name !== undefined)
        clean.signatory_name = payload.signatory_name;
    if (payload.signatory_title !== undefined)
        clean.signatory_title = payload.signatory_title;
    const { data, error } = await supabase_1.supabase
        .from("acc_settings")
        .upsert({ id: SETTINGS_ID, ...clean }, { onConflict: "id" })
        .select()
        .single();
    if (error)
        throw error;
    return data;
};
exports.updateSettings = updateSettings;
/* -------------------------------------------------------------------------- */
/* Clients                                                                    */
/* -------------------------------------------------------------------------- */
const listClients = async () => {
    const { data, error } = await supabase_1.supabase
        .from("acc_clients")
        .select("*")
        .order("name", { ascending: true });
    if (error)
        throw error;
    return (data || []);
};
exports.listClients = listClients;
const createClient = async (payload) => {
    const { data, error } = await supabase_1.supabase
        .from("acc_clients")
        .insert({
        name: payload.name.trim(),
        email: payload.email?.trim() || null,
        phone: payload.phone?.trim() || null,
        company: payload.company?.trim() || null,
        address: payload.address?.trim() || null,
        tax_id: payload.tax_id?.trim() || null,
        notes: payload.notes?.trim() || null,
        is_active: payload.is_active !== false,
    })
        .select()
        .single();
    if (error)
        throw error;
    return data;
};
exports.createClient = createClient;
const updateClient = async (id, payload) => {
    const { data, error } = await supabase_1.supabase
        .from("acc_clients")
        .update({
        name: payload.name.trim(),
        email: payload.email?.trim() || null,
        phone: payload.phone?.trim() || null,
        company: payload.company?.trim() || null,
        address: payload.address?.trim() || null,
        tax_id: payload.tax_id?.trim() || null,
        notes: payload.notes?.trim() || null,
        is_active: payload.is_active !== false,
    })
        .eq("id", id)
        .select()
        .single();
    if (error)
        throw error;
    return data;
};
exports.updateClient = updateClient;
const deleteClient = async (id) => {
    const { error } = await supabase_1.supabase.from("acc_clients").delete().eq("id", id);
    if (error)
        throw error;
};
exports.deleteClient = deleteClient;
/* -------------------------------------------------------------------------- */
/* Invoices                                                                   */
/* -------------------------------------------------------------------------- */
const mapInvoiceRow = (row) => ({
    id: String(row.id),
    invoice_number: String(row.invoice_number),
    client_id: row.client_id ? String(row.client_id) : null,
    issue_date: String(row.issue_date),
    due_date: row.due_date ? String(row.due_date) : null,
    status: row.status || "draft",
    currency: String(row.currency || "INR"),
    subtotal: (0, exports.toNumber)(row.subtotal),
    discount: (0, exports.toNumber)(row.discount),
    tax_rate: (0, exports.toNumber)(row.tax_rate),
    tax_amount: (0, exports.toNumber)(row.tax_amount),
    total: (0, exports.toNumber)(row.total),
    amount_paid: (0, exports.toNumber)(row.amount_paid),
    notes: row.notes ? String(row.notes) : null,
    terms: row.terms ? String(row.terms) : null,
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
});
const listInvoices = async (filters) => {
    let query = supabase_1.supabase.from("acc_invoices").select("*");
    if (filters.from)
        query = query.gte("issue_date", filters.from);
    if (filters.to)
        query = query.lte("issue_date", filters.to);
    if (filters.status && filters.status !== "all")
        query = query.eq("status", filters.status);
    if (filters.client_id)
        query = query.eq("client_id", filters.client_id);
    const { data, error } = await query.order("issue_date", { ascending: false });
    if (error)
        throw error;
    const rows = (data || []);
    const invoices = rows.map(mapInvoiceRow);
    const [clients, itemsRes] = await Promise.all([
        (0, exports.listClients)(),
        supabase_1.supabase.from("acc_invoice_items").select("invoice_id"),
    ]);
    if (itemsRes.error)
        throw itemsRes.error;
    const itemCounts = new Map();
    for (const item of (itemsRes.data || [])) {
        const key = String(item.invoice_id);
        itemCounts.set(key, (itemCounts.get(key) || 0) + 1);
    }
    const clientMap = new Map(clients.map((client) => [client.id, client]));
    return invoices.map((invoice) => {
        const client = invoice.client_id ? clientMap.get(invoice.client_id) : undefined;
        return {
            ...invoice,
            client_name: client?.name ?? null,
            client_email: client?.email ?? null,
            item_count: itemCounts.get(invoice.id) || 0,
        };
    });
};
exports.listInvoices = listInvoices;
const getInvoice = async (id) => {
    const { data, error } = await supabase_1.supabase
        .from("acc_invoices")
        .select("*")
        .eq("id", id)
        .maybeSingle();
    if (error)
        throw error;
    if (!data) {
        const notFound = new Error("Invoice not found");
        notFound.name = "NotFoundError";
        throw notFound;
    }
    const invoice = mapInvoiceRow(data);
    const { data: itemRows, error: itemError } = await supabase_1.supabase
        .from("acc_invoice_items")
        .select("*")
        .eq("invoice_id", id)
        .order("sort_order", { ascending: true });
    if (itemError)
        throw itemError;
    const items = (itemRows || []).map((row) => ({
        id: String(row.id),
        invoice_id: String(row.invoice_id),
        description: String(row.description),
        quantity: (0, exports.toNumber)(row.quantity),
        rate: (0, exports.toNumber)(row.rate),
        amount: (0, exports.toNumber)(row.amount),
        sort_order: (0, exports.toNumber)(row.sort_order),
    }));
    let client = null;
    if (invoice.client_id) {
        const { data: clientRow, error: clientError } = await supabase_1.supabase
            .from("acc_clients")
            .select("*")
            .eq("id", invoice.client_id)
            .maybeSingle();
        if (clientError)
            throw clientError;
        client = clientRow ?? null;
    }
    return { invoice, items, client };
};
exports.getInvoice = getInvoice;
/**
 * Indian/Accounting Financial Year helper:
 * Fiscal year runs from April 1 to March 31.
 * - April 1, 2026 to March 31, 2027 => FY "26-27"
 * - April 1, 2027 to March 31, 2028 => FY "27-28" (resets counter to 0001)
 */
const getFinancialYear = (dateStr) => {
    const d = dateStr ? new Date(`${dateStr.slice(0, 10)}T00:00:00`) : new Date();
    const valid = isNaN(d.getTime()) ? new Date() : d;
    const year = valid.getFullYear();
    const month = valid.getMonth() + 1; // 1 = Jan, 4 = Apr, 12 = Dec
    const startYear = month >= 4 ? year : year - 1;
    const endYear = startYear + 1;
    const startShort = String(startYear).slice(-2);
    const endShort = String(endYear).slice(-2);
    return `${startShort}-${endShort}`;
};
exports.getFinancialYear = getFinancialYear;
/**
 * Format 2: PREFIX-YY-YY-XXXX (e.g. INV-26-27-0001)
 */
const buildInvoiceNumber = (prefix, financialYear, sequence) => {
    const cleanPrefix = (prefix || "INV").trim() || "INV";
    const paddedSeq = String(Math.max(1, Math.floor(sequence))).padStart(4, "0");
    return `${cleanPrefix}-${financialYear}-${paddedSeq}`;
};
exports.buildInvoiceNumber = buildInvoiceNumber;
/**
 * Find the next sequence for this prefix & financial year.
 * Automatically restarts at 1 on April 1st (after March 31 year-end closing)
 * while ensuring no duplicates exist in the database.
 */
const getNextSequenceForFY = async (prefix, financialYear, settings) => {
    const cleanPrefix = (prefix || "INV").trim() || "INV";
    const pattern = `${cleanPrefix}-${financialYear}-%`;
    const { data, error } = await supabase_1.supabase
        .from("acc_invoices")
        .select("invoice_number")
        .ilike("invoice_number", pattern);
    let maxDbSeq = 0;
    if (!error && data && data.length > 0) {
        for (const row of data) {
            const numStr = String(row.invoice_number || "");
            const parts = numStr.split("-");
            const lastPart = parts[parts.length - 1];
            const parsed = parseInt(lastPart, 10);
            if (!isNaN(parsed) && parsed > maxDbSeq) {
                maxDbSeq = parsed;
            }
        }
    }
    const settingsFY = settings.financial_year || (0, exports.getFinancialYear)();
    let baseSeq = 1;
    if (settingsFY === financialYear) {
        baseSeq = Math.max(1, Math.floor((0, exports.toNumber)(settings.next_invoice_number)));
    }
    return Math.max(maxDbSeq + 1, baseSeq);
};
exports.getNextSequenceForFY = getNextSequenceForFY;
const peekNextInvoiceNumber = async (issueDate) => {
    const settings = await (0, exports.getSettings)();
    const fy = (0, exports.getFinancialYear)(issueDate);
    const prefix = (settings.invoice_prefix || "INV").trim() || "INV";
    const seq = await (0, exports.getNextSequenceForFY)(prefix, fy, settings);
    return (0, exports.buildInvoiceNumber)(prefix, fy, seq);
};
exports.peekNextInvoiceNumber = peekNextInvoiceNumber;
/** Reserve the next invoice number so two invoices never share one. */
const consumeNextInvoiceNumber = async (issueDate) => {
    const settings = await (0, exports.getSettings)();
    const fy = (0, exports.getFinancialYear)(issueDate);
    const prefix = (settings.invoice_prefix || "INV").trim() || "INV";
    const seq = await (0, exports.getNextSequenceForFY)(prefix, fy, settings);
    const number = (0, exports.buildInvoiceNumber)(prefix, fy, seq);
    await supabase_1.supabase
        .from("acc_settings")
        .update({
        financial_year: fy,
        next_invoice_number: seq + 1,
    })
        .eq("id", SETTINGS_ID);
    return number;
};
const buildInvoiceItems = (items) => items.map((item, index) => {
    const qty = (0, exports.toNumber)(item.quantity);
    const rate = (0, exports.toNumber)(item.rate);
    return {
        description: String(item.description || "").trim(),
        quantity: (0, exports.round3)(qty),
        rate: (0, exports.round2)(rate),
        amount: (0, exports.round2)(qty * rate),
        sort_order: index,
    };
});
const createInvoice = async (payload) => {
    const items = buildInvoiceItems(payload.items || []);
    const totals = (0, exports.computeInvoiceTotals)(items, payload.discount, payload.tax_rate);
    const today = (0, exports.todayISODate)();
    const issueDate = payload.issue_date || today;
    const requestedNumber = payload.invoice_number?.trim();
    let invoiceNumber = requestedNumber;
    if (!invoiceNumber) {
        invoiceNumber = await consumeNextInvoiceNumber(issueDate);
    }
    else {
        // If client supplied invoice number, advance settings for that FY
        const fy = (0, exports.getFinancialYear)(issueDate);
        const parts = invoiceNumber.split("-");
        const parsed = parseInt(parts[parts.length - 1], 10);
        if (!isNaN(parsed)) {
            await supabase_1.supabase
                .from("acc_settings")
                .update({
                financial_year: fy,
                next_invoice_number: parsed + 1,
            })
                .eq("id", SETTINGS_ID);
        }
    }
    const amountPaid = payload.status === "paid"
        ? totals.total
        : Math.min(Math.max((0, exports.toNumber)(payload.amount_paid), 0), totals.total);
    const status = payload.status === "draft"
        ? "draft"
        : (0, exports.deriveInvoiceStatus)(totals.total, amountPaid, payload.due_date || null, today);
    const settings = await (0, exports.getSettings)();
    const { data, error } = await supabase_1.supabase
        .from("acc_invoices")
        .insert({
        invoice_number: invoiceNumber,
        client_id: payload.client_id || null,
        issue_date: payload.issue_date || today,
        due_date: payload.due_date || null,
        status,
        currency: payload.currency || settings.currency || "INR",
        subtotal: totals.subtotal,
        discount: totals.discount,
        tax_rate: totals.taxRate,
        tax_amount: totals.taxAmount,
        total: totals.total,
        amount_paid: amountPaid,
        notes: payload.notes?.trim() || null,
        terms: payload.terms?.trim() || null,
    })
        .select()
        .single();
    if (error)
        throw error;
    const invoice = mapInvoiceRow(data);
    if (items.length > 0) {
        const { error: itemError } = await supabase_1.supabase
            .from("acc_invoice_items")
            .insert(items.map((item) => ({ ...item, invoice_id: invoice.id })));
        if (itemError)
            throw itemError;
    }
    return invoice;
};
exports.createInvoice = createInvoice;
const updateInvoice = async (id, payload) => {
    const items = buildInvoiceItems(payload.items || []);
    const totals = (0, exports.computeInvoiceTotals)(items, payload.discount, payload.tax_rate);
    const today = (0, exports.todayISODate)();
    const { data: existing, error: existingError } = await supabase_1.supabase
        .from("acc_invoices")
        .select("*")
        .eq("id", id)
        .maybeSingle();
    if (existingError)
        throw existingError;
    if (!existing) {
        const notFound = new Error("Invoice not found");
        notFound.name = "NotFoundError";
        throw notFound;
    }
    const current = mapInvoiceRow(existing);
    const amountPaid = payload.status === "paid"
        ? totals.total
        : Math.min(Math.max((0, exports.toNumber)(payload.amount_paid), 0), totals.total);
    const status = payload.status === "draft" || current.status === "draft"
        ? "draft"
        : (0, exports.deriveInvoiceStatus)(totals.total, amountPaid, payload.due_date || null, today);
    const updatePayload = {
        client_id: payload.client_id || null,
        issue_date: payload.issue_date || current.issue_date,
        due_date: payload.due_date || null,
        status,
        subtotal: totals.subtotal,
        discount: totals.discount,
        tax_rate: totals.taxRate,
        tax_amount: totals.taxAmount,
        total: totals.total,
        amount_paid: amountPaid,
        notes: payload.notes?.trim() || null,
        terms: payload.terms?.trim() || null,
    };
    if (payload.invoice_number?.trim()) {
        updatePayload.invoice_number = payload.invoice_number.trim();
    }
    if (payload.currency) {
        updatePayload.currency = payload.currency;
    }
    const { data, error } = await supabase_1.supabase
        .from("acc_invoices")
        .update(updatePayload)
        .eq("id", id)
        .select()
        .single();
    if (error)
        throw error;
    // Replace the line items wholesale — line items are never partially edited.
    const { error: deleteError } = await supabase_1.supabase
        .from("acc_invoice_items")
        .delete()
        .eq("invoice_id", id);
    if (deleteError)
        throw deleteError;
    if (items.length > 0) {
        const { error: itemError } = await supabase_1.supabase
            .from("acc_invoice_items")
            .insert(items.map((item) => ({ ...item, invoice_id: id })));
        if (itemError)
            throw itemError;
    }
    return mapInvoiceRow(data);
};
exports.updateInvoice = updateInvoice;
const deleteInvoice = async (id) => {
    const { error } = await supabase_1.supabase.from("acc_invoices").delete().eq("id", id);
    if (error)
        throw error;
};
exports.deleteInvoice = deleteInvoice;
/**
 * Update only the lifecycle status / amount received, leaving the line items
 * untouched. Lets the UI mark an invoice paid without resending its content.
 */
const updateInvoiceStatus = async (id, status, amountPaidInput) => {
    const { data: existing, error: existingError } = await supabase_1.supabase
        .from("acc_invoices")
        .select("*")
        .eq("id", id)
        .maybeSingle();
    if (existingError)
        throw existingError;
    if (!existing) {
        const notFound = new Error("Invoice not found");
        notFound.name = "NotFoundError";
        throw notFound;
    }
    const current = mapInvoiceRow(existing);
    const today = (0, exports.todayISODate)();
    const amountPaid = status === "paid"
        ? current.total
        : Math.min(Math.max(amountPaidInput !== undefined ? (0, exports.toNumber)(amountPaidInput) : current.amount_paid, 0), current.total);
    const nextStatus = status === "draft" ? "draft" : (0, exports.deriveInvoiceStatus)(current.total, amountPaid, current.due_date, today);
    const { data, error } = await supabase_1.supabase
        .from("acc_invoices")
        .update({ status: nextStatus, amount_paid: amountPaid })
        .eq("id", id)
        .select()
        .single();
    if (error)
        throw error;
    return mapInvoiceRow(data);
};
exports.updateInvoiceStatus = updateInvoiceStatus;
/* -------------------------------------------------------------------------- */
/* Expenses                                                                   */
/* -------------------------------------------------------------------------- */
const mapExpenseRow = (row) => ({
    id: String(row.id),
    expense_date: String(row.expense_date),
    category: String(row.category || "Other"),
    vendor: row.vendor ? String(row.vendor) : null,
    description: row.description ? String(row.description) : null,
    amount: (0, exports.toNumber)(row.amount),
    tax_amount: (0, exports.toNumber)(row.tax_amount),
    total: (0, exports.toNumber)(row.total),
    payment_method: row.payment_method ? String(row.payment_method) : null,
    client_id: row.client_id ? String(row.client_id) : null,
    reference: row.reference ? String(row.reference) : null,
    notes: row.notes ? String(row.notes) : null,
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
});
const listExpenses = async (filters) => {
    let query = supabase_1.supabase.from("acc_expenses").select("*");
    if (filters.from)
        query = query.gte("expense_date", filters.from);
    if (filters.to)
        query = query.lte("expense_date", filters.to);
    if (filters.category && filters.category !== "all")
        query = query.eq("category", filters.category);
    if (filters.client_id)
        query = query.eq("client_id", filters.client_id);
    const { data, error } = await query.order("expense_date", { ascending: false });
    if (error)
        throw error;
    const expenses = (data || []).map(mapExpenseRow);
    const clients = await (0, exports.listClients)();
    const clientMap = new Map(clients.map((client) => [client.id, client]));
    return expenses.map((expense) => ({
        ...expense,
        client_name: expense.client_id
            ? clientMap.get(expense.client_id)?.name ?? null
            : null,
    }));
};
exports.listExpenses = listExpenses;
const buildExpensePayload = (payload) => {
    const amount = Math.max((0, exports.toNumber)(payload.amount), 0);
    const taxAmount = Math.max((0, exports.toNumber)(payload.tax_amount), 0);
    return {
        expense_date: payload.expense_date || (0, exports.todayISODate)(),
        category: String(payload.category || "Other").trim() || "Other",
        vendor: payload.vendor?.trim() || null,
        description: payload.description?.trim() || null,
        amount: (0, exports.round2)(amount),
        tax_amount: (0, exports.round2)(taxAmount),
        total: (0, exports.round2)(amount + taxAmount),
        payment_method: payload.payment_method?.trim() || null,
        client_id: payload.client_id || null,
        reference: payload.reference?.trim() || null,
        notes: payload.notes?.trim() || null,
    };
};
const createExpense = async (payload) => {
    const { data, error } = await supabase_1.supabase
        .from("acc_expenses")
        .insert(buildExpensePayload(payload))
        .select()
        .single();
    if (error)
        throw error;
    return mapExpenseRow(data);
};
exports.createExpense = createExpense;
const updateExpense = async (id, payload) => {
    const { data, error } = await supabase_1.supabase
        .from("acc_expenses")
        .update(buildExpensePayload(payload))
        .eq("id", id)
        .select()
        .single();
    if (error)
        throw error;
    return mapExpenseRow(data);
};
exports.updateExpense = updateExpense;
const deleteExpense = async (id) => {
    const { error } = await supabase_1.supabase.from("acc_expenses").delete().eq("id", id);
    if (error)
        throw error;
};
exports.deleteExpense = deleteExpense;
/* -------------------------------------------------------------------------- */
/* Reporting                                                                  */
/* -------------------------------------------------------------------------- */
const monthKey = (isoDate) => isoDate.slice(0, 7);
const getSummary = async (filters) => {
    const [invoiceRows, expenseRows, settings] = await Promise.all([
        (0, exports.listInvoices)(filters),
        (0, exports.listExpenses)(filters),
        (0, exports.getSettings)(),
    ]);
    // Drafts are not revenue — they are work that has not been billed yet.
    const billable = invoiceRows.filter((invoice) => invoice.status !== "draft");
    const revenue = (0, exports.round2)(billable.reduce((sum, invoice) => sum + (invoice.subtotal - invoice.discount), 0));
    const taxCollected = (0, exports.round2)(billable.reduce((sum, invoice) => sum + invoice.tax_amount, 0));
    const invoicedTotal = (0, exports.round2)(billable.reduce((sum, invoice) => sum + invoice.total, 0));
    const received = (0, exports.round2)(billable.reduce((sum, invoice) => sum + invoice.amount_paid, 0));
    const outstanding = (0, exports.round2)(invoicedTotal - received);
    const expenses = (0, exports.round2)(expenseRows.reduce((sum, expense) => sum + expense.amount, 0));
    const expenseTax = (0, exports.round2)(expenseRows.reduce((sum, expense) => sum + expense.tax_amount, 0));
    const netProfit = (0, exports.round2)(revenue - expenses);
    const taxPayable = (0, exports.round2)(taxCollected - expenseTax);
    const categoryMap = new Map();
    for (const expense of expenseRows) {
        const entry = categoryMap.get(expense.category) || { amount: 0, count: 0 };
        entry.amount = (0, exports.round2)(entry.amount + expense.amount);
        entry.count += 1;
        categoryMap.set(expense.category, entry);
    }
    const expenseByCategory = [...categoryMap.entries()]
        .map(([category, value]) => ({ category, amount: value.amount, count: value.count }))
        .sort((a, b) => b.amount - a.amount);
    const monthlyMap = new Map();
    const ensureMonth = (key) => {
        const existing = monthlyMap.get(key);
        if (existing)
            return existing;
        const created = { month: key, revenue: 0, expenses: 0, net: 0 };
        monthlyMap.set(key, created);
        return created;
    };
    for (const invoice of billable) {
        const month = ensureMonth(monthKey(invoice.issue_date));
        month.revenue = (0, exports.round2)(month.revenue + (invoice.subtotal - invoice.discount));
    }
    for (const expense of expenseRows) {
        const month = ensureMonth(monthKey(expense.expense_date));
        month.expenses = (0, exports.round2)(month.expenses + expense.amount);
    }
    for (const month of monthlyMap.values()) {
        month.net = (0, exports.round2)(month.revenue - month.expenses);
    }
    const monthly = [...monthlyMap.values()].sort((a, b) => a.month.localeCompare(b.month));
    const clientMap = new Map();
    for (const invoice of billable) {
        const key = invoice.client_id || "__walk_in__";
        const entry = clientMap.get(key) || {
            client_id: invoice.client_id,
            client_name: invoice.client_name || "Walk-in / No client",
            revenue: 0,
            invoiced: 0,
            received: 0,
        };
        entry.revenue = (0, exports.round2)(entry.revenue + (invoice.subtotal - invoice.discount));
        entry.invoiced = (0, exports.round2)(entry.invoiced + invoice.total);
        entry.received = (0, exports.round2)(entry.received + invoice.amount_paid);
        clientMap.set(key, entry);
    }
    const byClient = [...clientMap.values()].sort((a, b) => b.revenue - a.revenue);
    return {
        range: { from: filters.from || null, to: filters.to || null },
        currency: settings.currency || "INR",
        revenue,
        tax_collected: taxCollected,
        invoiced_total: invoicedTotal,
        received,
        outstanding,
        expenses,
        expense_tax: expenseTax,
        net_profit: netProfit,
        tax_payable: taxPayable,
        cash_position: (0, exports.round2)(netProfit - taxPayable),
        invoice_count: billable.length,
        expense_count: expenseRows.length,
        overdue_count: billable.filter((invoice) => invoice.status === "overdue").length,
        expense_by_category: expenseByCategory,
        monthly,
        by_client: byClient,
    };
};
exports.getSummary = getSummary;
