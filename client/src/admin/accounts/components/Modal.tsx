import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}

const SIZES: Record<NonNullable<ModalProps["size"]>, string> = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  xl: "max-w-5xl",
  "2xl": "max-w-6xl",
};

/**
 * Accessible modal used by every Accounting form.
 * Closes on Escape and on backdrop click, and locks background scrolling.
 */
const Modal = ({
  isOpen,
  title,
  subtitle,
  onClose,
  children,
  footer,
  size = "md",
}: ModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/50 backdrop-blur-sm p-4 sm:p-8 print:static print:p-0 print:m-0 print:bg-transparent print:overflow-visible print:backdrop-blur-none"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className={`w-full ${SIZES[size]} my-auto bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 print:w-full print:max-w-none print:m-0 print:p-0 print:border-none print:shadow-none print:rounded-none print:bg-transparent print:animate-none`}
      >
        <div className="flex items-start justify-between gap-4 p-7 border-b border-gray-100 dark:border-slate-800 print:hidden">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs font-medium text-gray-400 mt-1 tracking-wide">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-7 max-h-[85vh] overflow-y-auto print:p-0 print:m-0 print:max-h-none print:overflow-visible">{children}</div>

        {footer && (
          <div className="p-6 border-t border-gray-100 dark:border-slate-800 flex flex-wrap items-center justify-end gap-3 bg-gray-50/50 dark:bg-slate-900/50 rounded-b-3xl print:hidden">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
