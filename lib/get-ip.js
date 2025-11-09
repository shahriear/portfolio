// lib/get-ip.js
export function getIP(req) {
  try {
    const xf = req.headers.get("x-forwarded-for");
    if (xf) return xf.split(",")[0].trim();
    const xr = req.headers.get("x-real-ip");
    if (xr) return xr.trim();
  } catch {}
  return "0.0.0.0";
}
