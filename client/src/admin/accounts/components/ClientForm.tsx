import { useState } from "react";
import type { AccountClient, AccountClientInput } from "../types/accounts";
import { Button, Field, SelectInput, TextArea, TextInput } from "./FormControls";
import Modal from "./Modal";

interface ClientFormProps {
  isOpen: boolean;
  client: AccountClient | null;
  onClose: () => void;
  onSubmit: (payload: AccountClientInput) => Promise<void>;
}

const EMPTY: AccountClientInput = {
  name: "",
  email: "",
  phone: "",
  company: "",
  address: "",
  tax_id: "",
  notes: "",
  is_active: true,
};

const ClientForm = ({ isOpen, client, onClose, onSubmit }: ClientFormProps) => {
  const [form, setForm] = useState<AccountClientInput>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  // Keep the form in sync with the record being edited.
  const [lastClientId, setLastClientId] = useState<string | null>(null);
  const currentId = client?.id ?? null;
  if (isOpen && currentId !== lastClientId) {
    setLastClientId(currentId);
    setErrors({});
    setForm(
      client
        ? {
            name: client.name || "",
            email: client.email || "",
            phone: client.phone || "",
            company: client.company || "",
            address: client.address || "",
            tax_id: client.tax_id || "",
            notes: client.notes || "",
            is_active: client.is_active,
          }
        : EMPTY
    );
  }
  if (!isOpen && lastClientId !== null) {
    setLastClientId(null);
    setErrors({});
    setForm(EMPTY);
  }

  const update = (key: keyof AccountClientInput, value: string | boolean) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.name.trim()) {
      setErrors({ name: "Client name is required" });
      return;
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErrors({ email: "Enter a valid email address" });
      return;
    }

    setErrors({});
    setSaving(true);
    try {
      await onSubmit(form);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      title={client ? "Edit Client" : "New Client"}
      subtitle="Client details appear on the invoices you generate"
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button onClick={handleSubmit} type="button" disabled={saving}>
            {saving ? "Saving" : client ? "Update Client" : "Add Client"}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Client Name *" className="md:col-span-2">
          <TextInput
            value={form.name}
            invalid={Boolean(errors.name)}
            onChange={(event) => update("name", event.target.value)}
            placeholder="e.g. Acme Studios"
            autoFocus
          />
          {errors.name && (
            <p className="text-[11px] text-red-500 mt-1.5 font-bold">{errors.name}</p>
          )}
        </Field>

        <Field label="Company">
          <TextInput
            value={form.company || ""}
            onChange={(event) => update("company", event.target.value)}
            placeholder="Optional"
          />
        </Field>

        <Field label="Email">
          <TextInput
            type="email"
            value={form.email || ""}
            invalid={Boolean(errors.email)}
            onChange={(event) => update("email", event.target.value)}
            placeholder="billing@client.com"
          />
          {errors.email && (
            <p className="text-[11px] text-red-500 mt-1.5 font-bold">{errors.email}</p>
          )}
        </Field>

        <Field label="Phone">
          <TextInput
            value={form.phone || ""}
            onChange={(event) => update("phone", event.target.value)}
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

        <Field label="Billing Address" className="md:col-span-2">
          <TextArea
            value={form.address || ""}
            onChange={(event) => update("address", event.target.value)}
            placeholder="Street, city, state, PIN"
          />
        </Field>

        <Field label="Internal Notes" className="md:col-span-2">
          <TextArea
            value={form.notes || ""}
            onChange={(event) => update("notes", event.target.value)}
            placeholder="Anything worth remembering about this client"
          />
        </Field>

        <Field label="Status">
          <SelectInput
            value={form.is_active ? "active" : "inactive"}
            onChange={(event) => update("is_active", event.target.value === "active")}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </SelectInput>
        </Field>
      </form>
    </Modal>
  );
};

export default ClientForm;
