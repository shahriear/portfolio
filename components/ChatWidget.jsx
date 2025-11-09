"use client";
import { useEffect } from "react";
export default function ChatWidget() {
  const websiteId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;
  useEffect(() => {
    if (!websiteId) return;
    (function () {
      window.$crisp = [];
      window.CRISP_WEBSITE_ID = websiteId;
      const d = document;
      const s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = true;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();
  }, [websiteId]);
  return null;
}
