
# Client Handoff — Portfolio + Packages

This archive contains a Next.js 14 (App Router) — **JavaScript (no TypeScript)** project styled with Tailwind.
The **Packages** page has fully working sections:
- Website packages (Starter / Pro / Custom) with feature bullets and CTAs.
- "What's included" strip.
- Managed hosting with a Monthly ↔ Yearly toggle.
- Domains: domain availability check (DNS-based) + Popular TLDs list with pricing.
- Add-on services: Graphics & Branding, Digital Marketing, Motion & Video Editing.
- Custom package CTA.

## Commands
```bash
npm install
npm run dev   # http://localhost:3000
npm run build && npm start  # production
```

> Domain check route: `GET /api/domain-check?domain=example.com` (DNS-based).

If you need to change prices or copy, edit:
- `app/packages/PackagesClient.jsx` (arrays at the top)
- `app/packages/PopularTLDs.jsx` (TLD list & pricing)

Have a great launch!


## Notes (JS Conversion)
- The project was converted from TypeScript to **plain JavaScript**. All design and UI are unchanged.
- Path alias `@/*` is configured in `jsconfig.json`.
- Type-only imports, interfaces, and generics were removed (runtime-safe changes).
- If you see any lint warnings about types, they're safe to ignore or you can remove leftover comments.
