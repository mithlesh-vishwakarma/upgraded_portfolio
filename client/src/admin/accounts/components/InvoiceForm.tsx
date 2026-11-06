import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import type {
  AccountClient,
  AccountInvoiceDetail,
  AccountInvoiceInput,
  AccountSettings,
  InvoiceItemInput,
} from "../types/accounts";
import { computeInvoiceTotals, lineAmount } from "../utils/invoice";
import { addDaysISO, todayISO } from "../utils/dates";
import { formatMoney } from "../utils/money";
import { Button, Field, SelectInput, TextArea, TextInput } from "./FormControls";

interface InvoiceFormProps {
  invoice: AccountInvoiceDetail | null;
  clients: AccountClient[];
  settings: AccountSettings;
  nextNumber: string;
  onSubmit: (payload: AccountInvoiceInput) => Promise<void>;
  onCancel: () => void;
}

const emptyItem = (): InvoiceItemInput => ({ description: "", quantity: 1, rate: 0 });

interface FormState {
  invoice_number: string;
  client_id: string | null;
  issue_date: string;
  due_date: string;
  currency: string;
  tax_rate: number;
  discount: number;
  amount_paid: number;
  status: string;
  notes: string;
  terms: string;
  items: InvoiceItemInput[];
}

const buildForm = (
  invoice: AccountInvoiceDetail | null,
  settings: AccountSettings,
  nextNumber: string
): FormState => {
  if (!invoice) {
    const issueDate = todayISO();
    return {
      invoice_number: nextNumber,
      client_id: null,
      issue_date: issueDate,
      due_date: addDaysISO(issueDate, 15),
      currency: settings.currency || "INR",
      tax_rate: Number(settings.default_tax_rate) || 0,
      discount: 0,
      amount_paid: 0,
      status: "draft",
      notes: "",
      terms: settings.payment_terms || "",
      items: [emptyItem()],
    };
  }

  return {
    invoice_number: invoice.invoice.invoice_number,
    client_id: invoice.invoice.client_id,
    issue_date: invoice.invoice.issue_date,
    due_date: invoice.invoice.due_date || addDaysISO(invoice.invoice.issue_date, 15),
    currency: invoice.invoice.currency || settings.currency || "INR",
    tax_rate: Number(invoice.invoice.tax_rate) || 0,
    discount: Number(invoice.invoice.discount) || 0,
    amount_paid: Number(invoice.invoice.amount_paid) || 0,
    status: invoice.invoice.status,
    notes: invoice.invoice.notes || "",
    terms: invoice.invoice.terms || settings.payment_terms || "",
    items:
      invoice.items.length > 0
        ? invoice.items.map((item) => ({
            description: item.description,
            quantity: Number(item.quantity),
            rate: Number(item.rate),
          }))
        : [emptyItem()],
  };
};

/**
 * Full-page invoice editor.
 *
 * Saving returns the persisted invoice so the caller can offer a PDF download
 * straight after a successful save.
 */
const InvoiceForm = ({
  invoice,
  clients,
  settings,
  nextNumber,
  onSubmit,
  onCancel,
}: InvoiceFormProps) => {
  const [form, setForm] = useState<FormState>(() => buildForm(invoice, settings, nextNumber));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  // Reload the form whenever a different invoice is opened.
  const [lastKey, setLastKey] = useState<string | null>(null);
  const formKey = `${invoice?.invoice.id ?? "new"}:${nextNumber}`;
  if (formKey !== lastKey) {
    setLastKey(formKey);
    setErrors({});
    setForm(buildForm(invoice, settings, nextNumber));
  }

  const totals = useMemo(
    () => computeInvoiceTotals(form.items, form.discount, form.tax_rate),
    [form.items, form.discount, form.tax_rate]
  );

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const updateItem = (index: number, patch: Partial<InvoiceItemInput>) => {
    setForm((current) => ({
      ...current,
      items: current.items.map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...patch } : item
      ),
    }));
  };

  const addItem = () => {
    setForm((current) => ({ ...current, items: [...current.items, emptyItem()] }));
  };

  const removeItem = (index: number) => {
    setForm((current) => ({
      ...current,
      items:
        current.items.length > 1
          ? current.items.filter((_, itemIndex) => itemIndex !== index)
          : current.items,
    }));
  };

  const submit = async (overrideStatus?: string) => {
    const validItems = form.items.filter((item) => item.description.trim().length > 0);
    if (validItems.length === 0) {
      setErrors({ items: "Add at least one line item with a description" });
      return;
    }
    if (!form.issue_date) {
      setErrors({ issue_date: "Pick the invoice date" });
      return;
    }
    if (form.due_date && form.due_date < form.issue_date) {
      setErrors({ due_date: "Due date cannot be before the invoice date" });
      return;
    }

    setErrors({});
    setSaving(true);
    try {
      await onSubmit({
        invoice_number: form.invoice_number,
        client_id: form.client_id,
        issue_date: form.issue_date,
        due_date: form.due_date || null,
        currency: form.currency,
        tax_rate: Number(form.tax_rate) || 0,
        discount: Number(form.discount) || 0,
        amount_paid: Number(form.amount_paid) || 0,
        status: (overrideStatus || form.status) as AccountInvoiceInput["status"],
        notes: form.notes,
        terms: form.terms,
        items: validItems,
      });
    } finally {
      setSaving(false);
    }
  };

  const currency = form.currency || "INR";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Field label="Client" className="md:col-span-2">
          <SelectInput
            value={form.client_id || ""}
            onChange={(event) => update("client_id", event.target.value || null)}
          >
            <option value="">Walk-in / No client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
                {client.company ? ` — ${client.company}` : ""}
              </option>
            ))}
          </SelectInput>
        </Field>

        <Field label="Invoice Number" hint="Format: PREFIX-YY-YY-XXXX">
          <TextInput
            value={form.invoice_number}
            onChange={(event) => update("invoice_number", event.target.value)}
            placeholder="INV-26-27-0001"
            className="font-black"
          />
        </Field>

        <Field label="Invoice Date *">
          <TextInput
            type="date"
            value={form.issue_date}
            invalid={Boolean(errors.issue_date)}
            onChange={(event) => update("issue_date", event.target.value)}
          />
          {errors.issue_date && (
            <p className="text-[11px] text-red-500 mt-1.5 font-bold">{errors.issue_date}</p>
          )}
        </Field>

        <Field label="Due Date">
          <TextInput
            type="date"
            value={form.due_date}
            invalid={Boolean(errors.due_date)}
            onChange={(event) => update("due_date", event.target.value)}
          />
          {errors.due_date && (
            <p className="text-[11px] text-red-500 mt-1.5 font-bold">{errors.due_date}</p>
          )}
        </Field>

        <Field label="Currency">
          <SelectInput value={currency} onChange={(event) => update("currency", event.target.value)}>
            {["INR", "USD", "EUR", "GBP", "AUD", "CAD", "AED", "SGD"].map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </SelectInput>
        </Field>
      </div>

      {/* --- Line items ---------------------------------------------------- */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            Line Items
          </h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={addItem}
            type="button"
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            Add Row
          </Button>
        </div>

        <div className="space-y-3">
          {form.items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-3 items-center bg-gray-50/70 dark:bg-slate-800/40 border border-gray-100 dark:border-slate-700/60 rounded-2xl p-3"
            >
              <div className="col-span-12 md:col-span-6">
                <TextInput
                  value={item.description}
                  onChange={(event) => updateItem(index, { description: event.target.value })}
                  placeholder="Description of work"
                  className="!py-2.5 text-[13px]"
                />
              </div>
              <div className="col-span-4 md:col-span-2">
                <TextInput
                  type="number"
                  min="0"
                  step="0.01"
                  value={String(item.quantity)}
                  onChange={(event) => updateItem(index, { quantity: Number(event.target.value) || 0 })}
                  className="!py-2.5 text-[13px] text-right"
                  aria-label="Quantity"
                />
              </div>
              <div className="col-span-4 md:col-span-2">
                <TextInput
                  type="number"
                  min="0"
                  step="0.01"
                  value={String(item.rate)}
                  onChange={(event) => updateItem(index, { rate: Number(event.target.value) || 0 })}
                  className="!py-2.5 text-[13px] text-right"
                  aria-label="Rate"
                />
              </div>
              <div className="col-span-3 md:col-span-1 text-right text-[13px] font-black text-slate-800 dark:text-slate-100">
                {formatMoney(lineAmount(item), currency)}
              </div>
              <div className="col-span-1 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  aria-label="Remove line item"
                  disabled={form.items.length === 1}
                  className="p-2 text-gray-300 hover:text-red-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {errors.items && <p className="text-[11px] text-red-500 mt-2 font-bold">{errors.items}</p>}
      </div>

      {/* --- Totals -------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid grid-cols-2 gap-5">
          <Field label="Discount">
            <TextInput
              type="number"
              min="0"
              step="0.01"
              value={String(form.discount)}
              onChange={(event) => update("discount", Number(event.target.value) || 0)}
            />
          </Field>

          <Field label="Tax Rate %">
            <TextInput
              type="number"
              min="0"
              step="0.001"
              value={String(form.tax_rate)}
              onChange={(event) => update("tax_rate", Number(event.target.value) || 0)}
            />
          </Field>

          <Field label="Amount Received">
            <TextInput
              type="number"
              min="0"
              step="0.01"
              value={String(form.amount_paid)}
              onChange={(event) => update("amount_paid", Number(event.target.value) || 0)}
            />
          </Field>

          <Field label="Status">
            <SelectInput value={form.status} onChange={(event) => update("status", event.target.value)}>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="partial">Partially Paid</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </SelectInput>
          </Field>
        </div>

        <div className="bg-slate-900 dark:bg-slate-800 rounded-3xl p-6 text-white space-y-2.5">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400 font-medium">Subtotal</span>
            <span className="font-black">{formatMoney(totals.subtotal, currency)}</span>
          </div>
          {totals.discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-400 font-medium">Discount</span>
              <span className="font-black text-yellow-400">
                - {formatMoney(totals.discount, currency)}
              </span>
            </div>
          )}
          {totals.taxRate > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-400 font-medium">Tax ({totals.taxRate}%)</span>
              <span className="font-black">{formatMoney(totals.taxAmount, currency)}</span>
            </div>
          )}
          <div className="h-px bg-white/10 my-2" />
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Total
            </span>
            <span className="text-2xl font-black text-yellow-400">
              {formatMoney(totals.total, currency)}
            </span>
          </div>
        </div>
      </div>

      {/* --- Notes --------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Notes (shown on invoice)">
          <TextArea
            value={form.notes}
            onChange={(event) => update("notes", event.target.value)}
            placeholder="Thank you for your business"
          />
        </Field>
        <Field label="Terms & Conditions">
          <TextArea
            value={form.terms}
            onChange={(event) => update("terms", event.target.value)}
            placeholder="Payment due within 15 days"
          />
        </Field>
      </div>

      {/* --- Actions ------------------------------------------------------- */}
      <div className="flex flex-wrap items-center justify-end gap-3 pt-2 border-t border-gray-100 dark:border-slate-800">
        <Button variant="secondary" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button variant="ghost" onClick={() => submit("draft")} type="button" disabled={saving}>
          Save as Draft
        </Button>
        <Button onClick={() => submit("sent")} type="button" disabled={saving}>
          {saving ? "Saving" : invoice ? "Update Invoice" : "Save & Send"}
        </Button>
      </div>
    </div>
  );
};

export default InvoiceForm;
