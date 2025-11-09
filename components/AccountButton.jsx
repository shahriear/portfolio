"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { User2 } from "lucide-react";

export default function AccountButton() {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const popRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setEmail(localStorage.getItem("userEmail") || "");
    }
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    function onDocClick(e) {
      if (!open) return;
      if (
        btnRef.current?.contains(e.target) ||
        popRef.current?.contains(e.target)
      )
        return;
      setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  function signOut() {
    try {
      localStorage.removeItem("userEmail");
    } catch {}
    setEmail("");
    setOpen(false);
    router.refresh();
  }

  // Logged out → icon = direct link to /signin
  if (!email) {
    return (
      <Link
        href="/signin"
        aria-label="Sign in"
        className="nav-link p-2 rounded-lg border border-black/10 dark:border-white/10"
      >
        <User2 size={16} />
      </Link>
    );
  }

  // Logged in → small dropdown
  return (
    <div className="relative">
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="nav-link p-2 rounded-lg border border-black/10 dark:border-white/10"
      >
        <User2 size={16} />
      </button>

      <div
        ref={popRef}
        role="menu"
        className={`absolute right-0 mt-2 min-w-[220px] rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-neutral-950 shadow-lg transition
        ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"}`}
      >
        <div className="p-3 border-b border-black/5 dark:border-white/10">
          <div className="text-sm opacity-70">Signed in as</div>
          <div className="text-sm font-medium truncate">{email}</div>
        </div>
        <div className="p-1">
          {/* <Link
            href="/profile"
            className="block px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link> */}
          <button
            onClick={signOut}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
