// app/legal/terms/page.jsx
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Scale,
  ShieldCheck,
  ListTree,
  AlertTriangle,
  Clock,
  BadgeCheck,
} from "lucide-react";

export const metadata = {
  title: "Terms of Service",
  description:
    "Plain-English terms for web, marketing, branding, and small-batch garments—clear scope, IP, payments, and responsibilities.",
  alternates: { canonical: "/legal/terms" },
};

const Accent = () => (
  <div
    className="h-[3px] w-28 rounded-full"
    style={{
      backgroundImage:
        "linear-gradient(90deg, var(--brand-hex), var(--brand2-hex))",
    }}
  />
);

const Hairline = () => (
  <div
    className="h-1.5 -mt-2 rounded-full"
    style={{
      backgroundImage:
        "linear-gradient(90deg, var(--brand-hex), var(--brand2-hex))",
    }}
  />
);

const Section = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-24 space-y-3">
    <h2 className="text-xl font-semibold">{title}</h2>
    <div className="leading-relaxed space-y-3">{children}</div>
  </section>
);

export default function TermsPage() {
  const updated = "28 Oct 2025";

  const toc = [
    { id: "summary", label: "Key Takeaways" },
    { id: "intro", label: "Introduction & Agreement" },
    { id: "scope", label: "Scope of Services" },
    { id: "client", label: "Client Responsibilities" },
    { id: "process", label: "Process, Timeline & Delivery" },
    { id: "revisions", label: "Revisions & Scope Changes" },
    { id: "fees", label: "Fees, Expenses & Taxes" },
    { id: "ip", label: "Intellectual Property" },
    { id: "conf", label: "Confidentiality & Publicity" },
    { id: "third", label: "Third-Party Services" },
    { id: "garments", label: "Garments—Special Terms" },
    { id: "liability", label: "Limitation of Liability" },
    { id: "force", label: "Force Majeure" },
    { id: "termination", label: "Termination" },
    { id: "law", label: "Governing Law" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="container mt-24">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm muted hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back Home
        </Link>
        <Link href="/legal/privacy" className="text-sm underline">
          Privacy Policy
        </Link>
      </div>

      {/* Header */}
      <header className="mt-6">
        <p className="inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-full border border-black/10 dark:border-white/10">
          <FileText className="h-3.5 w-3.5" /> Legal
        </p>
        <h1 className="mt-3 text-3xl md:text-4xl font-extrabold">
          Terms of Service
        </h1>
        <p className="muted mt-2 max-w-2xl">
          Professional, plain-English terms for software/web, digital marketing,
          brand design, and small-batch garments.
        </p>
        <div className="mt-4">
          <Accent />
        </div>
        <p className="muted mt-3 text-sm flex items-center gap-2">
          <Clock className="h-3.5 w-3.5" /> Last updated: {updated}
        </p>
      </header>

      <div className="grid mt-6 gap-6 md:grid-cols-[280px,1fr]">
        {/* TOC */}
        <aside className="md:sticky md:top-24 h-max">
          <nav className="card p-4" aria-label="Table of contents">
            <p className="text-sm font-semibold flex items-center gap-2">
              <ListTree className="h-4 w-4" /> On this page
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {toc.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className="underline underline-offset-2 hover:no-underline"
                  >
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-xl border border-emerald-400/40 p-3 text-xs">
              <p className="font-medium flex items-center gap-2">
                <BadgeCheck className="h-3.5 w-3.5" /> Tip
              </p>
              <p className="mt-1">
                Want a signed NDA or custom clause?{" "}
                <span className="underline">Ask before kick-off.</span>
              </p>
            </div>
          </nav>
        </aside>

        {/* Content */}
        <article className="card p-6 space-y-8">
          <Hairline />

          <Section id="summary" title="Key Takeaways">
            <ul className="grid sm:grid-cols-2 gap-3">
              <li className="rounded-xl border border-black/10 dark:border-white/10 p-3">
                <strong>Scope is written.</strong> Deliverables, timeline, and
                fees are confirmed by email/proposal.
              </li>
              <li className="rounded-xl border border-black/10 dark:border-white/10 p-3">
                <strong>Two–three revisions.</strong> Extra work or pivots are
                re-quoted and re-scheduled.
              </li>
              <li className="rounded-xl border border-black/10 dark:border-white/10 p-3">
                <strong>IP transfers on payment.</strong> We keep our general
                tools and portfolio rights.
              </li>
              <li className="rounded-xl border border-black/10 dark:border-white/10 p-3">
                <strong>Garments have tolerances.</strong> Color ±5%,
                sizing/production ±2–3% is standard.
              </li>
            </ul>
          </Section>

          <Section id="intro" title="1) Introduction & Agreement">
            <p>
              “We/Us” means <strong>Tamim Al Hridoy</strong> and our team;
              “You/Client” means the party engaging our services. By ordering or
              using our site, you agree to these Terms.
            </p>
          </Section>

          <Section id="scope" title="2) Scope of Services">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Web/app: React/Next.js/Node, APIs, CMS, deployment, monitoring.
              </li>
              <li>
                Digital marketing: strategy, pixels/events, ads, reporting &
                optimization.
              </li>
              <li>Branding/graphics: identity, kits, print/digital assets.</li>
              <li>
                Garments: tees, polos, hoodies, jackets, uniforms, caps, aprons
                (small-batch).
              </li>
              <li>
                Exact scope/fees/timing are set in writing (email/proposal).
              </li>
            </ul>
          </Section>

          <Section id="client" title="3) Client Responsibilities">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Provide timely content, feedback, and access (DNS/hosting,
                repos, ad accounts, etc.).
              </li>
              <li>You warrant rights to all content/assets supplied to us.</li>
            </ul>
          </Section>

          <Section id="process" title="4) Process, Timeline & Delivery">
            <p>Typical flow: Discovery → Design → Build → QA → Handover.</p>
            <p>
              Work starts after agreed advance and required inputs. Delivery via
              staging/repo; written acceptance or silence after 7 business days
              counts as accepted.
            </p>
          </Section>

          <Section id="revisions" title="5) Revisions & Scope Changes">
            <p>
              Packages include two–three reasonable revision rounds.
              Out-of-scope work or pivots are re-quoted and may affect timing.
            </p>
          </Section>

          <Section id="fees" title="6) Fees, Expenses & Taxes">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Standard billing: 50% advance, balance before final handover.
              </li>
              <li>
                Client covers domain/hosting/ad spend/printing/shipping unless
                stated otherwise.
              </li>
              <li>
                Late payments may incur a reasonable late fee and pause of work.
              </li>
            </ul>
          </Section>

          <Section id="ip" title="7) Intellectual Property">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Upon full payment, you receive a commercial license to the final
                deliverables.
              </li>
              <li>
                We retain rights to general components, starter code, internal
                tools, and portfolio use of non-confidential visuals/logos
                unless you object in writing.
              </li>
            </ul>
          </Section>

          <Section id="conf" title="8) Confidentiality & Publicity">
            <p>
              Both parties protect each other’s confidential information. We may
              display credited, non-confidential work in our portfolio unless
              you instruct otherwise in writing.
            </p>
          </Section>

          <Section id="third" title="9) Third-Party Services">
            <p>
              We rely on reputable providers (hosting, email delivery,
              analytics, ads, payments, chat). Their own terms and privacy
              policies apply.
            </p>
          </Section>

          <Section id="garments" title="10) Garments—Special Terms">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                MOQs apply; lead time depends on fabric/branding and stock.
              </li>
              <li>Industry tolerances: color ±5%, sizing/production ±2–3%.</li>
              <li>
                Post-approval changes (sample/size chart) may require extra
                time/cost.
              </li>
            </ul>
          </Section>

          <Section id="liability" title="11) Limitation of Liability">
            <p>
              To the maximum extent permitted by law, our aggregate liability is
              capped at the fees you paid for the relevant project.
            </p>
          </Section>

          <Section id="force" title="12) Force Majeure">
            <p>
              We’re not liable for delays caused by events beyond reasonable
              control (e.g., disasters, war, widespread outages).
            </p>
          </Section>

          <Section id="termination" title="13) Termination">
            <p>
              Either party may terminate in writing. Completed work and
              non-cancelable costs up to the termination date remain payable.
            </p>
          </Section>

          <Section id="law" title="14) Governing Law">
            <p>
              These Terms are governed by international commercial principles
              and resolved through mutual discussion or neutral arbitration as
              agreed by both parties.
            </p>
          </Section>

          <Section id="contact" title="15) Contact">
            <div className="rounded-xl border border-black/10 dark:border-white/10 p-3">
              Email:{" "}
              <Link
                href="mailto:contact@tamimalhridoy.com"
                className="underline"
              >
                contact@tamimalhridoy.com
              </Link>
            </div>
            <div className="mt-3 rounded-xl border border-amber-400/50 p-3 text-sm flex items-start gap-2">
              <AlertTriangle className="h-4.5 w-4.5 mt-0.5" />
              <p>
                This page gives general terms, not legal advice. Ask a lawyer
                for your specific situation.
              </p>
            </div>
          </Section>
        </article>
      </div>
    </div>
  );
}
