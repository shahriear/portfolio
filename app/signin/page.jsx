"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("userEmail");
      if (saved) router.replace("/");
    } catch {}
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    const value = email.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!valid) {
      setError("Please enter a valid email");
      return;
    }
    setSubmitting(true);
    try {
      localStorage.setItem("userEmail", value);
      setSuccess(true);
      setTimeout(() => router.replace("/"), 1000);
    } catch {
      setError("Could not complete sign in. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[oklch(var(--surface))] flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 mb-3"
        >
          <ArrowLeft size={16} /> Back Home
        </Link>

        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-black/10 dark:border-white/10">
          <div
            className="h-1.5"
            style={{
              background:
                "linear-gradient(90deg, var(--brand-hex), var(--brand2-hex))",
            }}
          />
          <div className="bg-white/80 dark:bg-neutral-950/70 backdrop-blur p-8">
            <h1 className="text-3xl font-extrabold tracking-tight">
              Welcome back
            </h1>
            <p className="opacity-70 mt-1">
              Sign in with your email. Super simple.
            </p>

            {!success ? (
              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <label className="block">
                  <span className="text-sm">Email address</span>
                  <div className="mt-1 flex items-center gap-2 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 px-3">
                    <Mail size={18} className="opacity-70" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="flex-1 bg-transparent py-3 outline-none"
                      required
                    />
                  </div>
                </label>

                {error ? <p className="text-red-600 text-sm">{error}</p> : null}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full rounded-2xl px-4 py-3 font-semibold shadow-md text-white"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--brand-hex), var(--brand2-hex))",
                  }}
                >
                  {submitting ? "Please wait…" : "Get sign-in link"}
                </button>

                <p className="text-xs opacity-70 text-center">
                  By continuing, you agree to our{" "}
                  <Link href="/legal/terms" className="underline">
                    Terms
                  </Link>{" "}
                  &{" "}
                  <Link href="/legal/privacy" className="underline">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            ) : (
              <div className="mt-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 p-6 flex items-center gap-3">
                <CheckCircle2 className="text-green-600" />
                <div>
                  <p className="font-medium">Login successful</p>
                  <p className="opacity-70 text-sm">Redirecting to homepage…</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
