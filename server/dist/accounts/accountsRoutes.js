"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const accountsController_1 = require("./accountsController");
const router = (0, express_1.Router)();
/**
 * Every route in this module is admin-only. `protect` verifies the admin JWT
 * before any handler runs, so financial data is never reachable without a
 * valid admin session — and the module is not mounted anywhere public.
 */
// --- Settings -------------------------------------------------------------
router.get("/settings", authMiddleware_1.protect, accountsController_1.getSettingsHandler);
router.put("/settings", authMiddleware_1.protect, accountsController_1.updateSettingsHandler);
// --- Reports --------------------------------------------------------------
router.get("/reports/summary", authMiddleware_1.protect, accountsController_1.getSummaryHandler);
// --- Clients --------------------------------------------------------------
router.get("/clients", authMiddleware_1.protect, accountsController_1.getClients);
router.post("/clients", authMiddleware_1.protect, accountsController_1.createClientHandler);
router.put("/clients/:id", authMiddleware_1.protect, accountsController_1.updateClientHandler);
router.delete("/clients/:id", authMiddleware_1.protect, accountsController_1.deleteClientHandler);
// --- Invoices -------------------------------------------------------------
router.get("/invoices", authMiddleware_1.protect, accountsController_1.getInvoices);
router.get("/invoices/next-number", authMiddleware_1.protect, accountsController_1.getNextInvoiceNumber);
router.get("/invoices/:id", authMiddleware_1.protect, accountsController_1.getInvoiceHandler);
router.post("/invoices", authMiddleware_1.protect, accountsController_1.createInvoiceHandler);
router.put("/invoices/:id", authMiddleware_1.protect, accountsController_1.updateInvoiceHandler);
router.patch("/invoices/:id/status", authMiddleware_1.protect, accountsController_1.updateInvoiceStatusHandler);
router.delete("/invoices/:id", authMiddleware_1.protect, accountsController_1.deleteInvoiceHandler);
// --- Expenses -------------------------------------------------------------
router.get("/expenses", authMiddleware_1.protect, accountsController_1.getExpenses);
router.post("/expenses", authMiddleware_1.protect, accountsController_1.createExpenseHandler);
router.put("/expenses/:id", authMiddleware_1.protect, accountsController_1.updateExpenseHandler);
router.delete("/expenses/:id", authMiddleware_1.protect, accountsController_1.deleteExpenseHandler);
exports.default = router;
