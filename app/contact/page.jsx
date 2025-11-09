import { Suspense } from "react";
import ContactClient from "./ContactClient";

export const metadata = {
  title: "Contact",
  description: "Get in touch — email form and quick links.",
};

// export const dynamic = "force-dynamic"; // prerender warning

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="container mt-24">
          <div className="card p-6">Loading…</div>
        </div>
      }
    >
      <ContactClient />
    </Suspense>
  );
}
