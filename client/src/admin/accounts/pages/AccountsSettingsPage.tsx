import { useCallback, useEffect, useRef, useState } from "react";
import { FileImage, PenTool, Save, Settings, Upload, X } from "lucide-react";
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
  const logoInputRef = useRef<HTMLInputElement>(null);
  const signatureInputRef = useRef<HTMLInputElement>(null);

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
        signature_url: settings.signature_url || "",
        signatory_name: settings.signatory_name || "Mithlesh Vishwakarma (OC)",
        signatory_title: settings.signatory_title || "Authorised Signature",
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

  const handleFileUpload = (
    key: "logo_url" | "signature_url",
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      showToast("File size should be under 2MB", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        update(key, reader.result);
        showToast(
          `${key === "logo_url" ? "Logo" : "Signature"} image loaded! Click Save to apply.`,
          "success"
        );
      }
    };
    reader.onerror = () => {
      showToast("Failed to read image file", "error");
    };
    reader.readAsDataURL(file);
    // Reset input so same file can be re-selected if needed
    event.target.value = "";
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

            <Field label="Tax ID / GSTIN" className="sm:col-span-2">
              <TextInput
                value={form.tax_id || ""}
                onChange={(event) => update("tax_id", event.target.value)}
                placeholder="Optional"
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

        {/* --- Branding & Signature ---------------------------------------- */}
        <Card className="p-7">
          <SectionTitle>
            <span className="flex items-center gap-2">
              <PenTool className="w-4 h-4 text-[#FF7A00]" /> Branding & Authorised Signature
            </span>
          </SectionTitle>

          <div className="space-y-6">
            {/* 1. Dynamic Logo */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Business Logo
                </label>
                <div className="flex items-center gap-2">
                  <input
                    ref={logoInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileUpload("logo_url", e)}
                  />
                  <button
                    type="button"
                    onClick={() => logoInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image</span>
                  </button>
                  {form.logo_url && (
                    <button
                      type="button"
                      onClick={() => update("logo_url", "")}
                      className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>
              </div>

              <TextInput
                value={form.logo_url || ""}
                onChange={(event) => update("logo_url", event.target.value)}
                placeholder="https://... or upload local PNG/JPG"
              />
              <p className="text-[11px] text-gray-400 mt-1">
                Printed on the invoice header. Leave empty to use default vector OC monogram logo.
              </p>

              {/* Logo Preview */}
              <div className="mt-3 p-3 bg-[#0B192C] rounded-xl flex items-center justify-between border border-slate-700/50">
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Header Preview
                </div>
                <div className="h-10 flex items-center justify-center">
                  {form.logo_url ? (
                    <img
                      src={form.logo_url}
                      alt="Logo Preview"
                      className="max-h-9 max-w-[140px] object-contain"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-white font-black text-sm tracking-wider">
                        [OC MONOGRAM]
                      </span>
                      <span className="text-xs text-[#FF7A00] font-bold">Default</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-slate-800 pt-5">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4">
                Authorised Signatory
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Field label="Signatory Name">
                  <TextInput
                    value={form.signatory_name || ""}
                    onChange={(event) => update("signatory_name", event.target.value)}
                    placeholder="Mithlesh Vishwakarma (OC)"
                  />
                </Field>

                <Field label="Signatory Title">
                  <TextInput
                    value={form.signatory_title || ""}
                    onChange={(event) => update("signatory_title", event.target.value)}
                    placeholder="Authorised Signature"
                  />
                </Field>
              </div>

              {/* Signature Image or Cursive */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Signature Image (Optional)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      ref={signatureInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload("signature_url", e)}
                    />
                    <button
                      type="button"
                      onClick={() => signatureInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Signature</span>
                    </button>
                    {form.signature_url && (
                      <button
                        type="button"
                        onClick={() => update("signature_url", "")}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>
                </div>

                <TextInput
                  value={form.signature_url || ""}
                  onChange={(event) => update("signature_url", event.target.value)}
                  placeholder="https://... or upload transparent PNG/JPG"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  Upload a scanned signature with transparent background, or leave empty for cursive script font.
                </p>

                {/* Signature Preview */}
                <div className="mt-3 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                  <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2">
                    Signature Preview
                  </div>
                  <div className="h-10 flex items-center justify-center">
                    {form.signature_url ? (
                      <img
                        src={form.signature_url}
                        alt="Signature Preview"
                        className="max-h-9 max-w-[180px] object-contain"
                      />
                    ) : (
                      <span
                        className="text-lg text-slate-900 dark:text-white select-none tracking-tight leading-none italic whitespace-nowrap"
                        style={{
                          fontFamily: "'Brush Script MT', 'Great Vibes', 'Caveat', cursive, sans-serif",
                        }}
                      >
                        {form.signatory_name || "M. Vishwakarma"}
                      </span>
                    )}
                  </div>
                  <div className="border-b-2 border-slate-900 dark:border-white w-48 mx-auto my-1.5" />
                  <p className="text-xs font-black text-slate-900 dark:text-white tracking-wider uppercase">
                    {form.signatory_title || "Authorised Signature"}
                  </p>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-0.5">
                    {form.signatory_name || "Mithlesh Vishwakarma (OC)"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* --- Invoice defaults --------------------------------------------- */}
        <Card className="p-7 lg:col-span-2">
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
