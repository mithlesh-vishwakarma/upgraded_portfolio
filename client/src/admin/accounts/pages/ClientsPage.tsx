import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, Trash2, Pencil, Users, Search } from "lucide-react";
import AccountsNav from "../components/AccountsNav";
import ClientForm from "../components/ClientForm";
import { Button, Card, EmptyState, Loading } from "../components/FormControls";
import { PageHeader } from "../components/StatCard";
import { accountsApi } from "../services/accountsApi";
import { useToast } from "../../../context/ToastContext";
import { useConfirm } from "../../../context/ConfirmContext";
import type { AccountClient, AccountClientInput } from "../types/accounts";
import { formatMoney } from "../utils/money";

interface ClientRow extends AccountClient {
  billed: number;
  outstanding: number;
  invoice_count: number;
}

const ClientsPage = () => {
  const { showToast } = useToast();
  const confirm = useConfirm();

  const [clients, setClients] = useState<ClientRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AccountClient | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [clientData, invoiceData] = await Promise.all([
        accountsApi.getClients(),
        accountsApi.getInvoices(),
      ]);
      setClients(
        clientData.map((client) => {
          const related = invoiceData.filter((invoice) => invoice.client_id === client.id);
          return {
            ...client,
            billed: related
              .filter((invoice) => invoice.status !== "draft")
              .reduce((sum, invoice) => sum + invoice.total, 0),
            outstanding: related
              .filter((invoice) => invoice.status !== "draft")
              .reduce((sum, invoice) => sum + Math.max(0, invoice.total - invoice.amount_paid), 0),
            invoice_count: related.length,
          };
        })
      );
    } catch {
      showToast("Failed to load clients", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return clients;
    return clients.filter((client) =>
      [client.name, client.company, client.email, client.phone]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term))
    );
  }, [clients, search]);

  const handleSubmit = async (payload: AccountClientInput) => {
    try {
      if (editing) {
        await accountsApi.updateClient(editing.id, payload);
        showToast("Client updated", "success");
      } else {
        await accountsApi.createClient(payload);
        showToast("Client added", "success");
      }
      setFormOpen(false);
      setEditing(null);
      load();
    } catch {
      showToast("Failed to save client", "error");
      throw new Error("Failed to save client");
    }
  };

  const handleDelete = async (client: AccountClient) => {
    const confirmed = await confirm({
      title: "Delete Client",
      message: `Delete ${client.name}? Their invoices stay in the books but are no longer linked to a client.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      type: "danger",
    });
    if (!confirmed) return;

    try {
      await accountsApi.deleteClient(client.id);
      showToast("Client deleted", "success");
      load();
    } catch {
      showToast("Failed to delete client", "error");
    }
  };

  return (
    <div className="space-y-8 font-roboto">
      <PageHeader
        title="Clients"
        subtitle="Who you bill, and what is still outstanding"
        actions={
          <Button
            onClick={() => {
              setEditing(null);
              setFormOpen(true);
            }}
            icon={<Plus className="w-4 h-4" />}
            type="button"
          >
            New Client
          </Button>
        }
      />

      <AccountsNav />

      <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl px-4 py-2.5 shadow-sm w-full md:w-80">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search clients"
          className="bg-transparent border-none focus:outline-none text-sm w-full text-slate-700 dark:text-slate-200 placeholder-gray-400"
        />
      </div>

      {loading ? (
        <Loading label="Loading clients" />
      ) : filtered.length === 0 ? (
        <Card className="p-6">
          <EmptyState
            icon={<Users className="w-7 h-7" />}
            title="No clients found"
            message="Add the clients you bill so invoices fill themselves in."
            action={
              <Button
                onClick={() => {
                  setEditing(null);
                  setFormOpen(true);
                }}
                icon={<Plus className="w-4 h-4" />}
                type="button"
              >
                New Client
              </Button>
            }
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((client) => (
            <Card key={client.id} className="p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-yellow-400/15 text-yellow-600 flex items-center justify-center font-black text-lg shrink-0">
                    {client.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-slate-800 dark:text-slate-100 truncate">
                      {client.name}
                    </p>
                    {client.company && (
                      <p className="text-[11px] text-gray-400 truncate">{client.company}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setEditing(client);
                      setFormOpen(true);
                    }}
                    title="Edit"
                    className="p-2 text-slate-300 hover:text-yellow-600 transition-colors cursor-pointer"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(client)}
                    title="Delete"
                    className="p-2 text-slate-300 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-1.5 text-[11px] font-medium text-gray-500 dark:text-slate-400">
                {client.email && <p className="truncate">{client.email}</p>}
                {client.phone && <p>{client.phone}</p>}
              </div>

              <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-gray-100 dark:border-slate-800">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                    Billed
                  </p>
                  <p className="text-sm font-black text-slate-800 dark:text-slate-100">
                    {formatMoney(client.billed)}
                  </p>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                    Due
                  </p>
                  <p className="text-sm font-black text-red-500">{formatMoney(client.outstanding)}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                    Invoices
                  </p>
                  <p className="text-sm font-black text-slate-800 dark:text-slate-100">
                    {client.invoice_count}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ClientForm
        isOpen={formOpen}
        client={editing}
        onClose={() => {
          setFormOpen(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ClientsPage;
