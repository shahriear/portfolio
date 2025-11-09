// lib/track.js
export function track(name, params = {}) {
  try {
    if (typeof window === "undefined") return;

    // GA4
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params);
    }

    // Meta Pixel
    if (typeof window.fbq === "function") {
      // generic
      window.fbq("trackCustom", name, params);

      // common aliases
      if (name === "contact_submit") window.fbq("track", "Contact", params);
      if (name === "quote_submit") window.fbq("track", "Lead", params);
    }

    // Dev fallback
    if (!window.gtag && !window.fbq) {
      // console.log("[track]", name, params);
    }
  } catch {
    /* no-op */
  }
}
