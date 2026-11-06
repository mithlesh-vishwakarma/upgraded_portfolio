/**
 * Public surface of the admin-only Accounting module.
 *
 * Everything outside this folder should import from here rather than reaching
 * into individual files, so the module can evolve without touching callers.
 */

export { default as AccountsOverview } from "./pages/AccountsOverview";
export { default as AccountsSettingsPage } from "./pages/AccountsSettingsPage";
export { default as ClientsPage } from "./pages/ClientsPage";
export { default as ExpensesPage } from "./pages/ExpensesPage";
export { default as InvoiceEditorPage } from "./pages/InvoiceEditorPage";
export { default as InvoicesPage } from "./pages/InvoicesPage";
export { default as ReportsPage } from "./pages/ReportsPage";

export { default as AccountsNav } from "./components/AccountsNav";
export { default as ClientForm } from "./components/ClientForm";
export { default as ExpenseForm } from "./components/ExpenseForm";
export { default as InvoiceForm } from "./components/InvoiceForm";
export { default as Modal } from "./components/Modal";
export { default as RangePicker } from "./components/RangePicker";

export { accountsApi } from "./services/accountsApi";
export { downloadInvoicePdf, generateInvoicePdf } from "./services/invoicePdf";

export * from "./types/accounts";
