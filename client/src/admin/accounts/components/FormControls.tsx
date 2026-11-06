import React from "react";

/**
 * Shared form controls for the Accounting module.
 * They keep the visual language of the existing admin pages.
 */

export const inputClass =
  "w-full bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-2xl px-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-400 transition-all";

export const labelClass =
  "block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2";

interface FieldProps {
  label: string;
  children: React.ReactNode;
  hint?: string;
  className?: string;
}

export const Field = ({ label, children, hint, className = "" }: FieldProps) => (
  <div className={className}>
    <label className={labelClass}>{label}</label>
    {children}
    {hint && <p className="text-[11px] text-gray-400 mt-1.5 font-medium">{hint}</p>}
  </div>
);

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const TextInput = ({ invalid, className = "", ...props }: TextInputProps) => (
  <input
    {...props}
    className={`${inputClass} ${invalid ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""} ${className}`}
  />
);

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const TextArea = ({ invalid, className = "", ...props }: TextAreaProps) => (
  <textarea
    {...props}
    className={`${inputClass} min-h-[96px] resize-y leading-relaxed ${invalid ? "border-red-400 focus:border-red-400" : ""} ${className}`}
  />
);

interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

export const SelectInput = ({ invalid, className = "", children, ...props }: SelectInputProps) => (
  <select
    {...props}
    className={`${inputClass} cursor-pointer appearance-none bg-[length:16px] pr-10 ${invalid ? "border-red-400" : ""} ${className}`}
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 14px center",
    }}
  >
    {children}
  </select>
);

/* -------------------------------------------------------------------------- */
/* Buttons                                                                    */
/* -------------------------------------------------------------------------- */

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md";

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-slate-900 dark:bg-yellow-500 text-white dark:text-slate-950 hover:bg-yellow-500 hover:dark:bg-yellow-400 shadow-md shadow-slate-200 dark:shadow-none",
  secondary:
    "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-200 border border-gray-200 dark:border-slate-700 hover:border-yellow-400 hover:text-yellow-600 transition-colors",
  ghost:
    "bg-gray-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-yellow-400/20 hover:text-yellow-600 transition-colors",
  danger:
    "bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-300 border border-red-100 dark:border-red-900/60 hover:bg-red-100 dark:hover:bg-red-950/60 transition-colors",
};

const BUTTON_SIZES: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-[9px]",
  md: "px-6 py-3.5 text-[10px]",
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
}

export const Button = ({
  variant = "primary",
  size = "md",
  icon,
  className = "",
  children,
  ...props
}: ButtonProps) => (
  <button
    {...props}
    className={`inline-flex items-center justify-center gap-2 rounded-2xl font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${BUTTON_VARIANTS[variant]} ${BUTTON_SIZES[size]} ${className}`}
  >
    {icon}
    {children}
  </button>
);

/* -------------------------------------------------------------------------- */
/* Small display helpers                                                      */
/* -------------------------------------------------------------------------- */

export const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-sm ${className}`}
  >
    {children}
  </div>
);

export const SectionTitle = ({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
}) => (
  <div className="flex items-center justify-between gap-4 mb-5">
    <div className="flex items-center gap-3">
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{children}</h3>
      <div className="h-px flex-1 bg-gray-100 dark:bg-slate-800" />
    </div>
    {action}
  </div>
);

export const Loading = ({ label = "Loading" }: { label?: string }) => (
  <div className="text-center py-24 text-gray-300 dark:text-slate-600 font-bold uppercase tracking-widest animate-pulse">
    {label}...
  </div>
);

export const EmptyState = ({
  icon,
  title,
  message,
  action,
}: {
  icon?: React.ReactNode;
  title: string;
  message?: string;
  action?: React.ReactNode;
}) => (
  <div className="flex flex-col items-center justify-center text-center py-16 px-6">
    {icon && (
      <div className="w-16 h-16 rounded-2xl bg-yellow-400/10 text-yellow-500 flex items-center justify-center mb-4">
        {icon}
      </div>
    )}
    <h4 className="text-base font-black text-slate-700 dark:text-slate-200">{title}</h4>
    {message && (
      <p className="text-sm text-gray-400 font-medium mt-1.5 max-w-sm leading-relaxed">{message}</p>
    )}
    {action && <div className="mt-5">{action}</div>}
  </div>
);
