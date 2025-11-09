"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VerifiedClient({ email = "" }) {
  const router = useRouter();

  useEffect(() => {
    if (email) {
      try { localStorage.setItem("userEmail", email); } catch {}
    }
    const t = setTimeout(() => router.replace("/"), 1200);
    return () => clearTimeout(t);
  }, [email, router]);

  return (
    <main className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="rounded-2xl border border-black/10 dark:border-white/10 p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-2">Sign-in successful 🎉</h1>
        <p>Taking you to the homepage…</p>
      </div>
    </main>
  );
}
