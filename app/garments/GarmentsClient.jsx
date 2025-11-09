// app/garments/GarmentsClient.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shirt,
  Ruler,
  BadgeCheck,
  Factory,
  ChevronRight,
  Send,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";

/* ------------------------ data ------------------------ */

const PRODUCTS = [
  { name: "T-Shirt", highlights: [
      "Premium/regular fit",
      "Fabric: Cotton | TC | Poly",
      "Print: Screen / DTF / DTG",
      "Branding embroidery on request",
      "Sizes: S—5XL (custom on request)",
    ], moq: 25, lead: "10–18 days" },
  { name: "Polo", highlights: [
      "Piqué/flat knit collar",
      "Fabric: Cotton | TC | Poly | Denim",
      "Embroidery/patch logo",
      "Two/three button placket",
      "Sizes: S—5XL (custom on request)",
    ], moq: 25, lead: "12–20 days" },
  { name: "Hoodie", highlights: [
      "Fleece / heavy cotton",
      "Print: Screen / DTF / DTG",
      "Kangaroo pocket / zipper",
      "Custom labels & trims",
      "Sizes: S—5XL (custom on request)",
    ], moq: 25, lead: "12–22 days" },
  { name: "Jacket", highlights: [
      "Windbreaker / bomber",
      "Fabric: Nylon / TC / Denim",
      "Print: Screen / DTF",
      "Padded or non-padded",
      "Sizes: S—5XL (custom on request)",
    ], moq: 25, lead: "15–28 days" },
  { name: "Pant", highlights: [
      "Twill/Denim/Chino",
      "Fabric: Cotton | TC | Poly | Denim",
      "Logo: Patch / Print",
      "Slim/regular fit",
      "Sizes: 28—42 (custom on request)",
    ], moq: 25, lead: "14–24 days" },
  { name: "Tracksuit", highlights: [
      "Poly knit / cotton blend",
      "Branding: Print / Embroidery",
      "Zipper pockets",
      "Top + bottom set",
      "Sizes: S—5XL (custom on request)",
    ], moq: 25, lead: "12–20 days" },
  { name: "Uniform", highlights: [
      "Corporate/School/Workwear",
      "Fabric: Cotton | TC | Poly | Denim",
      "Logo embroidery / patch",
      "Batch numbering & labels",
      "Sizes graded to size chart",
    ], moq: 25, lead: "10–20 days" },
  { name: "Cap / Beanie", highlights: [
      "Baseball / 5-panel / trucker / beanie",
      "Embroidery / patch / woven label",
      "Custom color & trims",
      "Adjustable closures",
      "One size (custom bulk sizing on req.)",
    ], moq: 50, lead: "10–16 days" },
  { name: "Apron", highlights: [
      "Kitchen / Barista / Workshop",
      "Canvas / Denim / TC fabrics",
      "Logo: Embroidery / Print / Patch",
      "Pockets & trims customizable",
      "Adjustable straps",
    ], moq: 25, lead: "10–18 days" },
];

/* ------------------------ ui helpers ------------------------ */

const fade = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
const list = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

/* ------------------------ api helper ------------------------ */

async function sendQuote(payload) {
  const res = await fetch("/api/quote", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!res.ok || !json.ok) throw new Error(json.error || "Failed");
}

/* ------------------------ card ------------------------ */

function ProductCard({ item, onPick }) {
  const contactHref = `/contact?product=${encodeURIComponent(item.name)}`;

  return (
    <motion.article
      variants={fade}
      className="group relative rounded-2xl border border-black/10 bg-[oklch(var(--surface))] p-4 shadow-sm transition hover:shadow-md dark:border-white/10"
    >
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
          <Shirt className="h-5 w-5 opacity-90" />
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-semibold">{item.name}</h3>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs opacity-70">
            <span className="inline-flex items-center gap-1 rounded-md border border-black/10 px-2 py-0.5 dark:border-white/10">
              <Factory className="h-3.5 w-3.5" /> MOQ {item.moq}
            </span>
            <span className="inline-flex items-center gap-1 rounded-md border border-black/10 px-2 py-0.5 dark:border-white/10">
              <Ruler className="h-3.5 w-3.5" /> Lead {item.lead}
            </span>
          </div>
        </div>
      </div>

      <ul className="mt-3 space-y-1.5 text-sm">
        {item.highlights.map((t, i) => (
          <li key={i} className="flex items-start gap-2">
            <BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-500 dark:text-emerald-400" />
            <span className="leading-relaxed">{t}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={() => onPick(item.name)}
          className="inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm text-white shadow transition hover:shadow-md"
          style={{ background: "linear-gradient(90deg, var(--brand-hex), var(--brand2-hex))" }}
        >
          Request quote <ChevronRight className="h-4 w-4" />
        </button>

        <Link
          href={contactHref}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 px-3 py-2 text-sm transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
        >
          Contact <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}

/* ------------------------ quote form ------------------------ */

function QuoteForm({ picked }) {
  const { push } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    product: picked || "",
    fabric: "",
    quantity: "",
    sizes: "",
    notes: "",
  });
  const [sending, setSending] = useState(false);

  // picked → product sync (hooks-safe)
  useEffect(() => {
    if (picked) setForm((s) => ({ ...s, product: picked }));
  }, [picked]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);

    // details alws fixend (server min-length safe)
    const details =
      `Fabric: ${form.fabric || "-"}\n` +
      `Sizes: ${form.sizes || "-"}\n` +
      `Notes:\n${form.notes || "-"}`;

    const payload = {
      name: form.name,
      email: form.email,
      phone: "",
      product: form.product,
      quantity: Number(form.quantity || 0),
      details,
      hp: "",
    };

    try {
      await sendQuote(payload);
      push({ title: "Quote request sent ✅", desc: "We’ll reply shortly." });
      setForm({
        name: "",
        email: "",
        product: "",
        fabric: "",
        quantity: "",
        sizes: "",
        notes: "",
      });
    } catch (e) {
      push({
        title: "Couldn’t send your request",
        desc: e.message || "Please try again.",
        variant: "error",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <motion.div
      variants={fade}
      className="rounded-2xl border border-black/10 bg-[oklch(var(--surface))] p-4 shadow-sm dark:border-white/10"
    >
      <h3 className="text-base font-semibold">Quick quote</h3>

      <form onSubmit={handleSubmit} className="mt-3 grid gap-3 md:grid-cols-2">
        <input
          className="input"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
          required
        />
        <input
          className="input"
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          required
        />
        <select
          className="input"
          name="product"
          value={form.product}
          onChange={(e) => setForm((s) => ({ ...s, product: e.target.value }))}
          required
        >
          <option value="">Select product</option>
          {PRODUCTS.map((p) => (
            <option key={p.name} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
        <input
          className="input"
          name="fabric"
          placeholder="Fabric (e.g., 180 GSM Cotton)"
          value={form.fabric}
          onChange={(e) => setForm((s) => ({ ...s, fabric: e.target.value }))}
        />
        <input
          className="input"
          name="quantity"
          placeholder="Quantity (MOQ 25)"
          type="number"
          min={1}
          value={form.quantity}
          onChange={(e) => setForm((s) => ({ ...s, quantity: e.target.value }))}
          required
        />
        <input
          className="input"
          name="sizes"
          placeholder="Sizes breakdown (e.g., S-10, M-30, L-15 …)"
          value={form.sizes}
          onChange={(e) => setForm((s) => ({ ...s, sizes: e.target.value }))}
        />
        <textarea
          className="input md:col-span-2 min-h-[96px]"
          name="notes"
          placeholder="Notes (printing position, embroidery, packing, deadlines…)"
          value={form.notes}
          onChange={(e) => setForm((s) => ({ ...s, notes: e.target.value }))}
        />

        {/* honeypot (hidden) */}
        <input name="hp" className="hidden" tabIndex={-1} autoComplete="off" />

        <div className="md:col-span-2 mt-1 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs opacity-70">
            MOQ applies. Lead-time depends on complexity & stock.
          </p>
          <div className="flex items-center gap-2">
            <Link
              href={`/contact?product=${encodeURIComponent(form.product || "")}`}
              className="rounded-xl border border-black/10 px-4 py-2 text-sm transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
            >
              Contact instead
            </Link>

            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-white shadow transition hover:shadow-md disabled:opacity-60"
              style={{ background: "linear-gradient(90deg, var(--brand-hex), var(--brand2-hex))" }}
            >
              <Send className="h-4 w-4" />
              {sending ? "Sending…" : "Send request"}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
}

/* ------------------------ page ------------------------ */

export default function GarmentsClient() {
  const [picked, setPicked] = useState("");

  // Request quote → product set + smooth-scroll to form
  function handlePick(name) {
    setPicked(name);
    const el = document.getElementById("quote");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="container mt-24">
      {/* hero */}
      <motion.header variants={fade} initial="hidden" animate="show" className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1 text-sm dark:border-white/10">
          <Shirt className="h-4 w-4" />
          <span className="opacity-80">Order-based production</span>
        </div>
        <h1 className="mt-2 text-3xl font-extrabold leading-tight">
          Garments <span className="opacity-60">— small-batch manufacturing</span>
        </h1>
        <p className="muted mt-2 max-w-2xl">
          MOQ <strong>25 pcs</strong>. Custom labels/tags, packaging & logistics arranged.
          Send spec or pick a product to request a quote.
        </p>
      </motion.header>

      {/* badges */}
      <motion.ul
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3"
      >
        {[
          ["Fabric: Cotton / TC / Poly / Denim", <Ruler key="r" />],
          ["Print: Screen / DTF / DTG", <BadgeCheck key="b" />],
          ["Branding: Embroidery / Patch / Label", <Factory key="f" />],
        ].map(([txt, icon], i) => (
          <motion.li
            key={i}
            variants={fade}
            className="flex items-center gap-2 rounded-xl border border-black/10 bg-[oklch(var(--surface))] px-3 py-2 text-sm dark:border-white/10"
          >
            <span className="opacity-80">{icon}</span>
            <span className="truncate">{txt}</span>
          </motion.li>
        ))}
      </motion.ul>

      {/* grid */}
      <motion.section
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {PRODUCTS.map((p) => (
          <ProductCard key={p.name} item={p} onPick={handlePick} />
        ))}
      </motion.section>

      {/* form */}
      <div id="quote" className="mt-6">
        <QuoteForm picked={picked} />
      </div>
    </div>
  );
}
