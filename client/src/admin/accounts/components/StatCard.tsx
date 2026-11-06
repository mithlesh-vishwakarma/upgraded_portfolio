import { type ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { InvoiceStatus } from "../types/accounts";
import { statusMeta } from "../utils/invoice";

/* -------------------------------------------------------------------------- */
/* Stat card                                                                  */
/* -------------------------------------------------------------------------- */

interface StatCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  accent: string;
  sublabel?: string;
  trend?: { value: string; positive: boolean };
}

export const StatCard = ({ label, value, icon, accent, sublabel, trend }: StatCardProps) => (
  <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
    <div className="flex justify-between items-start mb-4">
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 ${accent}`}
      >
        {icon}
      </div>
      {trend && (
        <span
          className={`text-[10px] font-black flex items-center gap-1 px-2 py-1 rounded-full uppercase tracking-wider ${
            trend.positive
              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300"
              : "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-300"
          }`}
        >
          {trend.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {trend.value}
        </span>
      )}
    </div>
    <h4 className="text-gray-400 text-[10px] font-black uppercase tracking-wider mb-1">{label}</h4>
    <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{value}</p>
    {sublabel && (
      <p className="text-[11px] font-medium text-gray-400 dark:text-slate-500 mt-1">{sublabel}</p>
    )}
  </div>
);

/* -------------------------------------------------------------------------- */
/* Status badge                                                               */
/* -------------------------------------------------------------------------- */

export const StatusBadge = ({ status }: { status: InvoiceStatus }) => {
  const meta = statusMeta(status);
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${meta.badgeClass}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${meta.dotClass}`} />
      {meta.label}
    </span>
  );
};

/* -------------------------------------------------------------------------- */
/* Page header                                                                */
/* -------------------------------------------------------------------------- */

interface PageHeaderProps {
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
}

export const PageHeader = ({ title, subtitle, actions }: PageHeaderProps) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
    <div>
      <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{title}</h2>
      <p className="text-gray-400 dark:text-slate-500 font-medium tracking-wide">{subtitle}</p>
    </div>
    {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
  </div>
);
