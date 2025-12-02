import AnimatedSection from "@/components/AnimatedSection";

const skills = [
  {
    group: 'Frontend',
    items: [
      { name: 'React/Next.js', level: 90 },
      { name: 'Javascript', level: 85 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Framer Motion', level: 80 },
      { name: 'Accessibility', level: 80 },
    ],
  },
  {
    group: 'Backend',
    items: [
      { name: 'Node.js/Express', level: 85 },
      { name: 'REST API', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'Redis', level: 60 },
    ],
  },
  {
    group: 'Tools',
    items: [
      { name: 'GitHub', level: 90 },
      { name: 'Postman', level: 60 },
      { name: 'Vercel/Netlify', level: 90 },
      { name: 'VS Code', level: 95 },
      { name: 'Figma handoff', level: 75 },
    ],
  },
  {
    group: 'Creative',
    items: [
      { name: 'UI/UX', level: 90 },
      { name: 'Branding', level: 85 },
      { name: 'Motion Editing', level: 70 },
      { name: 'Marketing (SEO/Ads)', level: 60 },
    ],
  },
];

//  social proof / impact strip
const impact = [
  { k: "Projects", v: "80+" },
  { k: "Clients", v: "65+" },
  { k: "On-time", v: "97%" },
];

export const metadata = {
  title: "About",
  description:
    "About Tamim Al Hridoy — full-stack developer with modern UI, APIs and creative skills.",
};

export default function Page() {
  return (
    <div className="container mt-24">
      {/* Heading */}
      <h1 className="text-3xl font-bold">About me</h1>
      <p className="muted mt-2 max-w-2xl">
        Full-stack developer working with Next.js, Node.js and modern design
        systems. I also design visual identities, run ads and edit motion
        content so your product looks great and reaches the right audience.
      </p>

      {/* Impact metrics */}
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        {impact.map((m) => (
          <span
            key={m.k}
            className="inline-flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/10 px-3 py-1.5"
          >
            <strong className="text-base">{m.v}</strong>
            <span className="opacity-70">{m.k}</span>
          </span>
        ))}
      </div>

      {/* Skills */}
      <AnimatedSection>
        <h2 className="mt-8 text-xl font-semibold">Skills at a glance</h2>
        <div className="grid md:grid-cols-2 gap-4 mt-3">
          {skills.map((g) => (
            <div key={g.group} className="card p-5">
              <h3 className="font-semibold">{g.group}</h3>

              <ul className="mt-3 space-y-3">
                {g.items.map((it) => (
                  <li key={it.name}>
                    <div className="flex justify-between text-sm">
                      <span className="muted">{it.name}</span>
                      <span className="muted">{it.level}%</span>
                    </div>

                    {/* Progress bar */}
                    <div
                      className="skill"
                      role="progressbar"
                      aria-label={`${it.name} proficiency`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={it.level}
                    >
                      <span
                        style={{ width: `${it.level}%` }}
                        className="block h-full rounded-full transition-[width] duration-700 will-change-[width]"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* CTA strip */}
      <div className="mt-10 card overflow-hidden">
        <div className="p-6 md:p-7 flex flex-wrap items-center justify-between gap-3 relative">
          <div
            className="pointer-events-none absolute inset-0 opacity-[.06]"
            style={{
              background:
                "radial-gradient(600px 300px at 20% 30%, var(--brand-hex), transparent), radial-gradient(600px 300px at 80% 70%, var(--brand2-hex), transparent)",
            }}
          />
          <div className="relative">
            <h3 className="text-lg font-semibold">Let’s work together</h3>
            <p className="muted text-sm">
              Book a quick call or grab my resume.
            </p>
          </div>

          <div className="relative flex gap-2">
            <a href="/contact?tab=book" className="btn">
              Book a 15-min call
            </a>
            {/* <a
              href="/Tamim-Al-Hridoy-Resume.pdf"
              className="btn-ghost rounded-xl border border-black/10 dark:border-white/10 px-4 py-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download resume
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
}
