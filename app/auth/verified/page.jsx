export const dynamic = "force-dynamic";
export const revalidate = 0;

import VerifiedClient from "./verified-client";

export default function VerifiedPage({ searchParams }) {
  const email = typeof searchParams?.email === "string" ? searchParams.email : "";
  return <VerifiedClient email={email} />;
}
