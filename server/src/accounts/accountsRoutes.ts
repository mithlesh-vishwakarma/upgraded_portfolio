import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import {
  createClientHandler,
  createExpenseHandler,
  createInvoiceHandler,
  deleteClientHandler,
  deleteExpenseHandler,
  deleteInvoiceHandler,
  getClients,
  getExpenses,
  getInvoiceHandler,
  getInvoices,
  getNextInvoiceNumber,
  getSettingsHandler,
  getSummaryHandler,
  updateClientHandler,
  updateExpenseHandler,
  updateInvoiceHandler,
  updateInvoiceStatusHandler,
  updateSettingsHandler,
} from "./accountsController";

const router = Router();

/**
 * Every route in this module is admin-only. `protect` verifies the admin JWT
 * before any handler runs, so financial data is never reachable without a
 * valid admin session — and the module is not mounted anywhere public.
 */

// --- Settings -------------------------------------------------------------
router.get("/settings", protect as any, getSettingsHandler as any);
router.put("/settings", protect as any, updateSettingsHandler as any);

// --- Reports --------------------------------------------------------------
router.get("/reports/summary", protect as any, getSummaryHandler as any);

// --- Clients --------------------------------------------------------------
router.get("/clients", protect as any, getClients as any);
router.post("/clients", protect as any, createClientHandler as any);
router.put("/clients/:id", protect as any, updateClientHandler as any);
router.delete("/clients/:id", protect as any, deleteClientHandler as any);

// --- Invoices -------------------------------------------------------------
router.get("/invoices", protect as any, getInvoices as any);
router.get("/invoices/next-number", protect as any, getNextInvoiceNumber as any);
router.get("/invoices/:id", protect as any, getInvoiceHandler as any);
router.post("/invoices", protect as any, createInvoiceHandler as any);
router.put("/invoices/:id", protect as any, updateInvoiceHandler as any);
router.patch("/invoices/:id/status", protect as any, updateInvoiceStatusHandler as any);
router.delete("/invoices/:id", protect as any, deleteInvoiceHandler as any);

// --- Expenses -------------------------------------------------------------
router.get("/expenses", protect as any, getExpenses as any);
router.post("/expenses", protect as any, createExpenseHandler as any);
router.put("/expenses/:id", protect as any, updateExpenseHandler as any);
router.delete("/expenses/:id", protect as any, deleteExpenseHandler as any);

export default router;
