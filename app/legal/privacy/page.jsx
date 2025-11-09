// app/legal/privacy/page.jsx
import Link from "next/link";
import {
  ArrowLeft, Shield, Cookie, Globe2, ListTree, Lock, Clock
} from "lucide-react";

export const metadata = {
  title: "Privacy Policy",
  description:
    "What we collect, why we collect it, how we share it, how long we keep it, and your choices—clearly explained.",
  alternates: { canonical: "/legal/privacy" },
};

const Accent = () => (
  <div
    className="h-[3px] w-28 rounded-full"
    style={{ backgroundImage: "linear-gradient(90deg, var(--brand-hex), var(--brand2-hex))" }}
  />
);

const Hairline = () => (
  <div
    className="h-1.5 -mt-2 rounded-full"
    style={{ backgroundImage: "linear-gradient(90deg, var(--brand-hex), var(--brand2-hex))" }}
  />
);

const Section = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-24 space-y-3">
    <h2 className="text-xl font-semibold">{title}</h2>
    <div className="leading-relaxed space-y-3">{children}</div>
  </section>
);

export default function PrivacyPage() {
  const updated = "28 Oct 2025";

  const toc = [
    { id: "summary", label: "Key Points" },
    { id: "who", label: "Who We Are" },
    { id: "collect", label: "What We Collect" },
    { id: "use", label: "How We Use Data" },
    { id: "cookies", label: "Cookies & Tracking" },
    { id: "share", label: "Sharing & Processors" },
    { id: "xfer", label: "International Transfers" },
    { id: "ret", label: "Data Retention" },
    { id: "rights", label: "Your Rights" },
    { id: "security", label: "Security" },
    { id: "kids", label: "Children’s Privacy" },
    { id: "changes", label: "Changes" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="container mt-24">
      {/* Top */}
      <div className="flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-sm muted hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back Home
        </Link>
        <Link href="/legal/terms" className="text-sm underline">Terms of Service</Link>
      </div>

      {/* Header */}
      <header className="mt-6">
        <p className="inline-flex items-center gap-2 text-xs font-semibold px-2.5 py-1 rounded-full border border-black/10 dark:border-white/10">
          <Shield className="h-3.5 w-3.5" /> Privacy
        </p>
        <h1 className="mt-3 text-3xl md:text-4xl font-extrabold">Privacy Policy</h1>
        <p className="muted mt-2 max-w-2xl">
          A concise, transparent overview of what we collect, why, how we share it, and the choices
          available to you.
        </p>
        <div className="mt-4"><Accent /></div>
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
                  <a href={`#${t.id}`} className="underline underline-offset-2 hover:no-underline">
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-xl border border-black/10 dark:border-white/10 p-3 text-xs">
              Manage cookies in your browser. If a banner is enabled, update preferences anytime.
            </div>
          </nav>
        </aside>

        {/* Content */}
        <article className="card p-6 space-y-8">
          <Hairline />

          <Section id="summary" title="Key Points">
            <ul className="grid sm:grid-cols-2 gap-3">
              <li className="rounded-xl border border-black/10 dark:border-white/10 p-3">
                We collect basic contact/order details and technical analytics.
              </li>
              <li className="rounded-xl border border-black/10 dark:border-white/10 p-3">
                We use trusted processors; we do not sell personal data.
              </li>
              <li className="rounded-xl border border-black/10 dark:border-white/10 p-3">
                You can request access, correction, deletion, or withdraw consent (where applicable).
              </li>
              <li className="rounded-xl border border-black/10 dark:border-white/10 p-3">
                Security is important to us, but no system is 100% secure.
              </li>
            </ul>
          </Section>

          <Section id="who" title="1) Who We Are">
            <p><strong>Tamim Al Hridoy</strong> — web/marketing/branding services and small-batch garments.</p>
            <p>
              Contact:{" "}
              <Link href="mailto:contact@tamimalhridoy.com" className="underline">
                contact@tamimalhridoy.com
              </Link>
            </p>
          </Section>

          <Section id="collect" title="2) What We Collect">
            <ul className="list-disc pl-5 space-y-2">
              <li>Contact: name, email, reason/message, preferred call time.</li>
              <li>Quotes/Orders: product, quantity, fabric/sizing/notes.</li>
              <li>Technical: device/browser, IP (approx. location), page views, cookies.</li>
            </ul>
          </Section>

          <Section id="use" title="3) How We Use Data">
            <ul className="list-disc pl-5 space-y-2">
              <li>Respond to requests, deliver services, improve performance.</li>
              <li>Measure effectiveness; with consent, run ads/retargeting.</li>
            </ul>
          </Section>

          <Section id="cookies" title="4) Cookies & Tracking">
            <div className="rounded-xl border border-black/10 dark:border-white/10 p-3 text-sm flex items-start gap-2">
              <Cookie className="h-4.5 w-4.5 mt-0.5 opacity-80" />
              <p>
                You can block cookies in your browser. If a cookie banner is enabled, you can update your
                preferences there at any time.
              </p>
            </div>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Analytics: Google Analytics.</li>
              <li>Ads: Meta Pixel (if enabled).</li>
              <li>Forms/Email/Chat: Resend/Formspree, Crisp (optional).</li>
            </ul>
          </Section>

          <Section id="share" title="5) Sharing & Processors">
            <p>
              We may share data with trusted providers (hosting, email delivery, analytics, ads,
              payments, chat) as necessary to operate our services. We do not sell personal data.
            </p>
          </Section>

          <Section id="xfer" title="6) International Transfers">
            <div className="rounded-xl border border-black/10 dark:border-white/10 p-3 text-sm flex items-start gap-2">
              <Globe2 className="h-4.5 w-4.5 mt-0.5 opacity-80" />
              <p>
                Providers may process data outside your country. We aim to use lawful, industry-standard
                safeguards where applicable.
              </p>
            </div>
          </Section>

          <Section id="ret" title="7) Data Retention">
            <ul className="list-disc pl-5 space-y-2">
              <li>Forms/Emails: up to ~24 months (or longer if legally required).</li>
              <li>Analytics: per provider defaults.</li>
              <li>Orders/Finance: per tax and accounting laws.</li>
            </ul>
          </Section>

          <Section id="rights" title="8) Your Rights">
            <p>
              Access, correction, deletion, portability, objection/restriction, and withdrawal of
              consent (where applicable). Request via{" "}
              <Link href="mailto:contact@tamimalhridoy.com" className="underline">
                contact@tamimalhridoy.com
              </Link>.
            </p>
          </Section>

          <Section id="security" title="9) Security">
            <div className="rounded-xl border border-black/10 dark:border-white/10 p-3 text-sm flex items-start gap-2">
              <Lock className="h-4.5 w-4.5 mt-0.5 opacity-80" />
              <p>
                We use reasonable technical and organizational measures (e.g., HTTPS, access control).
                No system is completely secure.
              </p>
            </div>
          </Section>

          <Section id="kids" title="10) Children’s Privacy">
            <p>Our services are not directed to children under 13; we do not knowingly collect their data.</p>
          </Section>

          <Section id="changes" title="11) Changes">
            <p>We may update this policy over time. The latest version will always be available here.</p>
          </Section>

          <Section id="contact" title="12) Contact">
            <div className="rounded-xl border border-black/10 dark:border-white/10 p-3">
              Email:{" "}
              <Link href="mailto:contact@tamimalhridoy.com" className="underline">
                contact@tamimalhridoy.com
              </Link>
            </div>
          </Section>
        </article>
      </div>
    </div>
  );
}
