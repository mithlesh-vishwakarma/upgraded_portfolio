import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Trash2, Info, HelpCircle } from "lucide-react";

export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "info";
}

interface ConfirmDialogProps {
  isOpen: boolean;
  options: ConfirmOptions;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  options,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const {
    title = "Confirm Action",
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    type = "info",
  } = options;

  // Icon and colors mapping based on type
  const getThemeConfig = () => {
    switch (type) {
      case "danger":
        return {
          icon: <Trash2 className="w-6 h-6 text-red-500 animate-pulse" />,
          iconBg: "bg-red-500/10 border-red-500/20",
          confirmBtn: "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20 hover:shadow-red-500/40",
          titleText: "text-red-600",
        };
      case "warning":
        return {
          icon: <AlertTriangle className="w-6 h-6 text-yellow-500 animate-pulse" />,
          iconBg: "bg-yellow-500/10 border-yellow-500/20",
          confirmBtn: "bg-yellow-500 hover:bg-yellow-600 text-slate-900 shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40",
          titleText: "text-yellow-600",
        };
      case "info":
      default:
        return {
          icon: <Info className="w-6 h-6 text-blue-500" />,
          iconBg: "bg-blue-500/10 border-blue-500/20",
          confirmBtn: "bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20 hover:shadow-slate-900/40",
          titleText: "text-slate-900",
        };
    }
  };

  const theme = getThemeConfig();

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-6 overflow-x-hidden overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onCancel}
        className="fixed inset-0 bg-slate-950/40 backdrop-blur-md cursor-pointer"
      />

      {/* Modal Dialog Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
        className="relative bg-white/95 border border-gray-100 backdrop-blur-xl shadow-2xl rounded-[32px] p-8 max-w-md w-full overflow-hidden"
      >
        <div className="flex flex-col items-center text-center">
          {/* Header Icon */}
          <div className={`p-4 rounded-3xl border-2 mb-5 flex items-center justify-center ${theme.iconBg}`}>
            {theme.icon}
          </div>

          {/* Title */}
          <h3 className={`text-xl font-black tracking-tight mb-2 ${theme.titleText}`}>
            {title}
          </h3>

          {/* Description Message */}
          <p className="text-gray-500 font-medium text-sm leading-relaxed mb-8">
            {message}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4 w-full">
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-55 border border-gray-200 text-slate-700 font-black py-4 rounded-2xl hover:bg-gray-100 transition-all text-xs uppercase tracking-widest select-none cursor-pointer"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 font-black py-4 rounded-2xl transition-all text-xs uppercase tracking-widest select-none cursor-pointer ${theme.confirmBtn}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmDialog;
