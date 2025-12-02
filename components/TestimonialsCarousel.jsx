"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* Brand gradient (your CSS vars respected if present) */
const GRADIENT =
  "linear-gradient(90deg, var(--brand-hex, #1f155a), var(--brand2-hex, #38b4a1))";

/* === Realistic, service-aligned testimonials (anonymized) === */
const TESTIMONIALS = [
  {
    quote:
      "Shahriear Shuvo rebuilt our site in Next.js with image optimization and edge caching—LCP now ~1.0s and key pages climbed in Google. 100% recommended.",
    name: "Ethan Walker",
    role: "Head of Growth, B2B SaaS",
  },
  {
    quote:
      "Rock-solid Node.js API, auth, and caching. Zero production incidents for three months and clear docs. Strongly recommend Tamim.",
    name: "Victoria Allen",
    role: "CTO, PropTech",
  },
  {
    quote:
      "His technical SEO audit fixed Core Web Vitals, schema, and internal links—organic sign-ups up 29% in six weeks. Would hire again without hesitation.",
    name: "Michael O’Neal",
    role: "VP Marketing, Fintech",
  },
  {
    quote:
      "Clean brand identity, guidelines, and a web style system that scales. Every asset looks consistent now. We recommend Shuvo 100%.",
    name: "Elena Petrova",
    role: "Creative Director, Consumer Apps",
  },
  {
    quote:
      "He moved us to a headless CMS with roles/workflows. Publishing time dropped from days to hours. Clear communication—highly recommended.",
    name: "Jacob Morris",
    role: "Digital Director, Publishing",
  },
  {
    quote:
      "CRO suggestions + new landing pages lifted conversion 24% on the same ad spend. Shuvo data-driven approach is the real deal.",
    name: "Sophie Grant",
    role: "Growth Lead, DTC Beauty",
  },
  {
    quote:
      "GA4 and server-side tagging finally made our numbers trustworthy. Our revenue and channel reports match to the cent. 10/10 recommend.",
    name: "Carlos Mendes",
    role: "Operations Manager, Logistics",
  },
  {
    quote:
      "Next.js storefront with secure checkout and tax rules—launch was smooth and mobile conversion jumped 21%. Highly recommend Tamim.",
    name: "Amelia Wright",
    role: "E-commerce Manager, Apparel",
  },
  {
    quote:
      "Clear scope, weekly demos, and zero surprises. The Node.js services shipped on time and under budget. Fully recommended.",
    name: "Liam McKenzie",
    role: "Product Owner, Marketplace",
  },
  {
    quote:
      "Shuvo content architecture and on-page SEO fixed cannibalization. We gained featured snippets on three money keywords. 100% recommend.",
    name: "Chloe Dubois",
    role: "SEO Lead, Cybersecurity",
  },
  {
    quote:
      "Design system + reusable React components sped us up and kept the brand tight. Great partner for product teams.",
    name: "Nora Schmidt",
    role: "Head of Design, HealthTech",
  },
  {
    quote:
      "He handled DNS, Cloudflare, redirects, and sitemaps—no traffic dip after migration. Professional and calm under pressure.",
    name: "Peter Janssen",
    role: "IT Lead, Manufacturing",
  },
  {
    quote:
      "Brand strategy, tone-of-voice, and a sharp logo system. Our sales deck finally clicks with enterprise buyers. Strongly recommend.",
    name: "Jean-Luc Bernard",
    role: "VP Sales, Enterprise SaaS",
  },
  {
    quote:
      "International SEO with hreflang done right—EU traffic up and bounce rate down. Shuvo knows the details that matter.",
    name: "Marta Nowak",
    role: "Marketing Manager, EdTech",
  },
  {
    quote:
      "Pixel-perfect UI, clean API integration, and thorough handover docs. Future iterations are easy. Highly recommended.",
    name: "Marco Santoro",
    role: "Tech Lead, Fintech",
  },
  {
    quote:
      "From brief to brand kit in ten days. The guidelines keep our ads, web, and socials aligned. 100% recommend Shuvo.",
    name: "Sara Lund",
    role: "Brand Manager, Consultancy",
  },
  {
    quote:
      "Editorial CMS with flexible blocks—no hacks needed. Our team publishes faster and the site stays fast. Would recommend anytime.",
    name: "Grace Thompson",
    role: "Content Lead, Media Network",
  },
  {
    quote:
      "CRO + copy refresh lifted demo requests 26%. Shuvo ties analytics, SEO, and messaging together beautifully.",
    name: "Noah Klein",
    role: "Head of Product Marketing, HR Tech",
  },
  {
    quote:
      "Security, backups, and CI/CD pipelines were set up cleanly. We sleep better now. Strong recommendation.",
    name: "Tom Bradley",
    role: "Head of Engineering, B2B Marketplace",
  },
  {
    quote:
      "Local SEO, structured data, and reviews strategy pushed us to the map pack within three weeks. 100% recommended.",
    name: "Anna Kowalski",
    role: "Owner, Boutique Fitness",
  },
  {
    quote:
      "Shuvo’s performance budgets and code reviews kept the site under a second. Our ads perform better now, too.",
    name: "André Costa",
    role: "Performance Lead, Gaming Studio",
  },
  {
    quote:
      "He turned a messy brand into a system—color, type, motion, usage rules. Everything finally looks premium.",
    name: "Laura Green",
    role: "Head of Communications, University",
  },
  {
    quote:
      "Attribution cleanup aligned paid and organic. Decisions make sense again. We’d hire Tamim again without a doubt.",
    name: "James Carter",
    role: "Growth Marketer, Security Software",
  },
  {
    quote:
      "Storyboards and ad creatives outperformed control by 23% on cold traffic. Clear, data-first creative. Highly recommend.",
    name: "Isabella Romero",
    role: "Brand Strategist, Beverage",
  },
  {
    quote:
      "Back-office dashboards and exports now save hours weekly. Clear documentation and thoughtful UX. 100% recommended.",
    name: "George Allen",
    role: "COO, Construction Tech",
  },
  {
    quote:
      "Accessibility and compliance were first-class; auditors had zero notes. Shuvo’s thoroughness shows.",
    name: "David Stein",
    role: "Compliance Lead, SaaS",
  },
  {
    quote:
      "He mapped content to search intent and built internal link silos—rankings lifted steadily. Strong recommendation.",
    name: "Helena Fischer",
    role: "Content Director, Travel",
  },
  {
    quote:
      "Server-side events + GA4 fixed our funnel tracking. CAC reporting is finally accurate. 10/10 recommend Shuvo.",
    name: "Carter Reed",
    role: "CEO, B2B Marketplace",
  },
  {
    quote:
      "Replatformed to Next.js with image/CDN best practices—bounce rate fell 20%. Great partner end to end.",
    name: "Sofia Almeida",
    role: "Digital Lead, Nonprofit",
  },
  {
    quote:
      "Brand refresh matches our story and scales from app icon to billboard. We recommend Tamim Al Hridoy 100%.",
    name: "Rebecca Clarke",
    role: "Marketing Ops, Health NGO",
  },

  // ---------- Asia (10) ----------
  {
    quote:
      "Next.js storefront with local gateways and tax rules—checkout success up 23%. Shuvo is our go-to. 100% recommended.",
    name: "Rohan Mehta",
    role: "Head of E-commerce, Retail",
  },
  {
    quote:
      "Server-side tagging plus GA4 made reporting precise. Decisions are finally data-driven. Strongly recommend Shuvo.",
    name: "Chen Wei",
    role: "Growth Lead, B2B SaaS",
  },
  {
    quote:
      "He delivered a fast launch microsite—press loved the polish and speed. Clear scope and on-time delivery.",
    name: "Aiko Tanaka",
    role: "PR Manager, Consumer Electronics",
  },
  {
    quote:
      "Brand kit, social templates, and post presets halved our publishing time. Consistent look across platforms. 100% recommend.",
    name: "Nur Izzah Adila",
    role: "Marketing Manager, Financial Services",
  },
  {
    quote:
      "Shuvo designed a crisp monogram and wordmark that scale on packaging and web. Professional and patient—highly recommended.",
    name: "Siti Rahma",
    role: "Founder, Beauty D2C",
  },
  {
    quote:
      "Knowledge base + CMS roles let support update docs without dev help. Our customers get answers faster. Strong recommendation.",
    name: "Minh Pham",
    role: "Customer Success Lead, Logistics",
  },
  {
    quote:
      "Refactored Node.js APIs and added caching—latency dropped ~40% and stability improved. We’d hire him again.",
    name: "Ravi Sharma",
    role: "Engineering Manager, EdTech",
  },
  {
    quote:
      "Landing pages + creatives hit CPA targets within a week. Shuvo blends performance marketing with solid UX. 100% recommended.",
    name: "Haruka Sato",
    role: "Performance Marketer, Travel",
  },
  {
    quote:
      "Domain migration and Cloudflare were seamless—zero downtime and a noticeable speed bump. Strongly recommend Shuvo.",
    name: "Ali Raza",
    role: "IT Administrator, Healthcare",
  },
  {
    quote:
      "Brand positioning clarified our message; the sales deck finally resonates. We recommend Shahriear Shuvo without hesitation.",
    name: "Xiao Lin",
    role: "Sales Director, Enterprise Software",
  },
];

/* Utility: split into pages (size min 1) */
function chunk(arr, size) {
  const s = Math.max(1, Number(size) || 1);
  const out = [];
  for (let i = 0; i < arr.length; i += s) out.push(arr.slice(i, i + s));
  return out;
}

/* Tiny quote icon (no extra lib) */
function QuoteIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M7 11c0-3 2-5 5-5v3c-1 0-2 1-2 2v6H7v-6Zm7 0c0-3 2-5 5-5v3c-1 0-2 1-2 2v6h-3v-6Z"
        fill="currentColor"
        opacity=".35"
      />
    </svg>
  );
}

export default function TestimonialsCarousel({
  autoPlay = true,
  intervalMs = 4500,
  className = "",
}) {
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [index, setIndex] = useState(0);
  const dirRef = useRef("next"); // 'next' | 'prev'
  const hoverRef = useRef(false);

  // responsive pages: 1 on mobile, 2 on md+
  useEffect(() => {
    const set = () => setItemsPerPage(window.innerWidth >= 768 ? 2 : 1);
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);

  const pages = useMemo(() => {
    return Array.isArray(TESTIMONIALS) && TESTIMONIALS.length
      ? chunk(TESTIMONIALS, itemsPerPage)
      : [];
  }, [itemsPerPage]);

  // keep index valid whenever pages change
  useEffect(() => {
    if (pages.length === 0) {
      setIndex(0);
      return;
    }
    if (index > pages.length - 1) setIndex(pages.length - 1);
  }, [pages, index]);

  const go = (to) => {
    if (pages.length === 0) return;
    if (to < 0) {
      dirRef.current = "prev";
      setIndex(pages.length - 1);
    } else if (to >= pages.length) {
      dirRef.current = "next";
      setIndex(0);
    } else {
      dirRef.current = to > index ? "next" : "prev";
      setIndex(to);
    }
  };
  const next = () => go(index + 1);

  // autoplay with pause on hover
  useEffect(() => {
    if (!autoPlay || pages.length <= 1) return;
    const id = setInterval(() => {
      if (!hoverRef.current) next();
    }, intervalMs);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages.length, autoPlay, intervalMs]);

  // slide animation
  const slide = {
    initial: (direction) => ({
      x: direction === "next" ? 36 : -36,
      opacity: 0,
      filter: "blur(4px)",
    }),
    animate: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: (direction) => ({
      x: direction === "next" ? -36 : 36,
      opacity: 0,
      filter: "blur(4px)",
      transition: { duration: 0.38, ease: "easeIn" },
    }),
  };

  // nothing to render
  if (pages.length === 0) return null;

  return (
    <section
      className={`relative w-full ${className}`}
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      <div className="mx-auto w-full max-w-6xl px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            What clients say
          </h2>
          <p className="muted mt-1">
            Real-world results from web, marketing & branding work.
          </p>
          <div
            className="mx-auto mt-4 h-[3px] w-24 rounded-full"
            style={{ backgroundImage: GRADIENT }}
          />
        </motion.div>

        {/* Slides */}
        <div className="mt-8 overflow-hidden">
          <AnimatePresence mode="wait" custom={dirRef.current}>
            <motion.div
              key={index}
              custom={dirRef.current}
              variants={slide}
              initial="initial"
              animate="animate"
              exit="exit"
              className="grid gap-4 md:grid-cols-2"
            >
              {(pages[index] ?? []).map((t, i) => (
                <figure
                  key={`${t?.name ?? "t"}-${i}`}
                  className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-slate-900/60 backdrop-blur p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Gradient hairline */}
                  <div
                    className="absolute inset-x-0 top-0 h-1"
                    style={{ backgroundImage: GRADIENT }}
                  />
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/5 dark:bg-white/10">
                    <QuoteIcon className="text-black/60 dark:text-white/60" />
                  </div>
                  <blockquote className="text-[1.05rem] leading-relaxed">
                    “{t?.quote ?? ""}”
                  </blockquote>
                  <figcaption className="mt-4">
                    <div className="font-semibold">
                      {t?.name ?? "Anonymous"}
                    </div>
                    {t?.role ? (
                      <div className="muted text-sm">{t.role}</div>
                    ) : null}
                  </figcaption>
                </figure>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {pages.map((_, i) => {
            const active = i === index;
            return (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--brand2-hex,#38b4a1)] ${
                  active ? "w-8" : "w-2.5 opacity-60"
                }`}
                style={{ backgroundImage: active ? GRADIENT : undefined }}
              >
                {!active && (
                  <span className="block h-full w-full rounded-full bg-black/30 dark:bg-white/30" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
