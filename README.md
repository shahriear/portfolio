# TAH Portfolio — Next.js (JavaScript)

This is the JavaScript (no TypeScript) build of the portfolio. Same design, components, and features.

## Quickstart
```bash
npm install
npm run dev   # http://localhost:3000
# production
npm run build && npm start
```

## Environment
Copy `.env.example` to `.env.local` and fill values (Stripe keys/prices, Calendly, Crisp, etc.).

## Structure
- `app/` — App Router pages (`page.jsx`, route handlers in `app/api/*/route.js`)
- `components/` — UI components in `.jsx`
- `lib/` — data/utilities in `.js`
- `public/` — static assets

## Alias
JS path alias is in `jsconfig.json`:
```json
{ "compilerOptions": { "baseUrl": ".", "paths": { "@/*": ["./*"] } } }
```
