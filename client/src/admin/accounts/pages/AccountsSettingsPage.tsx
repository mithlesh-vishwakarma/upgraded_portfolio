import { useCallback, useEffect, useState } from "react";
import { Save, Settings } from "lucide-react";
import AccountsNav from "../components/AccountsNav";
import { Button, Card, Field, Loading, SectionTitle, SelectInput, TextArea, TextInput } from "../components/FormControls";
import { PageHeader } from "../components/StatCard";
import { accountsApi } from "../services/accountsApi";
import { useToast } from "../../../context/ToastContext";
import type { AccountSettings, AccountSettingsInput } from "../types/accounts";
import { CURRENCY_OPTIONS } from "../utils/money";
import { getFinancialYear } from "../utils/dates";

const AccountsSettingsPage = () => {
  const { showToast } = useToast();

  const [form, setForm] = useState<AccountSettingsInput | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const settings: AccountSettings = await accountsApi.getSettings();
      setForm({
        business_name: settings.business_name || "",
        business_email: settings.business_email || "",
        business_phone: settings.business_phone || "",
        business_address: settings.business_address || "",
        tax_id: settings.tax_id || "",
        currency: settings.currency || "INR",
        default_tax_rate: Number(settings.default_tax_rate) || 0,
        invoice_prefix: settings.invoice_prefix || "INV",
        next_invoice_number: Number(settings.next_invoice_number) || 1,
        payment_terms: settings.payment_terms || "",
        bank_details: settings.bank_details || "",
        logo_url: settings.logo_url || "",
      });
    } catch {
      showToast("Failed to load settings", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    load();
  }, [load]);

  const update = (key: keyof AccountSettingsInput, value: string | number) => {
    setForm((current) => (current ? { ...current, [key]: value } : current));
  };

  const handleSave = async () => {
    if (!form) return;
    setSaving(true);
    try {
      await accountsApi.updateSettings(form);
      showToast("Settings saved", "success");
      load();
    } catch {
      showToast("Failed to save settings", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !form) {
    return (
      <div className="space-y-8">
        <PageHeader title="Settings" subtitle="Loading your business profile..." />
        <Loading label="Loading settings" />
      </div>
    );
  }

  return (
    <div className="space-y-8 font-roboto">
      <PageHeader
        title="Settings"
        subtitle="Business details used on every invoice PDF"
        actions={
          <Button
            onClick={handleSave}
            disabled={saving}
            icon={<Save className="w-4 h-4" />}
            type="button"
          >
            {saving ? "Saving" : "Save Settings"}
          </Button>
        }
      />

      <AccountsNav />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* --- Business profile --------------------------------------------- */}
        <Card className="p-7">
          <SectionTitle>
            <span className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-yellow-500" /> Business Profile
            </span>
          </SectionTitle>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Business Name" className="sm:col-span-2">
              <TextInput
                value={form.business_name || ""}
                onChange={(event) => update("business_name", event.target.value)}
                placeholder="OrdinaryCoder"
              />
            </Field>

            <Field label="Email">
              <TextInput
                type="email"
                value={form.business_email || ""}
                onChange={(event) => update("business_email", event.target.value)}
                placeholder="billing@yourdomain.com"
              />
            </Field>

            <Field label="Phone">
              <TextInput
                value={form.business_phone || ""}
                onChange={(event) => update("business_phone", event.target.value)}
                placeholder="+91 ..."
              />
            </Field>

            <Field label="Tax ID / GSTIN">
              <TextInput
                value={form.tax_id || ""}
                onChange={(event) => update("tax_id", event.target.value)}
                placeholder="Optional"
              />
            </Field>

            <Field label="Logo URL" hint="PNG or JPG — printed on the invoice header">
              <TextInput
                value={form.logo_url || ""}
                onChange={(event) => update("logo_url", event.target.value)}
                placeholder="https://..."
              />
            </Field>

            <Field label="Address" className="sm:col-span-2">
              <TextArea
                value={form.business_address || ""}
                onChange={(event) => update("business_address", event.target.value)}
                placeholder="Street, city, state, PIN"
              />
            </Field>
          </div>
        </Card>

        {/* --- Invoice defaults --------------------------------------------- */}
        <Card className="p-7">
          <SectionTitle>Invoice Defaults</SectionTitle>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Currency">
              <SelectInput
                value={form.currency || "INR"}
                onChange={(event) => update("currency", event.target.value)}
              >
                {CURRENCY_OPTIONS.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))}
              </SelectInput>
            </Field>

            <Field label="Default Tax Rate %">
              <TextInput
                type="number"
                min="0"
                step="0.001"
                value={String(form.default_tax_rate ?? 0)}
                onChange={(event) => update("default_tax_rate", Number(event.target.value) || 0)}
              />
            </Field>

            <Field
              label="Invoice Prefix"
              hint={`Format 2 Preview: ${(form.invoice_prefix || "INV").trim()}-${getFinancialYear()}-${String(form.next_invoice_number ?? 1).padStart(4, "0")}`}
            >
              <TextInput
                value={form.invoice_prefix || ""}
                onChange={(event) => update("invoice_prefix", event.target.value)}
                placeholder="INV"
                className="font-black"
              />
            </Field>

            <Field
              label={`Next Sequence Number (FY ${getFinancialYear()})`}
              hint="Resets to 1 automatically on April 1st (after March 31 accounting year-end)"
            >
              <TextInput
                type="number"
                min="1"
                step="1"
                value={String(form.next_invoice_number ?? 1)}
                onChange={(event) =>
                  update("next_invoice_number", Math.max(1, Number(event.target.value) || 1))
                }
              />
            </Field>

            <Field label="Default Payment Terms" className="sm:col-span-2">
              <TextArea
                value={form.payment_terms || ""}
                onChange={(event) => update("payment_terms", event.target.value)}
                placeholder="Payment due within 15 days of the invoice date."
              />
            </Field>

            <Field label="Bank Details" className="sm:col-span-2" hint="Printed on the invoice PDF">
              <TextArea
                value={form.bank_details || ""}
                onChange={(event) => update("bank_details", event.target.value)}
                placeholder={"Account Name: ...\nBank: ...\nIFSC: ...\nAccount No: ..."}
              />
            </Field>
          </div>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
          icon={<Save className="w-4 h-4" />}
          type="button"
        >
          {saving ? "Saving" : "Save Settings"}
        </Button>
      </div>
    </div>
  );
};

export default AccountsSettingsPage;
