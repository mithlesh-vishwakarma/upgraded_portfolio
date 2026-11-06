import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Download,
  FileText,
  Plus,
  Search,
  Trash2,
  Pencil,
  CheckCircle2,
} from "lucide-react";
import AccountsNav from "../components/AccountsNav";
import RangePicker from "../components/RangePicker";
import Modal from "../components/Modal";
import InvoiceDocument from "../components/InvoiceDocument";
import { Button, Card, EmptyState, Loading, SelectInput } from "../components/FormControls";
import { PageHeader, StatusBadge } from "../components/StatCard";
import { accountsApi } from "../services/accountsApi";
import { downloadInvoicePdf } from "../services/invoicePdf";
import { useToast } from "../../../context/ToastContext";
import { useConfirm } from "../../../context/ConfirmContext";
import type {
  AccountInvoiceDetail,
  AccountInvoiceWithClient,
  AccountSettings,
} from "../types/accounts";
import { formatDate, resolvePreset, type RangePreset } from "../utils/dates";
import { formatMoney } from "../utils/money";

const STATUS_FILTERS = [
  { value: "all", label: "All statuses" },
  { value: "draft", label: "Draft" },
  { value: "sent", label: "Sent" },
  { value: "partial", label: "Partial" },
  { value: "paid", label: "Paid" },
  { value: "overdue", label: "Overdue" },
];

const InvoicesPage = () => {
  const { showToast } = useToast();
  const confirm = useConfirm();
  const navigate = useNavigate();

  const [preset, setPreset] = useState<RangePreset>("all");
  const [range, setRange] = useState<{ from?: string; to?: string }>({});
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");

  const [invoices, setInvoices] = useState<AccountInvoiceWithClient[]>([]);
  const [settings, setSettings] = useState<AccountSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [preview, setPreview] = useState<AccountInvoiceDetail | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [invoiceData, settingsData] = await Promise.all([
        accountsApi.getInvoices({ ...range, status: statusFilter }),
        accountsApi.getSettings(),
      ]);
      setInvoices(invoiceData);
      setSettings(settingsData);
    } catch {
      showToast("Failed to load invoices", "error");
    } finally {
      setLoading(false);
    }
  }, [range, statusFilter, showToast]);

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

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return invoices;
    return invoices.filter((invoice) =>
      [
        invoice.invoice_number,
        invoice.client_name,
        invoice.client_email,
        invoice.notes,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term))
    );
  }, [invoices, search]);

  const totals = useMemo(
    () =>
      filtered.reduce(
        (accumulator, invoice) => ({
          billed: accumulator.billed + invoice.total,
          outstanding: accumulator.outstanding + Math.max(0, invoice.total - invoice.amount_paid),
        }),
        { billed: 0, outstanding: 0 }
      ),
    [filtered]
  );

  const handleDelete = async (invoice: AccountInvoiceWithClient) => {
    const confirmed = await confirm({
      title: "Delete Invoice",
      message: `Delete invoice ${invoice.invoice_number}? This also removes its line items and cannot be undone.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      type: "danger",
    });
    if (!confirmed) return;

    try {
      await accountsApi.deleteInvoice(invoice.id);
      showToast("Invoice deleted", "success");
      load();
    } catch {
      showToast("Failed to delete invoice", "error");
    }
  };

  const handleMarkPaid = async (invoice: AccountInvoiceWithClient) => {
    setBusyId(invoice.id);
    try {
      await accountsApi.updateInvoiceStatus(invoice.id, "paid");
      showToast(`${invoice.invoice_number} marked as paid`, "success");
      load();
    } catch {
      showToast("Failed to update invoice", "error");
    } finally {
      setBusyId(null);
    }
  };

  const handleDownloadPdf = async (invoice: AccountInvoiceWithClient) => {
    setBusyId(invoice.id);
    try {
      const [detail, currentSettings] = await Promise.all([
        accountsApi.getInvoice(invoice.id),
        settings
          ? Promise.resolve(settings)
          : accountsApi.getSettings(),
      ]);
      await downloadInvoicePdf(
        { invoice: detail.invoice, items: detail.items, client: detail.client, settings: currentSettings },
        `Invoice-${detail.invoice.invoice_number}`
      );
      showToast("Invoice PDF downloaded", "success");
    } catch {
      showToast("Failed to generate PDF", "error");
    } finally {
      setBusyId(null);
    }
  };

  const handlePreview = async (invoice: AccountInvoiceWithClient) => {
    setBusyId(invoice.id);
    try {
      const detail = await accountsApi.getInvoice(invoice.id);
      setPreview(detail);
    } catch {
      showToast("Failed to load invoice details", "error");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-8 font-roboto">
      <PageHeader
        title="Invoices"
        subtitle="Billings sent to clients and the money expected back"
        actions={
          <Link to="/admin/accounts/invoices/new">
            <Button icon={<Plus className="w-4 h-4" />}>New Invoice</Button>
          </Link>
        }
      />

      <AccountsNav />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-end gap-3">
          <RangePicker preset={preset} from={range.from} to={range.to} onChange={handleRangeChange} />
          <SelectInput
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="!w-auto !py-2.5 text-[11px] font-bold"
            aria-label="Filter by status"
          >
            {STATUS_FILTERS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectInput>
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl px-4 py-2.5 shadow-sm">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search number or client"
              className="bg-transparent border-none focus:outline-none text-sm w-56 text-slate-700 dark:text-slate-200 placeholder-gray-400"
            />
          </div>
        </div>

        <div className="flex gap-5 text-[11px] font-bold uppercase tracking-widest">
          <span className="text-gray-400">
            Billed{" "}
            <span className="text-slate-800 dark:text-slate-100 font-black">
              {formatMoney(totals.billed, settings?.currency)}
            </span>
          </span>
          <span className="text-gray-400">
            Outstanding{" "}
            <span className="text-red-500 font-black">
              {formatMoney(totals.outstanding, settings?.currency)}
            </span>
          </span>
        </div>
      </div>

      {loading ? (
        <Loading label="Loading invoices" />
      ) : filtered.length === 0 ? (
        <Card className="p-6">
          <EmptyState
            icon={<FileText className="w-7 h-7" />}
            title="No invoices found"
            message="Adjust the filters, or create a new invoice to start billing."
            action={
              <Link to="/admin/accounts/invoices/new">
                <Button icon={<Plus className="w-4 h-4" />}>New Invoice</Button>
              </Link>
            }
          />
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-slate-800/60">
                <tr>
                  {["Invoice", "Client", "Date", "Due", "Total", "Paid", "Status", ""].map((heading) => (
                    <th
                      key={heading}
                      className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 whitespace-nowrap"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-t border-gray-100 dark:border-slate-800 hover:bg-gray-50/60 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => navigate(`/admin/accounts/invoices/${invoice.id}`)}
                        className="text-sm font-black text-slate-800 dark:text-slate-100 hover:text-yellow-600 transition-colors cursor-pointer"
                      >
                        {invoice.invoice_number}
                      </button>
                      <p className="text-[11px] text-gray-400 font-medium">
                        {invoice.item_count} item{invoice.item_count === 1 ? "" : "s"}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-200 whitespace-nowrap">
                        {invoice.client_name || "Walk-in / No client"}
                      </p>
                      {invoice.client_email && (
                        <p className="text-[11px] text-gray-400">{invoice.client_email}</p>
                      )}
                    </td>
                    <td className="px-5 py-4 text-xs font-bold text-gray-500 dark:text-slate-400 whitespace-nowrap">
                      {formatDate(invoice.issue_date)}
                    </td>
                    <td className="px-5 py-4 text-xs font-bold text-gray-500 dark:text-slate-400 whitespace-nowrap">
                      {formatDate(invoice.due_date)}
                    </td>
                    <td className="px-5 py-4 text-sm font-black text-slate-800 dark:text-slate-100 whitespace-nowrap">
                      {formatMoney(invoice.total, invoice.currency)}
                    </td>
                    <td className="px-5 py-4 text-sm font-bold text-gray-500 dark:text-slate-400 whitespace-nowrap">
                      {formatMoney(invoice.amount_paid, invoice.currency)}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={invoice.status} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 justify-end">
                        {invoice.status !== "paid" && invoice.status !== "draft" && (
                          <button
                            type="button"
                            onClick={() => handleMarkPaid(invoice)}
                            disabled={busyId === invoice.id}
                            title="Mark as paid"
                            className="p-2 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-xl transition-colors cursor-pointer disabled:opacity-40"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handlePreview(invoice)}
                          disabled={busyId === invoice.id}
                          title="Preview"
                          className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl transition-colors cursor-pointer disabled:opacity-40"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDownloadPdf(invoice)}
                          disabled={busyId === invoice.id}
                          title="Download A4 PDF"
                          className="p-2 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-500/10 rounded-xl transition-colors cursor-pointer disabled:opacity-40"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate(`/admin/accounts/invoices/${invoice.id}`)}
                          title="Edit"
                          className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl transition-colors cursor-pointer"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(invoice)}
                          title="Delete"
                          className="p-2 text-red-400 hover:text-red-500 rounded-xl transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* --- Invoice preview ------------------------------------------------ */}
      <Modal
        isOpen={Boolean(preview)}
        title={`Invoice ${preview?.invoice.invoice_number ?? ""}`}
        subtitle={preview ? `Issued ${formatDate(preview.invoice.issue_date)} • ${preview.invoice.status.toUpperCase()}` : undefined}
        onClose={() => setPreview(null)}
        size="xl"
      >
        {preview && settings && (
          <InvoiceDocument
            invoice={preview.invoice}
            items={preview.items}
            client={preview.client}
            settings={settings}
            onDownloadPdf={() =>
              downloadInvoicePdf(
                {
                  invoice: preview.invoice,
                  items: preview.items,
                  client: preview.client,
                  settings,
                },
                `Invoice-${preview.invoice.invoice_number}`
              )
            }
          />
        )}
      </Modal>
    </div>
  );
};

export default InvoicesPage;
