// app/api/domain/check/route.js
import { NextResponse } from 'next/server';

const DOMAINR_STATUS = 'https://api.domainr.com/v2/status';
const DEFAULT_TLDS = [
  // common + tech
  'com','net','org','co','io','dev','app','xyz','ai','tech','shop','store','online',
  'me','info','site','blog','cloud','design','digital','studio','art','media',
  // a few country examples (প্রয়োজনে বাড়াতে পারবেন)
  'bd','in','uk','us','ca','de','nl','au','sg','jp','fr','it','es','se','no','dk','fi'
];

// --- utils ---
const chunk = (arr, n=50) => {
  const out=[]; for(let i=0;i<arr.length;i+=n) out.push(arr.slice(i,i+n)); return out;
};
const mapStatus = (raw) => {
  const s = (raw || '').toLowerCase();
  const isTaken = /active|premium|marketed|reserved|transferable/.test(s);
  const isAvail = /inactive|undelegated/.test(s);
  if (isTaken)   return { state: 'taken',     summary: s.includes('premium') ? 'Taken (premium/marketplace)' : 'Already registered' };
  if (isAvail)   return { state: 'available', summary: 'Available to register' };
  return { state: 'unknown', summary: 'Status unclear (try registrar)' };
};
const makeResponse = (list) =>
  list.map(({ domain, status }) => {
    const mapped = mapStatus(status);
    return { domain, ...mapped };
  });

// --- handler ---
export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    let { query = '', tlds = [], domains = [] } = body || {};

    query = (query || '').trim().toLowerCase();

    // যদি user শুধুই query দেয় → কম্বিনেশন বানাই
    if (query && domains.length === 0) {
      const hasDot = query.includes('.');
      if (hasDot) {
        // যেমন: tamim.com → সরাসরি সেটাই চেক
        domains = [query.replace(/\s+/g, '')];
      } else {
        // যেমন: "tamim" → tlds বা ডিফল্ট থেকে বানাও
        const useTlds = Array.isArray(tlds) && tlds.length ? tlds : DEFAULT_TLDS;
        domains = useTlds.map((t) => `${query}.${t.replace(/^\./, '')}`);
      }
    }

    // সেফটি
    domains = (domains || [])
      .map(d => String(d || '').toLowerCase().replace(/\s+/g, ''))
      .filter(Boolean);

    if (!domains.length) {
      return NextResponse.json({ error: 'No domains to check.' }, { status: 400 });
    }

    const clientId = process.env.DOMAINR_CLIENT_ID;

    // Fallback: API key না থাকলে ডিটারমিনিস্টিক ডেমো (UI smooth থাকবে)
    if (!clientId) {
      const results = domains.map((d) => {
        const hash = Array.from(d).reduce((a,c)=>(a + c.charCodeAt(0)) % 100, 0);
        const mod = hash % 4;
        const state = mod === 0 ? 'available' : mod === 1 ? 'taken' : 'unknown';
        const summary =
          state === 'available' ? 'Likely available (add API key for real checks).' :
          state === 'taken'     ? 'Likely registered (add API key for real checks).' :
                                  'Status unclear (add API key).';
        return { domain: d, state, summary };
      });
      return NextResponse.json({ results }, { status: 200, headers: {'Cache-Control':'no-store'} });
    }

    // Real Domainr lookups (batch)
    const batches = chunk(domains, 50);
    const fetched = await Promise.allSettled(batches.map(async (list) => {
      const url = new URL(DOMAINR_STATUS);
      url.searchParams.set('client_id', clientId);
      url.searchParams.set('domain', list.join(','));
      const r = await fetch(url, { cache: 'no-store' });
      if (!r.ok) throw new Error(`Domainr ${r.status}`);
      const data = await r.json();
      const statusArr = data?.status || [];
      return statusArr.map(({ domain, status }) => ({ domain, status }));
    }));

    const flat = [];
    for (const f of fetched) {
      if (f.status === 'fulfilled') flat.push(...f.value);
    }

    // Missing ones (API কখনো কখনো না-ও ফেরত দেয়) → unknown
    const seen = new Set(flat.map(x => x.domain));
    for (const d of domains) if (!seen.has(d)) flat.push({ domain: d, status: 'unknown' });

    const results = makeResponse(flat);

    return NextResponse.json(
      { results },
      { status: 200, headers: { 'Cache-Control': 'no-store, must-revalidate' } }
    );
  } catch (e) {
    return NextResponse.json({ error: e?.message || 'Unexpected error' }, { status: 500 });
  }
}
