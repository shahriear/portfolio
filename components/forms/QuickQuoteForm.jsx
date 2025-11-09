"use client";
import { useState } from "react";

export default function QuickQuoteForm() {
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setOk(false);
    setErr("");

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      product: String(fd.get("product") || ""),
      quantity: Number(fd.get("quantity") || 0),
      details: String(fd.get("details") || ""),
      hp: String(fd.get("hp") || ""), // honeypot
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed to send");
      setOk(true);
      e.currentTarget.reset();
    } catch (e) {
      setErr(e.message || "Something went wrong");
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input name="name" required className="mt-1 w-full rounded-lg border px-3 py-2" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input name="email" type="email" required className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone (optional)</label>
          <input name="phone" className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium">Product</label>
          <input name="product" required placeholder="T-shirt / Hoodie" className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Quantity</label>
          <input name="quantity" type="number" min={1} required className="mt-1 w-full rounded-lg border px-3 py-2" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Details</label>
        <textarea name="details" rows={5} required className="mt-1 w-full rounded-lg border px-3 py-2" />
      </div>

      {/* Honeypot (hidden) */}
      <input name="hp" className="hidden" tabIndex={-1} autoComplete="off" />

      <button
        type="submit"
        disabled={sending}
        className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 font-medium shadow-sm disabled:opacity-60"
      >
        {sending ? "Sending…" : "Request quote"}
      </button>

      {ok && (
        <div className="rounded-xl border bg-green-50 px-3 py-2 text-sm">
          ✅ Thanks! We’ll send the quote shortly.
        </div>
      )}
      {err && (
        <div className="rounded-xl border bg-red-50 px-3 py-2 text-sm text-red-700">
          ❌ {err}
        </div>
      )}
    </form>
  );
}
