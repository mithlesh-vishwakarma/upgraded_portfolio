import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../context/ToastContext";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";

const Toast: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const isError = toast.type === "error";
          const isSuccess = toast.type === "success";

          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, x: 40, y: 15 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 20, transition: { duration: 0.15 } }}
              className="pointer-events-auto"
            >
              <div className="relative overflow-hidden bg-white border border-gray-200 p-4 rounded-2xl shadow-xl flex items-center gap-3">
                {/* Icon */}
                <div className="shrink-0">
                  {isSuccess && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                  {isError && <AlertCircle className="w-5 h-5 text-red-600" />}
                  {!isSuccess && !isError && <Info className="w-5 h-5 text-blue-600" />}
                </div>

                {/* Simple Message */}
                <p
                  className={`flex-1 text-sm font-semibold leading-snug ${isSuccess
                    ? "text-green-600"
                    : isError
                      ? "text-red-600"
                      : "text-slate-700"
                    }`}
                >
                  {toast.message}
                </p>

                {/* Close Button */}
                <button
                  onClick={() => removeToast(toast.id)}
                  className="shrink-0 p-1 text-gray-400 hover:text-gray-600 rounded-lg transition-colors cursor-pointer"
                  aria-label="Close notification"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
