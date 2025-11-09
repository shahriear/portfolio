"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Loader2,
  // Google icon fallback (simple G)
} from "lucide-react";

/* 
  Props:
  - open: boolean
  - onClose: () => void
  - onAction?: (payload: { email:string, password:string }) => Promise<void> | void
  - onOAuth?: (provider: "google") => Promise<void> | void
  - mode?: "login" | "register" | "forgot"
*/
export default function AuthModal({
  open,
  onClose,
  onAction,
  onOAuth,
  mode = "login",
}) {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState(mode); // "login" | "register" | "forgot"
  const [pwdVisible, setPwdVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const dialogRef = useRef(null);

  // mount flag for portal
  useEffect(() => setMounted(true), []);

  //  open  + ESC + focus trap lite
  useEffect(() => {
    if (!open) return;

    // scroll lock
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    function onEsc(e) {
      if (e.key === "Escape") onClose?.();
    }
    document.addEventListener("keydown", onEsc);

    // initial focus
    const t = setTimeout(() => {
      dialogRef.current?.querySelector("input, button")?.focus();
    }, 0);

    return () => {
      document.documentElement.style.overflow = prev;
      document.removeEventListener("keydown", onEsc);
      clearTimeout(t);
    };
  }, [open, onClose]);

  function onBackdropClick(e) {
    if (dialogRef.current && !dialogRef.current.contains(e.target)) {
      onClose?.();
    }
  }

  // from set
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!onAction) return;
    setLoading(true);
    try {
      if (view === "forgot") {
        await onAction({ email, password: "" });
      } else {
        await onAction({ email, password: pwd });
      }
      onClose?.();
    } catch (err) {
      console.error(err);
      //  UI  error
    } finally {
      setLoading(false);
    }
  }

  const title =
    view === "login"
      ? "Login"
      : view === "register"
      ? "Create account"
      : "Reset password";

  if (!mounted) return null;
  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      aria-modal="true"
      role="dialog"
      onMouseDown={onBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Dialog */}
      <div
        ref={dialogRef}
        onMouseDown={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border border-black/10 bg-[oklch(var(--surface))] shadow-2xl dark:border-white/10"
        style={{
          // subtle radial gloss
          backgroundImage:
            "radial-gradient(1200px 500px at 20% -20%, color-mix(in oklch, var(--brand-hex) 10%, transparent), transparent)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/10 dark:border-white/10">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            aria-label="Close"
            className="rounded-lg p-2 hover:bg-black/5 dark:hover:bg-white/5"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-5 pb-5 pt-4 max-h-[80vh] overflow-y-auto">
          {/* Google OAuth */}
          <button
            onClick={() => onOAuth?.("google")}
            className="w-full rounded-xl border border-black/10 dark:border-white/10 flex items-center justify-center gap-2 px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 transition"
          >
            {/* Simple Google G */}
            <span className="inline-block h-5 w-5 rounded-full bg-white text-[11px] font-bold grid place-items-center shadow">
              G
            </span>
            Continue with Google
          </button>

          <div className="my-4 flex items-center gap-3 text-xs opacity-70">
            <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
            <span>or with email</span>
            <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
          </div>

          {/* Email/password / Forgot */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Email */}
            <label className="block text-sm">
              <span className="mb-1 inline-block opacity-80">Email</span>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
                <input
                  type="email"
                  required
                  autoFocus
                  className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent pl-9 pr-3 py-2.5 outline-none"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </label>

            {/* Password (skip in forgot mode) */}
            {view !== "forgot" && (
              <label className="block text-sm">
                <span className="mb-1 inline-block opacity-80">Password</span>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
                  <input
                    type={pwdVisible ? "text" : "password"}
                    required={view !== "forgot"}
                    className="w-full rounded-xl border border-black/10 dark:border-white/10 bg-transparent pl-9 pr-10 py-2.5 outline-none"
                    placeholder="••••••••"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 hover:bg-black/5 dark:hover:bg-white/5"
                    onClick={() => setPwdVisible((v) => !v)}
                    aria-label={pwdVisible ? "Hide password" : "Show password"}
                  >
                    {pwdVisible ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </label>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl px-4 py-2.5 text-white shadow transition hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              style={{
                background:
                  "linear-gradient(90deg, var(--brand-hex), var(--brand2-hex))",
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Processing…
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  {view === "login"
                    ? "Login"
                    : view === "register"
                    ? "Create account"
                    : "Send reset link"}
                </>
              )}
            </button>
          </form>

          {/* Footer links */}
          <div className="mt-4 text-center text-sm">
            {view === "login" && (
              <>
                <button onClick={() => setView("forgot")} className="nav-link">
                  Forgot password?
                </button>
                <div className="mt-1">
                  New here?{" "}
                  <button
                    className="nav-link"
                    onClick={() => setView("register")}
                  >
                    Create an account
                  </button>
                </div>
              </>
            )}
            {view === "register" && (
              <div>
                Already have an account?{" "}
                <button className="nav-link" onClick={() => setView("login")}>
                  Login
                </button>
              </div>
            )}
            {view === "forgot" && (
              <div>
                Remembered?{" "}
                <button className="nav-link" onClick={() => setView("login")}>
                  Back to login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
