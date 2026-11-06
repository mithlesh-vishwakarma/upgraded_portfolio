"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSummaryHandler = exports.updateSettingsHandler = exports.getSettingsHandler = exports.deleteExpenseHandler = exports.updateExpenseHandler = exports.createExpenseHandler = exports.getExpenses = exports.updateInvoiceStatusHandler = exports.deleteInvoiceHandler = exports.updateInvoiceHandler = exports.createInvoiceHandler = exports.getNextInvoiceNumber = exports.getInvoiceHandler = exports.getInvoices = exports.deleteClientHandler = exports.updateClientHandler = exports.createClientHandler = exports.getClients = void 0;
const accountsService_1 = require("./accountsService");
const types_1 = require("./types");
/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */
const param = (req, key) => {
    const value = req.params[key];
    return Array.isArray(value) ? value[0] : value;
};
const queryParam = (req, key) => {
    const value = req.query[key];
    if (typeof value !== "string")
        return undefined;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
};
const isValidStatus = (value) => typeof value === "string" && types_1.INVOICE_STATUSES.includes(value);
const handleError = (res, error, fallback) => {
    if (error?.name === "NotFoundError") {
        return res.status(404).json({ message: error.message || fallback });
    }
    console.error(`${fallback}:`, error);
    return res.status(500).json({ message: fallback, error: error?.message });
};
/* -------------------------------------------------------------------------- */
/* Clients                                                                    */
/* -------------------------------------------------------------------------- */
const getClients = async (req, res) => {
    try {
        const clients = await (0, accountsService_1.listClients)();
        res.json(clients);
    }
    catch (error) {
        handleError(res, error, "Error fetching clients");
    }
};
exports.getClients = getClients;
const createClientHandler = async (req, res) => {
    const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
    if (!name) {
        return res.status(400).json({ message: "Client name is required" });
    }
    try {
        const client = await (0, accountsService_1.createClient)({ ...req.body, name });
        res.status(201).json({ message: "Client created successfully", client });
    }
    catch (error) {
        handleError(res, error, "Error creating client");
    }
};
exports.createClientHandler = createClientHandler;
const updateClientHandler = async (req, res) => {
    const id = param(req, "id");
    const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
    if (!name) {
        return res.status(400).json({ message: "Client name is required" });
    }
    try {
        const client = await (0, accountsService_1.updateClient)(id, { ...req.body, name });
        res.json({ message: "Client updated successfully", client });
    }
    catch (error) {
        handleError(res, error, "Error updating client");
    }
};
exports.updateClientHandler = updateClientHandler;
const deleteClientHandler = async (req, res) => {
    try {
        await (0, accountsService_1.deleteClient)(param(req, "id"));
        res.json({ message: "Client deleted successfully" });
    }
    catch (error) {
        handleError(res, error, "Error deleting client");
    }
};
exports.deleteClientHandler = deleteClientHandler;
/* -------------------------------------------------------------------------- */
/* Invoices                                                                   */
/* -------------------------------------------------------------------------- */
const getInvoices = async (req, res) => {
    try {
        const invoices = await (0, accountsService_1.listInvoices)({
            from: queryParam(req, "from"),
            to: queryParam(req, "to"),
            status: queryParam(req, "status"),
            client_id: queryParam(req, "client_id"),
        });
        res.json(invoices);
    }
    catch (error) {
        handleError(res, error, "Error fetching invoices");
    }
};
exports.getInvoices = getInvoices;
const getInvoiceHandler = async (req, res) => {
    try {
        const result = await (0, accountsService_1.getInvoice)(param(req, "id"));
        res.json(result);
    }
    catch (error) {
        handleError(res, error, "Error fetching invoice");
    }
};
exports.getInvoiceHandler = getInvoiceHandler;
const getNextInvoiceNumber = async (req, res) => {
    try {
        const issueDate = queryParam(req, "issue_date");
        const invoiceNumber = await (0, accountsService_1.peekNextInvoiceNumber)(issueDate);
        res.json({ invoice_number: invoiceNumber });
    }
    catch (error) {
        handleError(res, error, "Error fetching next invoice number");
    }
};
exports.getNextInvoiceNumber = getNextInvoiceNumber;
const createInvoiceHandler = async (req, res) => {
    const body = req.body || {};
    const items = Array.isArray(body.items) ? body.items : [];
    if (items.length === 0) {
        return res.status(400).json({ message: "At least one line item is required" });
    }
    const hasValidItem = items.some((item) => typeof item?.description === "string" && item.description.trim().length > 0);
    if (!hasValidItem) {
        return res.status(400).json({ message: "Every line item needs a description" });
    }
    if (body.status && !isValidStatus(body.status)) {
        return res.status(400).json({ message: "Invalid invoice status" });
    }
    try {
        const invoice = await (0, accountsService_1.createInvoice)(body);
        res.status(201).json({ message: "Invoice created successfully", invoice });
    }
    catch (error) {
        handleError(res, error, "Error creating invoice");
    }
};
exports.createInvoiceHandler = createInvoiceHandler;
const updateInvoiceHandler = async (req, res) => {
    const id = param(req, "id");
    const body = req.body || {};
    const items = Array.isArray(body.items) ? body.items : [];
    if (items.length === 0) {
        return res.status(400).json({ message: "At least one line item is required" });
    }
    const hasValidItem = items.some((item) => typeof item?.description === "string" && item.description.trim().length > 0);
    if (!hasValidItem) {
        return res.status(400).json({ message: "Every line item needs a description" });
    }
    if (body.status && !isValidStatus(body.status)) {
        return res.status(400).json({ message: "Invalid invoice status" });
    }
    try {
        const invoice = await (0, accountsService_1.updateInvoice)(id, body);
        res.json({ message: "Invoice updated successfully", invoice });
    }
    catch (error) {
        handleError(res, error, "Error updating invoice");
    }
};
exports.updateInvoiceHandler = updateInvoiceHandler;
const deleteInvoiceHandler = async (req, res) => {
    try {
        await (0, accountsService_1.deleteInvoice)(param(req, "id"));
        res.json({ message: "Invoice deleted successfully" });
    }
    catch (error) {
        handleError(res, error, "Error deleting invoice");
    }
};
exports.deleteInvoiceHandler = deleteInvoiceHandler;
const updateInvoiceStatusHandler = async (req, res) => {
    const id = param(req, "id");
    const body = req.body || {};
    if (!isValidStatus(body.status)) {
        return res.status(400).json({ message: "Invalid invoice status" });
    }
    try {
        const invoice = await (0, accountsService_1.updateInvoiceStatus)(id, body.status, body.amount_paid !== undefined ? Number(body.amount_paid) : undefined);
        res.json({ message: "Invoice status updated successfully", invoice });
    }
    catch (error) {
        handleError(res, error, "Error updating invoice status");
    }
};
exports.updateInvoiceStatusHandler = updateInvoiceStatusHandler;
/* -------------------------------------------------------------------------- */
/* Expenses                                                                   */
/* -------------------------------------------------------------------------- */
const getExpenses = async (req, res) => {
    try {
        const expenses = await (0, accountsService_1.listExpenses)({
            from: queryParam(req, "from"),
            to: queryParam(req, "to"),
            category: queryParam(req, "category"),
            client_id: queryParam(req, "client_id"),
        });
        res.json(expenses);
    }
    catch (error) {
        handleError(res, error, "Error fetching expenses");
    }
};
exports.getExpenses = getExpenses;
const createExpenseHandler = async (req, res) => {
    const body = req.body || {};
    const amount = Number(body.amount);
    if (!Number.isFinite(amount) || amount < 0) {
        return res.status(400).json({ message: "A valid expense amount is required" });
    }
    try {
        const expense = await (0, accountsService_1.createExpense)(body);
        res.status(201).json({ message: "Expense created successfully", expense });
    }
    catch (error) {
        handleError(res, error, "Error creating expense");
    }
};
exports.createExpenseHandler = createExpenseHandler;
const updateExpenseHandler = async (req, res) => {
    const id = param(req, "id");
    const body = req.body || {};
    const amount = Number(body.amount);
    if (!Number.isFinite(amount) || amount < 0) {
        return res.status(400).json({ message: "A valid expense amount is required" });
    }
    try {
        const expense = await (0, accountsService_1.updateExpense)(id, body);
        res.json({ message: "Expense updated successfully", expense });
    }
    catch (error) {
        handleError(res, error, "Error updating expense");
    }
};
exports.updateExpenseHandler = updateExpenseHandler;
const deleteExpenseHandler = async (req, res) => {
    try {
        await (0, accountsService_1.deleteExpense)(param(req, "id"));
        res.json({ message: "Expense deleted successfully" });
    }
    catch (error) {
        handleError(res, error, "Error deleting expense");
    }
};
exports.deleteExpenseHandler = deleteExpenseHandler;
/* -------------------------------------------------------------------------- */
/* Settings + reports                                                         */
/* -------------------------------------------------------------------------- */
const getSettingsHandler = async (_req, res) => {
    try {
        const settings = await (0, accountsService_1.getSettings)();
        res.json(settings);
    }
    catch (error) {
        handleError(res, error, "Error fetching settings");
    }
};
exports.getSettingsHandler = getSettingsHandler;
const updateSettingsHandler = async (req, res) => {
    try {
        const settings = await (0, accountsService_1.updateSettings)(req.body || {});
        res.json({ message: "Settings updated successfully", settings });
    }
    catch (error) {
        handleError(res, error, "Error updating settings");
    }
};
exports.updateSettingsHandler = updateSettingsHandler;
const getSummaryHandler = async (req, res) => {
    try {
        const summary = await (0, accountsService_1.getSummary)({
            from: queryParam(req, "from"),
            to: queryParam(req, "to"),
        });
        res.json(summary);
    }
    catch (error) {
        handleError(res, error, "Error fetching report summary");
    }
};
exports.getSummaryHandler = getSummaryHandler;
