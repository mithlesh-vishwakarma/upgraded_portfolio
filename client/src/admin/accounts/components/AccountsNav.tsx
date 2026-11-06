import { NavLink } from "react-router-dom";
import {
  BarChart3,
  FileText,
  LayoutDashboard,
  Receipt,
  Settings,
  Users,
} from "lucide-react";

/**
 * Sub-navigation for the Accounting section.
 *
 * Rendered inside the admin layout, so every link stays under /admin/accounts
 * and inherits the admin token guard from AdminLayout.
 */
const AccountsNav = () => {
  const items = [
    { name: "Overview", path: "/admin/accounts", icon: LayoutDashboard, end: true },
    { name: "Invoices", path: "/admin/accounts/invoices", icon: FileText, end: false },
    { name: "Expenses", path: "/admin/accounts/expenses", icon: Receipt, end: false },
    { name: "Clients", path: "/admin/accounts/clients", icon: Users, end: false },
    { name: "Reports", path: "/admin/accounts/reports", icon: BarChart3, end: false },
    { name: "Settings", path: "/admin/accounts/settings", icon: Settings, end: false },
  ];

  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1">
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.end}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all duration-200 ${
              isActive
                ? "bg-slate-900 dark:bg-yellow-500 text-white dark:text-slate-950 shadow-md shadow-slate-200 dark:shadow-none"
                : "bg-white dark:bg-slate-900 text-gray-400 dark:text-slate-400 border border-gray-100 dark:border-slate-800 hover:border-yellow-400/50 hover:text-yellow-600"
            }`
          }
        >
          <item.icon className="w-3.5 h-3.5" />
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

export default AccountsNav;
