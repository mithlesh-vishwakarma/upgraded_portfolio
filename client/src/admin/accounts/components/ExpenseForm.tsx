import { useState } from "react";
import type {
  AccountClient,
  AccountExpense,
  AccountExpenseInput,
} from "../types/accounts";
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from "../utils/invoice";
import { todayISO } from "../utils/dates";
import { Button, Field, SelectInput, TextArea, TextInput } from "./FormControls";
import Modal from "./Modal";

interface ExpenseFormProps {
  isOpen: boolean;
  expense: AccountExpense | null;
  clients: AccountClient[];
  onClose: () => void;
  onSubmit: (payload: AccountExpenseInput) => Promise<void>;
}

const emptyForm = (): AccountExpenseInput => ({
  expense_date: todayISO(),
  category: EXPENSE_CATEGORIES[0],
  vendor: "",
  description: "",
  amount: 0,
  tax_amount: 0,
  payment_method: "UPI",
  client_id: null,
  reference: "",
  notes: "",
});

const ExpenseForm = ({ isOpen, expense, clients, onClose, onSubmit }: ExpenseFormProps) => {
  const [form, setForm] = useState<AccountExpenseInput>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const [lastExpenseId, setLastExpenseId] = useState<string | null>(null);
  const currentId = expense?.id ?? null;
  if (isOpen && currentId !== lastExpenseId) {
    setLastExpenseId(currentId);
    setErrors({});
    setForm(
      expense
        ? {
            expense_date: expense.expense_date,
            category: expense.category,
            vendor: expense.vendor || "",
            description: expense.description || "",
            amount: expense.amount,
            tax_amount: expense.tax_amount,
            payment_method: expense.payment_method || "",
            client_id: expense.client_id,
            reference: expense.reference || "",
            notes: expense.notes || "",
          }
        : emptyForm()
    );
  }
  if (!isOpen && lastExpenseId !== null) {
    setLastExpenseId(null);
    setErrors({});
    setForm(emptyForm());
  }

  const update = (key: keyof AccountExpenseInput, value: string | number | null) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const amount = Number(form.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      setErrors({ amount: "Enter an amount greater than zero" });
      return;
    }
    if (!form.expense_date) {
      setErrors({ expense_date: "Pick the date of the expense" });
      return;
    }

    setErrors({});
    setSaving(true);
    try {
      await onSubmit({ ...form, amount, tax_amount: Number(form.tax_amount) || 0 });
    } finally {
      setSaving(false);
    }
  };

  const total = (Number(form.amount) || 0) + (Number(form.tax_amount) || 0);

  return (
    <Modal
      isOpen={isOpen}
      title={expense ? "Edit Expense" : "Record Expense"}
      subtitle="Every entry lands in the profit & loss report"
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button onClick={handleSubmit} type="button" disabled={saving}>
            {saving ? "Saving" : expense ? "Update Expense" : "Save Expense"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Date *" className="md:col-span-2">
          <TextInput
            type="date"
            value={form.expense_date}
            invalid={Boolean(errors.expense_date)}
            onChange={(event) => update("expense_date", event.target.value)}
          />
          {errors.expense_date && (
            <p className="text-[11px] text-red-500 mt-1.5 font-bold">{errors.expense_date}</p>
          )}
        </Field>

        <Field label="Category *">
          <SelectInput
            value={form.category}
            onChange={(event) => update("category", event.target.value)}
          >
            {EXPENSE_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </SelectInput>
        </Field>

        <Field label="Vendor / Paid To">
          <TextInput
            value={form.vendor || ""}
            onChange={(event) => update("vendor", event.target.value)}
            placeholder="e.g. Figma, AWS, Hostinger"
          />
        </Field>

        <Field label="Amount *" className="md:col-span-2">
          <TextInput
            type="number"
            min="0"
            step="0.01"
            value={String(form.amount ?? "")}
            invalid={Boolean(errors.amount)}
            onChange={(event) => update("amount", event.target.value === "" ? 0 : Number(event.target.value))}
            placeholder="0.00"
          />
          {errors.amount && (
            <p className="text-[11px] text-red-500 mt-1.5 font-bold">{errors.amount}</p>
          )}
        </Field>

        <Field label="Tax Included" hint="GST or any tax included in the amount">
          <TextInput
            type="number"
            min="0"
            step="0.01"
            value={String(form.tax_amount ?? "")}
            onChange={(event) =>
              update("tax_amount", event.target.value === "" ? 0 : Number(event.target.value))
            }
            placeholder="0.00"
          />
        </Field>

        <Field label="Total">
          <div className="w-full bg-gray-50 dark:bg-slate-800/60 border border-gray-100 dark:border-slate-700 rounded-2xl px-4 py-3 text-sm font-black text-slate-800 dark:text-slate-100">
            {total.toFixed(2)}
          </div>
        </Field>

        <Field label="Payment Method">
          <SelectInput
            value={form.payment_method || ""}
            onChange={(event) => update("payment_method", event.target.value)}
          >
            <option value="">Not specified</option>
            {PAYMENT_METHODS.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </SelectInput>
        </Field>

        <Field label="Linked Client" hint="Optional — for project-related costs">
          <SelectInput
            value={form.client_id || ""}
            onChange={(event) => update("client_id", event.target.value || null)}
          >
            <option value="">No client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </SelectInput>
        </Field>

        <Field label="Description" className="md:col-span-2">
          <TextInput
            value={form.description || ""}
            onChange={(event) => update("description", event.target.value)}
            placeholder="What was this spend for?"
          />
        </Field>

        <Field label="Reference / Invoice No">
          <TextInput
            value={form.reference || ""}
            onChange={(event) => update("reference", event.target.value)}
            placeholder="Optional"
          />
        </Field>

        <Field label="Notes" className="md:col-span-2">
          <TextArea
            value={form.notes || ""}
            onChange={(event) => update("notes", event.target.value)}
            placeholder="Optional"
          />
        </Field>
      </form>
    </Modal>
  );
};

export default ExpenseForm;
