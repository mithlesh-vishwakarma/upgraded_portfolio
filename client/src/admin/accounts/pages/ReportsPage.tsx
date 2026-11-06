import { useCallback, useEffect, useState } from "react";
import { Download, FileBarChart, Printer } from "lucide-react";
import AccountsNav from "../components/AccountsNav";
import RangePicker from "../components/RangePicker";
import { Button, Card, Loading, SectionTitle } from "../components/FormControls";
import { PageHeader } from "../components/StatCard";
import { accountsApi } from "../services/accountsApi";
import { useToast } from "../../../context/ToastContext";
import type { AccountsSummary } from "../types/accounts";
import { formatMonthLabel, resolvePreset, type RangePreset } from "../utils/dates";
import { formatMoney, formatMoneyCompact } from "../utils/money";

const escapeCsv = (value: string | number): string => {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

const downloadCsv = (filename: string, rows: (string | number)[][]) => {
  const csv = rows.map((row) => row.map(escapeCsv).join(",")).join("\r\n");
  const blob = new Blob([`\uFEFF${csv}`], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const ReportsPage = () => {
  const { showToast } = useToast();

  const [preset, setPreset] = useState<RangePreset>("this_year");
  const [range, setRange] = useState<{ from?: string; to?: string }>(() =>
    resolvePreset("this_year")
  );
  const [summary, setSummary] = useState<AccountsSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await accountsApi.getSummary(range);
      setSummary(data);
    } catch {
      showToast("Failed to load report", "error");
    } finally {
      setLoading(false);
    }
  }, [range, showToast]);

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

  const handleExport = () => {
    if (!summary) return;
    const currency = summary.currency;

    const rows: (string | number)[][] = [
      ["Profit & Loss Statement"],
      ["Currency", currency],
      ["From", summary.range.from || "All time"],
      ["To", summary.range.to || "All time"],
      [],
      ["Line Item", "Amount"],
      ["Revenue (net of tax)", summary.revenue],
      ["Tax collected", summary.tax_collected],
      ["Total invoiced", summary.invoiced_total],
      ["Amount received", summary.received],
      ["Outstanding", summary.outstanding],
      [],
      ["Expenses", summary.expenses],
      ["Tax paid on expenses", summary.expense_tax],
      [],
      ["Net profit", summary.net_profit],
      ["Tax payable", summary.tax_payable],
      ["Cash position", summary.cash_position],
      [],
      ["Expenses by Category"],
      ["Category", "Amount", "Entries"],
      ...summary.expense_by_category.map((entry) => [entry.category, entry.amount, entry.count]),
      [],
      ["Monthly"],
      ["Month", "Revenue", "Expenses", "Net"],
      ...summary.monthly.map((month) => [month.month, month.revenue, month.expenses, month.net]),
      [],
      ["By Client"],
      ["Client", "Revenue", "Invoiced", "Received"],
      ...summary.by_client.map((client) => [
        client.client_name,
        client.revenue,
        client.invoiced,
        client.received,
      ]),
    ];

    downloadCsv(`profit-loss-${summary.range.from || "all"}-to-${summary.range.to || "all"}.csv`, rows);
    showToast("Report exported as CSV", "success");
  };

  const currency = summary?.currency || "INR";

  return (
    <div className="space-y-8 font-roboto">
      <PageHeader
        title="Reports"
        subtitle="Profit & loss, expenses and billing by client"
        actions={
          <>
            <Button
              variant="secondary"
              onClick={() => window.print()}
              icon={<Printer className="w-4 h-4" />}
              type="button"
            >
              Print
            </Button>
            <Button
              onClick={handleExport}
              icon={<Download className="w-4 h-4" />}
              type="button"
              disabled={!summary}
            >
              Export CSV
            </Button>
          </>
        }
      />

      <AccountsNav />

      <RangePicker preset={preset} from={range.from} to={range.to} onChange={handleRangeChange} />

      {loading || !summary ? (
        <Loading label="Building report" />
      ) : (
        <>
          {/* --- Formal P&L statement ---------------------------------------- */}
          <Card className="p-8 print:shadow-none">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-gray-100 dark:border-slate-800">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  Profit & Loss Statement
                </h3>
                <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mt-1">
                  {summary.range.from || "All time"} {summary.range.to ? `to ${summary.range.to}` : ""}
                </p>
              </div>
              <span className="px-3 py-1.5 rounded-full bg-yellow-400/15 text-yellow-600 text-[10px] font-black uppercase tracking-widest">
                {currency}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 py-7">
              {/* Revenue side */}
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">
                  Income
                </p>

                <div className="flex justify-between py-2.5 border-b border-gray-100 dark:border-slate-800">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    Revenue (net of tax)
                  </span>
                  <span className="font-black text-slate-900 dark:text-white">
                    {formatMoney(summary.revenue, currency)}
                  </span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-gray-100 dark:border-slate-800">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    Tax collected
                  </span>
                  <span className="font-black text-slate-900 dark:text-white">
                    {formatMoney(summary.tax_collected, currency)}
                  </span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-gray-100 dark:border-slate-800">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    Total invoiced
                  </span>
                  <span className="font-black text-slate-900 dark:text-white">
                    {formatMoney(summary.invoiced_total, currency)}
                  </span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-gray-100 dark:border-slate-800">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    Amount received
                  </span>
                  <span className="font-black text-emerald-600 dark:text-emerald-400">
                    {formatMoney(summary.received, currency)}
                  </span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-gray-100 dark:border-slate-800">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    Outstanding
                  </span>
                  <span className="font-black text-red-500">
                    {formatMoney(summary.outstanding, currency)}
                  </span>
                </div>

                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-7 mb-3">
                  Expenses
                </p>
                <div className="flex justify-between py-2.5 border-b border-gray-100 dark:border-slate-800">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    Total expenses
                  </span>
                  <span className="font-black text-red-500">
                    - {formatMoney(summary.expenses, currency)}
                  </span>
                </div>
                <div className="flex justify-between py-2.5 border-b border-gray-100 dark:border-slate-800">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    Tax paid on expenses
                  </span>
                  <span className="font-black text-slate-900 dark:text-white">
                    {formatMoney(summary.expense_tax, currency)}
                  </span>
                </div>
              </div>

              {/* Result side */}
              <div className="space-y-4">
                <div className="bg-slate-900 dark:bg-slate-800 rounded-3xl p-7 text-white">
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                    Net Profit
                  </p>
                  <p
                    className={`text-4xl font-black mt-1 ${
                      summary.net_profit >= 0 ? "text-yellow-400" : "text-red-400"
                    }`}
                  >
                    {formatMoney(summary.net_profit, currency)}
                  </p>
                  <p className="text-[11px] text-gray-400 font-medium mt-2">
                    Revenue {formatMoney(summary.revenue, currency)} − Expenses{" "}
                    {formatMoney(summary.expenses, currency)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-slate-800/50 rounded-2xl p-5">
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                      Tax Payable
                    </p>
                    <p className="text-xl font-black text-slate-900 dark:text-white mt-1">
                      {formatMoney(summary.tax_payable, currency)}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-800/50 rounded-2xl p-5">
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                      Cash Position
                    </p>
                    <p className="text-xl font-black text-slate-900 dark:text-white mt-1">
                      {formatMoney(summary.cash_position, currency)}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-800/50 rounded-2xl p-5">
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                      Invoices
                    </p>
                    <p className="text-xl font-black text-slate-900 dark:text-white mt-1">
                      {summary.invoice_count}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-800/50 rounded-2xl p-5">
                    <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                      Overdue
                    </p>
                    <p className="text-xl font-black text-red-500 mt-1">
                      {summary.overdue_count}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* --- Monthly table ------------------------------------------------ */}
          {summary.monthly.length > 0 && (
            <Card className="p-7">
              <SectionTitle>Monthly Breakdown</SectionTitle>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 dark:bg-slate-800/60">
                    <tr>
                      {["Month", "Revenue", "Expenses", "Net"].map((heading) => (
                        <th
                          key={heading}
                          className="px-4 py-3 text-[10px] font-black uppercase tracking-widest text-gray-400"
                        >
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {summary.monthly.map((month) => (
                      <tr
                        key={month.month}
                        className="border-t border-gray-100 dark:border-slate-800"
                      >
                        <td className="px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200">
                          {formatMonthLabel(month.month)}
                        </td>
                        <td className="px-4 py-3 text-sm font-black text-emerald-600 dark:text-emerald-400">
                          {formatMoney(month.revenue, currency)}
                        </td>
                        <td className="px-4 py-3 text-sm font-black text-red-500">
                          {formatMoney(month.expenses, currency)}
                        </td>
                        <td
                          className={`px-4 py-3 text-sm font-black ${
                            month.net >= 0
                              ? "text-slate-900 dark:text-white"
                              : "text-red-500"
                          }`}
                        >
                          {formatMoney(month.net, currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* --- Client breakdown --------------------------------------------- */}
          {summary.by_client.length > 0 && (
            <Card className="p-7">
              <SectionTitle>Billing by Client</SectionTitle>
              <div className="space-y-4">
                {summary.by_client.map((client) => {
                  const percentage =
                    summary.revenue > 0 ? (client.revenue / summary.revenue) * 100 : 0;
                  return (
                    <div key={client.client_id || "walk-in"}>
                      <div className="flex justify-between items-baseline mb-1.5 gap-4">
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">
                          {client.client_name}
                        </span>
                        <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 whitespace-nowrap">
                          {formatMoneyCompact(client.revenue, currency)} ·{" "}
                          {formatMoney(client.received, currency)} received
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-slate-900 dark:bg-yellow-400 rounded-full transition-all duration-500"
                          style={{ width: `${Math.max(percentage, 2)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {summary.invoice_count === 0 && summary.expense_count === 0 && (
            <Card className="p-6">
              <div className="flex flex-col items-center text-center py-10">
                <div className="w-16 h-16 rounded-2xl bg-yellow-400/10 text-yellow-500 flex items-center justify-center mb-4">
                  <FileBarChart className="w-7 h-7" />
                </div>
                <p className="text-base font-black text-slate-700 dark:text-slate-200">
                  Nothing to report yet
                </p>
                <p className="text-sm text-gray-400 font-medium mt-1.5 max-w-sm leading-relaxed">
                  Create invoices and record expenses — this report fills in automatically.
                </p>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default ReportsPage;
