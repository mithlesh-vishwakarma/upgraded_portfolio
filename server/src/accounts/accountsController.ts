import { Request, Response } from "express";
import {
  createClient,
  createExpense,
  createInvoice,
  deleteClient,
  deleteExpense,
  deleteInvoice,
  getInvoice,
  getSettings,
  getSummary,
  listClients,
  listExpenses,
  listInvoices,
  peekNextInvoiceNumber,
  updateClient,
  updateExpense,
  updateInvoice,
  updateInvoiceStatus,
  updateSettings,
} from "./accountsService";
import {
  AccountClientInput,
  AccountExpenseInput,
  AccountInvoiceInput,
  INVOICE_STATUSES,
  InvoiceStatus,
} from "./types";

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const param = (req: Request, key: string): string => {
  const value = (req.params as Record<string, string | string[]>)[key];
  return Array.isArray(value) ? value[0] : value;
};

const queryParam = (req: Request, key: string): string | undefined => {
  const value = req.query[key];
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
};

const isValidStatus = (value: unknown): value is InvoiceStatus =>
  typeof value === "string" && (INVOICE_STATUSES as string[]).includes(value);

const handleError = (res: Response, error: any, fallback: string) => {
  if (error?.name === "NotFoundError") {
    return res.status(404).json({ message: error.message || fallback });
  }
  console.error(`${fallback}:`, error);
  return res.status(500).json({ message: fallback, error: error?.message });
};

/* -------------------------------------------------------------------------- */
/* Clients                                                                    */
/* -------------------------------------------------------------------------- */

export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await listClients();
    res.json(clients);
  } catch (error: any) {
    handleError(res, error, "Error fetching clients");
  }
};

export const createClientHandler = async (req: Request, res: Response) => {
  const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
  if (!name) {
    return res.status(400).json({ message: "Client name is required" });
  }

  try {
    const client = await createClient({ ...req.body, name } as AccountClientInput);
    res.status(201).json({ message: "Client created successfully", client });
  } catch (error: any) {
    handleError(res, error, "Error creating client");
  }
};

export const updateClientHandler = async (req: Request, res: Response) => {
  const id = param(req, "id");
  const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
  if (!name) {
    return res.status(400).json({ message: "Client name is required" });
  }

  try {
    const client = await updateClient(id, { ...req.body, name } as AccountClientInput);
    res.json({ message: "Client updated successfully", client });
  } catch (error: any) {
    handleError(res, error, "Error updating client");
  }
};

export const deleteClientHandler = async (req: Request, res: Response) => {
  try {
    await deleteClient(param(req, "id"));
    res.json({ message: "Client deleted successfully" });
  } catch (error: any) {
    handleError(res, error, "Error deleting client");
  }
};

/* -------------------------------------------------------------------------- */
/* Invoices                                                                   */
/* -------------------------------------------------------------------------- */

export const getInvoices = async (req: Request, res: Response) => {
  try {
    const invoices = await listInvoices({
      from: queryParam(req, "from"),
      to: queryParam(req, "to"),
      status: queryParam(req, "status"),
      client_id: queryParam(req, "client_id"),
    });
    res.json(invoices);
  } catch (error: any) {
    handleError(res, error, "Error fetching invoices");
  }
};

export const getInvoiceHandler = async (req: Request, res: Response) => {
  try {
    const result = await getInvoice(param(req, "id"));
    res.json(result);
  } catch (error: any) {
    handleError(res, error, "Error fetching invoice");
  }
};

export const getNextInvoiceNumber = async (req: Request, res: Response) => {
  try {
    const issueDate = queryParam(req, "issue_date");
    const invoiceNumber = await peekNextInvoiceNumber(issueDate);
    res.json({ invoice_number: invoiceNumber });
  } catch (error: any) {
    handleError(res, error, "Error fetching next invoice number");
  }
};

export const createInvoiceHandler = async (req: Request, res: Response) => {
  const body = req.body || {};
  const items = Array.isArray(body.items) ? body.items : [];

  if (items.length === 0) {
    return res.status(400).json({ message: "At least one line item is required" });
  }

  const hasValidItem = items.some(
    (item: any) => typeof item?.description === "string" && item.description.trim().length > 0
  );
  if (!hasValidItem) {
    return res.status(400).json({ message: "Every line item needs a description" });
  }

  if (body.status && !isValidStatus(body.status)) {
    return res.status(400).json({ message: "Invalid invoice status" });
  }

  try {
    const invoice = await createInvoice(body as AccountInvoiceInput);
    res.status(201).json({ message: "Invoice created successfully", invoice });
  } catch (error: any) {
    handleError(res, error, "Error creating invoice");
  }
};

export const updateInvoiceHandler = async (req: Request, res: Response) => {
  const id = param(req, "id");
  const body = req.body || {};
  const items = Array.isArray(body.items) ? body.items : [];

  if (items.length === 0) {
    return res.status(400).json({ message: "At least one line item is required" });
  }

  const hasValidItem = items.some(
    (item: any) => typeof item?.description === "string" && item.description.trim().length > 0
  );
  if (!hasValidItem) {
    return res.status(400).json({ message: "Every line item needs a description" });
  }

  if (body.status && !isValidStatus(body.status)) {
    return res.status(400).json({ message: "Invalid invoice status" });
  }

  try {
    const invoice = await updateInvoice(id, body as AccountInvoiceInput);
    res.json({ message: "Invoice updated successfully", invoice });
  } catch (error: any) {
    handleError(res, error, "Error updating invoice");
  }
};

export const deleteInvoiceHandler = async (req: Request, res: Response) => {
  try {
    await deleteInvoice(param(req, "id"));
    res.json({ message: "Invoice deleted successfully" });
  } catch (error: any) {
    handleError(res, error, "Error deleting invoice");
  }
};

export const updateInvoiceStatusHandler = async (req: Request, res: Response) => {
  const id = param(req, "id");
  const body = req.body || {};

  if (!isValidStatus(body.status)) {
    return res.status(400).json({ message: "Invalid invoice status" });
  }

  try {
    const invoice = await updateInvoiceStatus(
      id,
      body.status,
      body.amount_paid !== undefined ? Number(body.amount_paid) : undefined
    );
    res.json({ message: "Invoice status updated successfully", invoice });
  } catch (error: any) {
    handleError(res, error, "Error updating invoice status");
  }
};

/* -------------------------------------------------------------------------- */
/* Expenses                                                                   */
/* -------------------------------------------------------------------------- */

export const getExpenses = async (req: Request, res: Response) => {
  try {
    const expenses = await listExpenses({
      from: queryParam(req, "from"),
      to: queryParam(req, "to"),
      category: queryParam(req, "category"),
      client_id: queryParam(req, "client_id"),
    });
    res.json(expenses);
  } catch (error: any) {
    handleError(res, error, "Error fetching expenses");
  }
};

export const createExpenseHandler = async (req: Request, res: Response) => {
  const body = req.body || {};
  const amount = Number(body.amount);

  if (!Number.isFinite(amount) || amount < 0) {
    return res.status(400).json({ message: "A valid expense amount is required" });
  }

  try {
    const expense = await createExpense(body as AccountExpenseInput);
    res.status(201).json({ message: "Expense created successfully", expense });
  } catch (error: any) {
    handleError(res, error, "Error creating expense");
  }
};

export const updateExpenseHandler = async (req: Request, res: Response) => {
  const id = param(req, "id");
  const body = req.body || {};
  const amount = Number(body.amount);

  if (!Number.isFinite(amount) || amount < 0) {
    return res.status(400).json({ message: "A valid expense amount is required" });
  }

  try {
    const expense = await updateExpense(id, body as AccountExpenseInput);
    res.json({ message: "Expense updated successfully", expense });
  } catch (error: any) {
    handleError(res, error, "Error updating expense");
  }
};

export const deleteExpenseHandler = async (req: Request, res: Response) => {
  try {
    await deleteExpense(param(req, "id"));
    res.json({ message: "Expense deleted successfully" });
  } catch (error: any) {
    handleError(res, error, "Error deleting expense");
  }
};

/* -------------------------------------------------------------------------- */
/* Settings + reports                                                         */
/* -------------------------------------------------------------------------- */

export const getSettingsHandler = async (_req: Request, res: Response) => {
  try {
    const settings = await getSettings();
    res.json(settings);
  } catch (error: any) {
    handleError(res, error, "Error fetching settings");
  }
};

export const updateSettingsHandler = async (req: Request, res: Response) => {
  try {
    const settings = await updateSettings(req.body || {});
    res.json({ message: "Settings updated successfully", settings });
  } catch (error: any) {
    handleError(res, error, "Error updating settings");
  }
};

export const getSummaryHandler = async (req: Request, res: Response) => {
  try {
    const summary = await getSummary({
      from: queryParam(req, "from"),
      to: queryParam(req, "to"),
    });
    res.json(summary);
  } catch (error: any) {
    handleError(res, error, "Error fetching report summary");
  }
};
