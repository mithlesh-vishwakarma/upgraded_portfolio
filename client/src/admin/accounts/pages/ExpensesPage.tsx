import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, Receipt, Trash2, Pencil } from "lucide-react";
import AccountsNav from "../components/AccountsNav";
import RangePicker from "../components/RangePicker";
import ExpenseForm from "../components/ExpenseForm";
import { Button, Card, EmptyState, Loading, SelectInput } from "../components/FormControls";
import { PageHeader } from "../components/StatCard";
import { accountsApi } from "../services/accountsApi";
import { useToast } from "../../../context/ToastContext";
import { useConfirm } from "../../../context/ConfirmContext";
import type {
  AccountClient,
  AccountExpenseInput,
  AccountExpenseWithClient,
} from "../types/accounts";
import { EXPENSE_CATEGORIES } from "../utils/invoice";
import { formatDate, resolvePreset, type RangePreset } from "../utils/dates";
import { formatMoney } from "../utils/money";

const ExpensesPage = () => {
  const { showToast } = useToast();
  const confirm = useConfirm();

  const [preset, setPreset] = useState<RangePreset>("this_month");
  const [range, setRange] = useState<{ from?: string; to?: string }>(() =>
    resolvePreset("this_month")
  );
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [expenses, setExpenses] = useState<AccountExpenseWithClient[]>([]);
  const [clients, setClients] = useState<AccountClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<AccountExpenseWithClient | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [expenseData, clientData] = await Promise.all([
        accountsApi.getExpenses({ ...range, category: categoryFilter }),
        accountsApi.getClients(),
      ]);
      setExpenses(expenseData);
      setClients(clientData);
    } catch {
      showToast("Failed to load expenses", "error");
    } finally {
      setLoading(false);
    }
  }, [range, categoryFilter, showToast]);

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

  const total = useMemo(
    () => expenses.reduce((sum, expense) => sum + expense.total, 0),
    [expenses]
  );

  const categories = useMemo(() => {
    const seen = new Set(expenses.map((expense) => expense.category));
    return [...new Set([...EXPENSE_CATEGORIES, ...seen])].sort();
  }, [expenses]);

  const handleSubmit = async (payload: AccountExpenseInput) => {
    try {
      if (editing) {
        await accountsApi.updateExpense(editing.id, payload);
        showToast("Expense updated", "success");
      } else {
        await accountsApi.createExpense(payload);
        showToast("Expense recorded", "success");
      }
      setFormOpen(false);
      setEditing(null);
      load();
    } catch {
      showToast("Failed to save expense", "error");
      throw new Error("Failed to save expense");
    }
  };

  const handleDelete = async (expense: AccountExpenseWithClient) => {
    const confirmed = await confirm({
      title: "Delete Expense",
      message: "Delete this expense entry? This cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      type: "danger",
    });
    if (!confirmed) return;

    try {
      await accountsApi.deleteExpense(expense.id);
      showToast("Expense deleted", "success");
      load();
    } catch {
      showToast("Failed to delete expense", "error");
    }
  };

  return (
    <div className="space-y-8 font-roboto">
      <PageHeader
        title="Expenses"
        subtitle="Day-to-day costs that reduce your profit"
        actions={
          <Button
            onClick={() => {
              setEditing(null);
              setFormOpen(true);
            }}
            icon={<Plus className="w-4 h-4" />}
            type="button"
          >
            Record Expense
          </Button>
        }
      />

      <AccountsNav />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-end gap-3">
          <RangePicker preset={preset} from={range.from} to={range.to} onChange={handleRangeChange} />
          <SelectInput
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="!w-auto !py-2.5 text-[11px] font-bold"
            aria-label="Filter by category"
          >
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </SelectInput>
        </div>

        <div className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
          Total{" "}
          <span className="text-red-500 font-black text-sm">{formatMoney(total)}</span>
        </div>
      </div>

      {loading ? (
        <Loading label="Loading expenses" />
      ) : expenses.length === 0 ? (
        <Card className="p-6">
          <EmptyState
            icon={<Receipt className="w-7 h-7" />}
            title="No expenses recorded"
            message="Log software, hardware, hosting and other costs to see your real profit."
            action={
              <Button
                onClick={() => {
                  setEditing(null);
                  setFormOpen(true);
                }}
                icon={<Plus className="w-4 h-4" />}
                type="button"
              >
                Record Expense
              </Button>
            }
          />
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-slate-800/60">
                <tr>
                  {["Date", "Description", "Category", "Vendor", "Method", "Amount", ""].map(
                    (heading) => (
                      <th
                        key={heading}
                        className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 whitespace-nowrap"
                      >
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr
                    key={expense.id}
                    className="border-t border-gray-100 dark:border-slate-800 hover:bg-gray-50/60 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-5 py-4 text-xs font-bold text-gray-500 dark:text-slate-400 whitespace-nowrap">
                      {formatDate(expense.expense_date)}
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                        {expense.description || expense.vendor || "—"}
                      </p>
                      {expense.client_name && (
                        <p className="text-[11px] text-gray-400">{expense.client_name}</p>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-wider text-gray-500 dark:text-slate-400 whitespace-nowrap">
                        {expense.category}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs font-bold text-gray-500 dark:text-slate-400 whitespace-nowrap">
                      {expense.vendor || "—"}
                    </td>
                    <td className="px-5 py-4 text-xs font-bold text-gray-500 dark:text-slate-400 whitespace-nowrap">
                      {expense.payment_method || "—"}
                    </td>
                    <td className="px-5 py-4 text-sm font-black text-red-500 whitespace-nowrap">
                      {formatMoney(expense.total)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            setEditing(expense);
                            setFormOpen(true);
                          }}
                          title="Edit"
                          className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-xl transition-colors cursor-pointer"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(expense)}
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

      <ExpenseForm
        isOpen={formOpen}
        expense={editing}
        clients={clients}
        onClose={() => {
          setFormOpen(false);
          setEditing(null);
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default ExpensesPage;
