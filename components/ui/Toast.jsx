"use client";
import { createContext, useContext, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, X } from "lucide-react";

const ToastCtx = createContext(null);

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);

  const push = useCallback(({ title, desc, variant = "success", duration = 3500 }) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setItems((s) => [...s, { id, title, desc, variant }]);
    setTimeout(() => setItems((s) => s.filter((t) => t.id !== id)), duration);
  }, []);

  const close = useCallback((id) => setItems((s) => s.filter((t) => t.id !== id)), []);

  return (
    <ToastCtx.Provider value={{ push }}>
      {children}

      <div className="pointer-events-none fixed bottom-4 right-4 z-[70] flex w-[min(420px,calc(100vw-1rem))] flex-col gap-2">
        <AnimatePresence>
          {items.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="pointer-events-auto rounded-xl border border-black/10 bg-white/95 p-3 shadow-xl backdrop-blur dark:border-white/10 dark:bg-neutral-900/95"
              role="status"
              aria-live="polite"
            >
              <div className="flex items-start gap-3">
                {t.variant === "success" ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                ) : (
                  <AlertTriangle className="mt-0.5 h-5 w-5 text-red-600" />
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium">{t.title}</p>
                  {t.desc ? <p className="mt-0.5 text-sm opacity-80">{t.desc}</p> : null}
                </div>
                <button
                  onClick={() => close(t.id)}
                  className="ml-auto rounded-md p-1 text-sm opacity-60 transition hover:opacity-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
