import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Download, Save } from "lucide-react";
import AccountsNav from "../components/AccountsNav";
import InvoiceForm from "../components/InvoiceForm";
import { Button, Loading } from "../components/FormControls";
import { PageHeader } from "../components/StatCard";
import { accountsApi } from "../services/accountsApi";
import { downloadInvoicePdf } from "../services/invoicePdf";
import { useToast } from "../../../context/ToastContext";
import type {
  AccountClient,
  AccountInvoiceDetail,
  AccountInvoiceInput,
  AccountSettings,
} from "../types/accounts";

/**
 * Editor for both new and existing invoices.
 *
 * Saving writes to the database first, then renders the A4 PDF and downloads
 * it — so the file always matches what is stored.
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
      const [detail, currentSettings] = await Promise.all([
        accountsApi.getInvoice(invoiceId),
        settings ? Promise.resolve(settings) : accountsApi.getSettings(),
      ]);
      await downloadInvoicePdf(
        {
          invoice: detail.invoice,
          items: detail.items,
          client: detail.client,
          settings: currentSettings,
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

      navigate("/admin/accounts/invoices");
    } catch {
      showToast("Failed to save invoice", "error");
      throw new Error("Failed to save invoice");
    }
  };

  const handleDownloadExisting = async () => {
    if (!invoice) return;
    setDownloading(true);
    try {
      await buildPdf(invoice.invoice.id);
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
        <PageHeader title={isEdit ? "Edit Invoice" : "New Invoice"} subtitle="Preparing the form..." />
        <Loading label="Loading invoice" />
      </div>
    );
  }

  return (
    <div className="space-y-8 font-roboto">
      <PageHeader
        title={isEdit ? `Edit ${invoice?.invoice.invoice_number ?? "Invoice"}` : "New Invoice"}
        subtitle="Line items become revenue on your profit & loss report"
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
            {isEdit && (
              <Button
                variant="ghost"
                onClick={handleDownloadExisting}
                disabled={downloading}
                icon={<Download className="w-4 h-4" />}
                type="button"
              >
                {downloading ? "Generating" : "Download PDF"}
              </Button>
            )}
          </>
        }
      />

      <AccountsNav />

      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-sm p-7">
        <InvoiceForm
          invoice={invoice}
          clients={clients}
          settings={settings}
          nextNumber={nextNumber}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/admin/accounts/invoices")}
        />
      </div>

      <p className="flex items-center gap-2 text-[11px] font-medium text-gray-400">
        <Save className="w-3.5 h-3.5" />
        Saving stores the invoice in the database, then automatically renders and downloads the
        A4 PDF.
      </p>
    </div>
  );
};

export default InvoiceEditorPage;
