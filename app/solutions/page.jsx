// app/solutions/page.jsx
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import DomainSearch from "@/components/DomainSearch";
import BundlesSection from "@/components/BundlesSection";

export const metadata = {
  title: "Solutions — Domains & Bundles",
  description:
    "Check your domain in seconds and pick a website/creative bundle that fits.",
};

export default function SolutionsPage() {
  return (
    <div className="container mt-24">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-2xl p-6 md:p-10 border border-black/5 dark:border-white/10">
        <div
          className="absolute -top-24 -left-24 h-72 w-72 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(closest-side, var(--brand2-hex), transparent)",
          }}
        />
        <div
          className="absolute -bottom-20 -right-24 h-72 w-72 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(closest-side, var(--brand-hex), transparent)",
          }}
        />

        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Solutions
        </h1>
        <p className="muted mt-2 max-w-2xl">
          Find a domain and choose a bundle—clear deliverables, modern stack,
          and fast turnaround.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="#domain"
            className="rounded-xl px-4 py-2 text-white shadow"
            style={{
              background:
                "linear-gradient(90deg, var(--brand-hex), var(--brand2-hex))",
            }}
          >
            Search domains
          </Link>
          <Link
            href="#bundles"
            className="nav-link rounded-xl border border-black/10 dark:border-white/10 px-4 py-2"
          >
            View bundles
          </Link>
        </div>
      </section>

      {/* DOMAIN */}
      <AnimatedSection>
        <DomainSearch
          id="domain"
          sectionTitle="Find your domain"
          sectionSubtitle="Check availability across popular TLDs in seconds."
        />
      </AnimatedSection>

      {/* BUNDLES */}
      <AnimatedSection>
        <BundlesSection
          id="bundles"
          sectionTitle="Website & creative bundles"
          sectionSubtitle="Pick one and contact directly — modern, clean and effective."
          contactHref="/contact?tab=inquiry"
        />
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection>
        <section className="mt-16 mb-20">
          <div className="card overflow-hidden">
            <div className="p-6 md:p-10 relative">
              <div
                className="absolute inset-0 opacity-[.06] pointer-events-none"
                style={{
                  background:
                    "radial-gradient(600px 300px at 20% 30%, var(--brand-hex), transparent), radial-gradient(600px 300px at 80% 70%, var(--brand2-hex), transparent)",
                }}
              />
              <h2 className="text-2xl md:text-3xl font-bold">
                Ready to move forward?
              </h2>
              <p className="muted mt-1">
                Book a quick call or send a short brief—I'll reply fast.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/contact?tab=book"
                  className="rounded-xl px-4 py-2 text-white shadow"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--brand-hex), var(--brand2-hex))",
                  }}
                >
                  Book a call
                </Link>
                <Link
                  href="/contact?tab=inquiry"
                  className="nav-link rounded-xl border border-black/10 dark:border-white/10 px-4 py-2"
                >
                  Send a brief
                </Link>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
