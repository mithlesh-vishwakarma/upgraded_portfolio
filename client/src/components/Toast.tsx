import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../context/ToastContext";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";

const Toast: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col gap-4 max-w-md w-full pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, x: 50, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, x: 0, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 20, transition: { duration: 0.2 } }}
            className="pointer-events-auto"
          >
            <div className={`
              relative overflow-hidden rounded-3xl p-5 shadow-2xl backdrop-blur-xl border
              ${toast.type === "success" ? "bg-green-500/10 border-green-500/20 text-green-600" : ""}
              ${toast.type === "error" ? "bg-red-500/10 border-red-500/20 text-red-600" : ""}
              ${toast.type === "info" ? "bg-blue-500/10 border-blue-500/20 text-blue-600" : ""}
            `}>
              {/* Progress bar background */}
              <motion.div 
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
                className={`absolute bottom-0 left-0 h-1 
                  ${toast.type === "success" ? "bg-green-500" : ""}
                  ${toast.type === "error" ? "bg-red-500" : ""}
                  ${toast.type === "info" ? "bg-blue-500" : ""}
                `}
              />

              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-2xl 
                  ${toast.type === "success" ? "bg-green-500 text-white shadow-lg shadow-green-500/20" : ""}
                  ${toast.type === "error" ? "bg-red-500 text-white shadow-lg shadow-red-500/20" : ""}
                  ${toast.type === "info" ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : ""}
                `}>
                  {toast.type === "success" && <CheckCircle2 className="w-5 h-5" />}
                  {toast.type === "error" && <AlertCircle className="w-5 h-5" />}
                  {toast.type === "info" && <Info className="w-5 h-5" />}
                </div>

                <div className="flex-1 pt-1">
                  <h4 className="font-black text-xs uppercase tracking-widest opacity-50 mb-1">
                    {toast.type === "error" ? "System Failure" : toast.type === "success" ? "Success Operation" : "Notification"}
                  </h4>
                  <p className="font-bold text-sm leading-relaxed">
                    {toast.message}
                  </p>
                </div>

                <button 
                  onClick={() => removeToast(toast.id)}
                  className="p-1 hover:bg-black/5 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 opacity-50" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
