// lib/searchData.js

export const searchData = {
  services: [
    {
      title: "Full-stack Web Apps",
      href: "/solutions/fullstack",
      desc: "Next.js + Node.js apps with APIs & databases.",
      tags: ["nextjs", "node", "api", "react"],
    },
    {
      title: "Business Websites",
      href: "/solutions/website",
      desc: "SEO-friendly, responsive marketing sites.",
      tags: ["seo", "landing", "branding"],
    },
    {
      title: "E-commerce",
      href: "/solutions/ecommerce",
      desc: "Catalog, cart, payments.",
      tags: ["shop", "stripe", "cart"],
    },
    {
      title: "Performance & SEO",
      href: "/solutions/performance",
      desc: "Web Vitals, lighthouse.",
      tags: ["core-web-vitals", "lighthouse"],
    },
    {
      title: "Security",
      href: "/solutions/security",
      desc: "Auth, headers, XSS.",
      tags: ["auth", "headers", "xss"],
    },
  ],
  bundles: [
    {
      title: "Website bundle",
      href: "/bundles/website",
      desc: "Site, CMS, analytics, deployment.",
      tags: ["site", "cms", "sanity"],
    },
    {
      title: "Digital Marketing bundle",
      href: "/bundles/marketing",
      desc: "Ads, GA4, landing pages.",
      tags: ["ads", "ga4", "meta"],
    },
    {
      title: "Graphics & Branding bundle",
      href: "/bundles/branding",
      desc: "Logo, brand kit.",
      tags: ["logo", "brand", "design"],
    },
  ],
  pages: [
    {
      title: "Portfolio",
      href: "/portfolio",
      desc: "work • projects",
      tags: ["work", "projects"],
    },
    {
      title: "Garments",
      href: "/garments",
      desc: "apparel • order",
      tags: ["apparel", "order"],
    },
    {
      title: "Contact",
      href: "/contact",
      desc: "call • message",
      tags: ["call", "message"],
    },
    {
      title: "About",
      href: "/about",
      desc: "bio • profile",
      tags: ["bio", "profile"],
    },
  ],
};

export const SEARCH_INDEX = [
  ...(searchData.services || []).map((i) => ({ ...i, type: "service" })),
  ...(searchData.bundles || []).map((i) => ({ ...i, type: "bundle" })),
  ...(searchData.pages || []).map((i) => ({ ...i, type: "page" })),
];

export default searchData;
