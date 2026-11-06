import api from "../../../api/api";
import type {
  AccountClient,
  AccountClientInput,
  AccountExpense,
  AccountExpenseInput,
  AccountExpenseWithClient,
  AccountInvoice,
  AccountInvoiceDetail,
  AccountInvoiceInput,
  AccountInvoiceWithClient,
  AccountSettings,
  AccountSettingsInput,
  AccountsSummary,
  DateRange,
} from "../types/accounts";

/**
 * Thin API client for the Accounting module.
 *
 * Every call goes through the shared axios instance, which attaches the admin
 * JWT and redirects to the login screen on 401. The server protects all
 * /accounts routes with the same `protect` middleware.
 */

const withQuery = (path: string, params: Record<string, string | undefined>) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) query.set(key, value);
  });
  const suffix = query.toString();
  return suffix ? `${path}?${suffix}` : path;
};

export const accountsApi = {
  /* --- Clients ---------------------------------------------------------- */
  async getClients(): Promise<AccountClient[]> {
    const response = await api.get<AccountClient[]>("/accounts/clients");
    return response.data;
  },

  async createClient(payload: AccountClientInput): Promise<AccountClient> {
    const response = await api.post("/accounts/clients", payload);
    return response.data.client;
  },

  async updateClient(id: string, payload: AccountClientInput): Promise<AccountClient> {
    const response = await api.put(`/accounts/clients/${id}`, payload);
    return response.data.client;
  },

  async deleteClient(id: string): Promise<void> {
    await api.delete(`/accounts/clients/${id}`);
  },

  /* --- Invoices --------------------------------------------------------- */
  async getInvoices(
    filters: DateRange & { status?: string; client_id?: string } = {}
  ): Promise<AccountInvoiceWithClient[]> {
    const path = withQuery("/accounts/invoices", {
      from: filters.from,
      to: filters.to,
      status: filters.status,
      client_id: filters.client_id,
    });
    const response = await api.get<AccountInvoiceWithClient[]>(path);
    return response.data;
  },

  async getInvoice(id: string): Promise<AccountInvoiceDetail> {
    const response = await api.get<AccountInvoiceDetail>(`/accounts/invoices/${id}`);
    return response.data;
  },

  async getNextInvoiceNumber(issueDate?: string): Promise<string> {
    const path = withQuery("/accounts/invoices/next-number", {
      issue_date: issueDate,
    });
    const response = await api.get<{ invoice_number: string }>(path);
    return response.data.invoice_number;
  },

  async createInvoice(payload: AccountInvoiceInput): Promise<AccountInvoice> {
    const response = await api.post("/accounts/invoices", payload);
    return response.data.invoice;
  },

  async updateInvoice(id: string, payload: AccountInvoiceInput): Promise<AccountInvoice> {
    const response = await api.put(`/accounts/invoices/${id}`, payload);
    return response.data.invoice;
  },

  async updateInvoiceStatus(
    id: string,
    status: string,
    amountPaid?: number
  ): Promise<AccountInvoice> {
    const response = await api.patch(`/accounts/invoices/${id}/status`, {
      status,
      amount_paid: amountPaid,
    });
    return response.data.invoice;
  },

  async deleteInvoice(id: string): Promise<void> {
    await api.delete(`/accounts/invoices/${id}`);
  },

  /* --- Expenses --------------------------------------------------------- */
  async getExpenses(
    filters: DateRange & { category?: string; client_id?: string } = {}
  ): Promise<AccountExpenseWithClient[]> {
    const path = withQuery("/accounts/expenses", {
      from: filters.from,
      to: filters.to,
      category: filters.category,
      client_id: filters.client_id,
    });
    const response = await api.get<AccountExpenseWithClient[]>(path);
    return response.data;
  },

  async createExpense(payload: AccountExpenseInput): Promise<AccountExpense> {
    const response = await api.post("/accounts/expenses", payload);
    return response.data.expense;
  },

  async updateExpense(id: string, payload: AccountExpenseInput): Promise<AccountExpense> {
    const response = await api.put(`/accounts/expenses/${id}`, payload);
    return response.data.expense;
  },

  async deleteExpense(id: string): Promise<void> {
    await api.delete(`/accounts/expenses/${id}`);
  },

  /* --- Settings --------------------------------------------------------- */
  async getSettings(): Promise<AccountSettings> {
    const response = await api.get<AccountSettings>("/accounts/settings");
    return response.data;
  },

  async updateSettings(payload: AccountSettingsInput): Promise<AccountSettings> {
    const response = await api.put("/accounts/settings", payload);
    return response.data.settings;
  },

  /* --- Reports ---------------------------------------------------------- */
  async getSummary(filters: DateRange = {}): Promise<AccountsSummary> {
    const path = withQuery("/accounts/reports/summary", {
      from: filters.from,
      to: filters.to,
    });
    const response = await api.get<AccountsSummary>(path);
    return response.data;
  },
};
