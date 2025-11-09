export default function robots() {
  const b = process.env.NEXT_PUBLIC_SITE_URL || "https://tamimalhridoy.com";
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${b}/sitemap.xml`,
    host: b,
  };
}
