import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  FileText,
  Pencil,
  Printer,
  Save,
} from "lucide-react";
import AccountsNav from "../components/AccountsNav";
import InvoiceForm from "../components/InvoiceForm";
import InvoiceDocument from "../components/InvoiceDocument";
import { Button, Loading } from "../components/FormControls";
import { PageHeader } from "../components/StatCard";
import { accountsApi } from "../services/accountsApi";
import { downloadInvoicePdf } from "../services/invoicePdf";
import { useToast } from "../../../context/ToastContext";
import type {
  AccountClient,
  AccountInvoice,
  AccountInvoiceDetail,
  AccountInvoiceInput,
  AccountInvoiceItem,
  AccountSettings,
} from "../types/accounts";

/**
 * Editor and Viewer for invoices.
 *
 * Supports both Document View (the exact branded navy & orange A4 invoice template)
 * and Edit Form (for modifying line items, client, and dates).
 */
const InvoiceEditorPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const isEdit = Boolean(id && id !== "new");

  const [clients, setClients] = useState<AccountClient[]>([]);
  const [settings, setSettings] = useState<AccountSettings | null>(null);
  const [invoice, setInvoice] = useState<AccountInvoiceDetail | null>(null);
  const [nextNumber, setNextNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState<"document" | "edit">(
    isEdit ? "document" : "document"
  );

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [clientData, settingsData, numberData] = await Promise.all([
        accountsApi.getClients(),
        accountsApi.getSettings(),
        accountsApi.getNextInvoiceNumber(),
      ]);
      setClients(clientData);
      setSettings(settingsData);
      setNextNumber(numberData);

      if (isEdit && id) {
        const detail = await accountsApi.getInvoice(id);
        setInvoice(detail);
        setActiveTab("document");
      }
    } catch {
      showToast("Failed to load invoice", "error");
    } finally {
      setLoading(false);
    }
  }, [id, isEdit, showToast]);

  useEffect(() => {
    load();
  }, [load]);

  const buildPdf = useCallback(
    async (invoiceId: string) => {
      if (!settings) return;
      const detail = await accountsApi.getInvoice(invoiceId);
      await downloadInvoicePdf(
        {
          invoice: detail.invoice,
          items: detail.items,
          client: detail.client,
          settings,
        },
        `Invoice-${detail.invoice.invoice_number}`
      );
    },
    [settings]
  );

  const handleSubmit = async (payload: AccountInvoiceInput) => {
    try {
      const saved = isEdit && id
        ? await accountsApi.updateInvoice(id, payload)
        : await accountsApi.createInvoice(payload);

      showToast("Invoice saved successfully", "success");

      try {
        await buildPdf(saved.id);
        showToast("A4 PDF downloaded", "success");
      } catch {
        showToast("Saved, but the PDF could not be generated", "info");
      }

      navigate(`/admin/accounts/invoices/${saved.id}`);
      setActiveTab("document");
    } catch {
      showToast("Failed to save invoice", "error");
      throw new Error("Failed to save invoice");
    }
  };

  const handleDownloadExisting = async () => {
    if (!settings) return;
    setDownloading(true);
    try {
      if (invoice) {
        await buildPdf(invoice.invoice.id);
      } else {
        // Download current preview draft
        await downloadInvoicePdf(
          {
            invoice: displayInvoice,
            items: displayItems,
            client: displayClient,
            settings,
          },
          `Invoice-${displayInvoice.invoice_number}`
        );
      }
      showToast("A4 PDF downloaded", "success");
    } catch {
      showToast("Failed to generate PDF", "error");
    } finally {
      setDownloading(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="space-y-8">
        <PageHeader title={isEdit ? "Invoice Details" : "New Invoice"} subtitle="Preparing..." />
        <Loading label="Loading invoice" />
      </div>
    );
  }

  // Fallback display invoice matching mockup exactly
  const displayInvoice: AccountInvoice = invoice?.invoice || {
    id: "draft",
    invoice_number: nextNumber || "INV-26-27-0001",
    client_id: null,
    issue_date: "2026-11-06",
    due_date: "2026-11-21",
    status: "partial",
    currency: settings.currency || "INR",
    subtotal: 3000,
    discount: 20,
    tax_rate: 5,
    tax_amount: 149,
    total: 3129,
    amount_paid: 200,
    notes:
      "Ponytail is an open-source AI coding skill and plugin created by Dietrich Gebert that forces AI agents (such as Claude Code, Codex, and Cursor) to behave like a pragmatic, minimalist \"lazy senior developer\"",
    terms:
      "Ponytail is an open-source AI coding skill and plugin created by Dietrich Gebert that forces AI agents (such as Claude Code, Codex, and Cursor) to behave like a pragmatic, minimalist \"lazy senior developer\"",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const displayItems: AccountInvoiceItem[] = invoice?.items || [
    {
      id: "item-1",
      invoice_id: "draft",
      description: "Feature",
      quantity: 1,
      rate: 3000,
      amount: 3000,
      sort_order: 0,
    },
  ];

  const displayClient: AccountClient = invoice?.client || {
    id: "client-1",
    name: "Parth Aggarwal",
    company: "Bastion Research",
    email: "connectt@bastionresearch.in",
    phone: "9876543120",
    address: "Vesu, Surat, Gujarat",
    tax_id: null,
    notes: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return (
    <div className="space-y-8 font-roboto">
      <PageHeader
        title={isEdit ? `Invoice ${displayInvoice.invoice_number}` : "New Invoice"}
        subtitle={
          isEdit
            ? `Status: ${displayInvoice.status.toUpperCase()} • Issued on ${displayInvoice.issue_date}`
            : "Review the invoice design or modify details in the form"
        }
        actions={
          <>
            <Button
              variant="secondary"
              onClick={() => navigate("/admin/accounts/invoices")}
              icon={<ArrowLeft className="w-4 h-4" />}
              type="button"
            >
              Back
            </Button>
            <Button
              variant="secondary"
              onClick={() => window.print()}
              icon={<Printer className="w-4 h-4" />}
              type="button"
            >
              Print
            </Button>
            <Button
              variant="primary"
              onClick={handleDownloadExisting}
              disabled={downloading}
              icon={<Download className="w-4 h-4" />}
              type="button"
            >
              {downloading ? "Generating" : "Download PDF"}
            </Button>
          </>
        }
      />

      <AccountsNav />

      {/* Mode Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-2.5 shadow-xs print:hidden">
        <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-slate-800 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab("document")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "document"
                ? "bg-[#0B192C] text-white shadow-xs"
                : "text-gray-500 hover:text-slate-800 dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Document View</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("edit")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === "edit"
                ? "bg-[#0B192C] text-white shadow-xs"
                : "text-gray-500 hover:text-slate-800 dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>{isEdit ? "Edit Form" : "Form Editor"}</span>
          </button>
        </div>

        {activeTab === "document" && (
          <button
            type="button"
            onClick={() => setActiveTab("edit")}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF7A00] hover:text-[#ea6c00] px-3 py-1.5 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors cursor-pointer"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>Edit line items, client or amounts</span>
          </button>
        )}
      </div>

      {/* DOCUMENT VIEW */}
      {activeTab === "document" && (
        <div className="py-2 print:py-0 print:m-0">
          <InvoiceDocument
            invoice={displayInvoice}
            items={displayItems}
            client={displayClient}
            settings={settings}
            onDownloadPdf={handleDownloadExisting}
          />
        </div>
      )}

      {/* FORM EDITOR */}
      {activeTab === "edit" && (
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-sm p-7">
          <InvoiceForm
            invoice={invoice}
            clients={clients}
            settings={settings}
            nextNumber={nextNumber}
            onSubmit={handleSubmit}
            onCancel={() => {
              if (isEdit) setActiveTab("document");
              else navigate("/admin/accounts/invoices");
            }}
          />
        </div>
      )}

      {activeTab === "edit" && (
        <p className="flex items-center gap-2 text-[11px] font-medium text-gray-400">
          <Save className="w-3.5 h-3.5" />
          Saving stores the invoice in the database and updates your financial reports.
        </p>
      )}
    </div>
  );
};

export default InvoiceEditorPage;
