export default function sitemap() {
  const b = process.env.NEXT_PUBLIC_SITE_URL || "https://tamimalhridoy.com";
  const pages = [
    "",
    "/about",
    "/resume",
    "/portfolio",
    "/packages",
    "/garments",
    "/order",
    "/contact",
    "/book",
  ];
  const now = new Date();
  return pages.map((p) => ({
    url: `${b}${p || "/"}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
}
