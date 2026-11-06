import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Banknote,
  FileText,
  Plus,
  Receipt,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import AccountsNav from "../components/AccountsNav";
import RangePicker from "../components/RangePicker";
import { Button, Card, EmptyState, Loading, SectionTitle } from "../components/FormControls";
import { PageHeader, StatCard, StatusBadge } from "../components/StatCard";
import { accountsApi } from "../services/accountsApi";
import type {
  AccountExpenseWithClient,
  AccountInvoiceWithClient,
  AccountsSummary,
} from "../types/accounts";
import { resolvePreset, type RangePreset } from "../utils/dates";
import { formatMoney, formatMoneyCompact } from "../utils/money";
import { formatDate } from "../utils/dates";

const AccountsOverview = () => {
  const [preset, setPreset] = useState<RangePreset>("this_month");
  const [range, setRange] = useState<{ from?: string; to?: string }>(() =>
    resolvePreset("this_month")
  );
  const [summary, setSummary] = useState<AccountsSummary | null>(null);
  const [invoices, setInvoices] = useState<AccountInvoiceWithClient[]>([]);
  const [expenses, setExpenses] = useState<AccountExpenseWithClient[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [summaryData, invoiceData, expenseData] = await Promise.all([
        accountsApi.getSummary(range),
        accountsApi.getInvoices(range),
        accountsApi.getExpenses(range),
      ]);
      setSummary(summaryData);
      setInvoices(invoiceData);
      setExpenses(expenseData);
    } catch {
      /* toast handled by the shared interceptor patterns in pages below */
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    load();
  }, [load]);

  const handleRangeChange = (next: { preset: RangePreset; from?: string; to?: string }) => {
    setPreset(next.preset);
    if (next.preset === "custom") {
      setRange({ from: next.from, to: next.to });
    } else {
      setRange(resolvePreset(next.preset));
    }
  };

  const currency = summary?.currency || "INR";
  const maxMonthly = Math.max(
    1,
    ...(summary?.monthly || []).map((month) => Math.max(month.revenue, month.expenses))
  );

  if (loading && !summary) {
    return (
      <div className="space-y-8">
        <PageHeader title="Accounting" subtitle="Loading your books..." />
        <Loading label="Fetching books" />
      </div>
    );
  }

  return (
    <div className="space-y-8 font-roboto">
      <PageHeader
        title="Accounting"
        subtitle="Billings, expenses and profit — all in one place"
        actions={
          <>
            <Button
              variant="secondary"
              onClick={load}
              icon={<Wallet className="w-4 h-4" />}
              type="button"
            >
              Refresh
            </Button>
            <Link to="/admin/accounts/invoices/new">
              <Button icon={<Plus className="w-4 h-4" />}>New Invoice</Button>
            </Link>
          </>
        }
      />

      <AccountsNav />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <RangePicker preset={preset} from={range.from} to={range.to} onChange={handleRangeChange} />
        {summary && (
          <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
            {summary.invoice_count} invoices · {summary.expense_count} expenses
          </p>
        )}
      </div>

      {/* --- KPI row ------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          label="Revenue"
          value={formatMoneyCompact(summary?.revenue ?? 0, currency)}
          sublabel={`${formatMoney(summary?.revenue ?? 0, currency)} billed`}
          icon={<TrendingUp className="w-6 h-6" />}
          accent="bg-emerald-500"
        />
        <StatCard
          label="Expenses"
          value={formatMoneyCompact(summary?.expenses ?? 0, currency)}
          sublabel={`${formatMoney(summary?.expenses ?? 0, currency)} spent`}
          icon={<TrendingDown className="w-6 h-6" />}
          accent="bg-red-500"
        />
        <StatCard
          label="Net Profit"
          value={formatMoneyCompact(summary?.net_profit ?? 0, currency)}
          sublabel="Revenue minus expenses"
          icon={<Banknote className="w-6 h-6" />}
          accent="bg-yellow-500"
        />
        <StatCard
          label="Outstanding"
          value={formatMoneyCompact(summary?.outstanding ?? 0, currency)}
          sublabel={`${formatMoney(summary?.received ?? 0, currency)} received`}
          icon={<Wallet className="w-6 h-6" />}
          accent="bg-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* --- Profit & loss snapshot -------------------------------------- */}
        <Card className="lg:col-span-2 p-7">
          <SectionTitle>Profit & Loss Snapshot</SectionTitle>

          <div className="space-y-1">
            <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-slate-800">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                Revenue (net of tax)
              </span>
              <span className="font-black text-emerald-600 dark:text-emerald-400">
                {formatMoney(summary?.revenue ?? 0, currency)}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-slate-800">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                Less: Expenses
              </span>
              <span className="font-black text-red-500">
                - {formatMoney(summary?.expenses ?? 0, currency)}
              </span>
            </div>
            <div className="flex justify-between items-center py-4">
              <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">
                Net Profit
              </span>
              <span
                className={`text-2xl font-black ${
                  (summary?.net_profit ?? 0) >= 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-500"
                }`}
              >
                {formatMoney(summary?.net_profit ?? 0, currency)}
              </span>
            </div>

            <div className="bg-gray-50 dark:bg-slate-800/50 rounded-2xl p-4 space-y-2 mt-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-gray-500 dark:text-slate-400">Tax collected</span>
                <span className="font-bold text-slate-700 dark:text-slate-200">
                  {formatMoney(summary?.tax_collected ?? 0, currency)}
                </span>
              </div>
              <div className="flex justify-between text-xs font-medium">
                <span className="text-gray-500 dark:text-slate-400">Tax paid on expenses</span>
                <span className="font-bold text-slate-700 dark:text-slate-200">
                  {formatMoney(summary?.expense_tax ?? 0, currency)}
                </span>
              </div>
              <div className="flex justify-between text-xs font-medium">
                <span className="text-gray-500 dark:text-slate-400">Tax payable</span>
                <span className="font-bold text-slate-700 dark:text-slate-200">
                  {formatMoney(summary?.tax_payable ?? 0, currency)}
                </span>
              </div>
              <div className="flex justify-between text-xs font-medium pt-2 border-t border-gray-200 dark:border-slate-700">
                <span className="text-gray-500 dark:text-slate-400">Cash position</span>
                <span className="font-black text-slate-900 dark:text-white">
                  {formatMoney(summary?.cash_position ?? 0, currency)}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* --- Expense breakdown -------------------------------------------- */}
        <Card className="p-7">
          <SectionTitle>Expenses by Category</SectionTitle>
          {summary && summary.expense_by_category.length > 0 ? (
            <div className="space-y-4">
              {summary.expense_by_category.slice(0, 8).map((entry) => {
                const percentage = summary.expenses > 0 ? (entry.amount / summary.expenses) * 100 : 0;
                return (
                  <div key={entry.category}>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200 truncate">
                        {entry.category}
                      </span>
                      <span className="text-[11px] font-black text-slate-500 dark:text-slate-400">
                        {formatMoney(entry.amount, currency)}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(percentage, 2)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-gray-400 font-medium py-8 text-center">
              No expenses in this period yet.
            </p>
          )}
        </Card>
      </div>

      {/* --- Monthly trend ------------------------------------------------- */}
      {summary && summary.monthly.length > 0 && (
        <Card className="p-7">
          <SectionTitle>Revenue vs Expenses by Month</SectionTitle>
          <div className="flex items-end gap-4 h-56 overflow-x-auto pb-2">
            {summary.monthly.map((month) => (
              <div key={month.month} className="flex-1 min-w-[72px] flex flex-col items-center gap-2">
                <div className="flex items-end gap-1.5 h-40">
                  <div
                    className="w-5 bg-emerald-400 rounded-t-lg transition-all duration-500"
                    style={{ height: `${Math.max((month.revenue / maxMonthly) * 100, 2)}%` }}
                    title={`Revenue ${formatMoney(month.revenue, currency)}`}
                  />
                  <div
                    className="w-5 bg-red-400 rounded-t-lg transition-all duration-500"
                    style={{ height: `${Math.max((month.expenses / maxMonthly) * 100, 2)}%` }}
                    title={`Expenses ${formatMoney(month.expenses, currency)}`}
                  />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  {month.month}
                </span>
                <span
                  className={`text-[10px] font-black ${
                    month.net >= 0 ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  {formatMoneyCompact(month.net, currency)}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-5 mt-3 pt-4 border-t border-gray-100 dark:border-slate-800">
            <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <span className="w-3 h-3 rounded bg-emerald-400" /> Revenue
            </span>
            <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <span className="w-3 h-3 rounded bg-red-400" /> Expenses
            </span>
          </div>
        </Card>
      )}

      {/* --- Recent activity ------------------------------------------------ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-7">
          <SectionTitle
            action={
              <Link
                to="/admin/accounts/invoices"
                className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-yellow-600 hover:text-yellow-500"
              >
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            }
          >
            Recent Invoices
          </SectionTitle>

          {invoices.length === 0 ? (
            <EmptyState
              icon={<FileText className="w-7 h-7" />}
              title="No invoices yet"
              message="Create your first invoice to start tracking billings."
              action={
                <Link to="/admin/accounts/invoices/new">
                  <Button icon={<Plus className="w-4 h-4" />}>New Invoice</Button>
                </Link>
              }
            />
          ) : (
            <div className="space-y-2">
              {invoices.slice(0, 6).map((invoice) => (
                <Link
                  key={invoice.id}
                  to={`/admin/accounts/invoices/${invoice.id}`}
                  className="flex items-center justify-between gap-4 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-black text-slate-800 dark:text-slate-100 truncate">
                      {invoice.client_name || "Walk-in / No client"}
                    </p>
                    <p className="text-[11px] font-medium text-gray-400">
                      {invoice.invoice_number} · {formatDate(invoice.issue_date)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm font-black text-slate-800 dark:text-slate-100">
                      {formatMoney(invoice.total, invoice.currency)}
                    </span>
                    <StatusBadge status={invoice.status} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-7">
          <SectionTitle
            action={
              <Link
                to="/admin/accounts/expenses"
                className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-yellow-600 hover:text-yellow-500"
              >
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            }
          >
            Recent Expenses
          </SectionTitle>

          {expenses.length === 0 ? (
            <EmptyState
              icon={<Receipt className="w-7 h-7" />}
              title="No expenses recorded"
              message="Log your day-to-day costs to see your real profit."
              action={
                <Link to="/admin/accounts/expenses">
                  <Button icon={<Plus className="w-4 h-4" />}>Record Expense</Button>
                </Link>
              }
            />
          ) : (
            <div className="space-y-2">
              {expenses.slice(0, 6).map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between gap-4 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-black text-slate-800 dark:text-slate-100 truncate">
                      {expense.description || expense.vendor || expense.category}
                    </p>
                    <p className="text-[11px] font-medium text-gray-400">
                      {expense.category} · {formatDate(expense.expense_date)}
                    </p>
                  </div>
                  <span className="text-sm font-black text-red-500 shrink-0">
                    - {formatMoney(expense.total, currency)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AccountsOverview;
