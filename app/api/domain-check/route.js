export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';

const RDAP_BASE = 'https://rdap.org/domain/';
const isValidDomain = (s) => /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.(?:[A-Za-z]{2,63})$/.test(s);

async function checkOne(domain) {
  const d = (domain || '').trim().toLowerCase();
  if (!isValidDomain(d)) return { domain: d, available: false, message: 'Invalid domain format.' };
  try {
    const res = await fetch(`${RDAP_BASE}${encodeURIComponent(d)}`, { cache: 'no-store' });
    if (res.status === 404) return { domain: d, available: true, message: `${d} looks available.` };
    if (res.ok)         return { domain: d, available: false, message: `${d} is already registered.` };
    return { domain: d, available: false, message: 'Could not verify.' };
  } catch (e) {
    return { domain: d, available: false, message: e?.message || 'Unexpected error.' };
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const domain = (searchParams.get('domain') || '').trim().toLowerCase();
  if (!domain) return NextResponse.json({ available: false, message: 'Please provide a domain.' }, { status: 400 });
  const result = await checkOne(domain);
  return NextResponse.json(result, { status: 200, headers: { 'Cache-Control': 'no-store, must-revalidate' } });
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const domains = Array.isArray(body?.domains) ? body.domains : [];
    if (!domains.length) return NextResponse.json({ results: [] }, { status: 200 });
    const list = Array.from(new Set(domains.map((s) => (s || '').toLowerCase().trim()).filter(Boolean)));
    const results = await Promise.all(list.map(checkOne));
    return NextResponse.json({ results }, { status: 200, headers: { 'Cache-Control': 'no-store, must-revalidate' } });
  } catch (e) {
    return NextResponse.json({ results: [], error: e?.message || 'Unexpected error.' }, { status: 500 });
  }
}
