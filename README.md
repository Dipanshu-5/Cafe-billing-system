# Cafe Billing System

React + Vite TypeScript demo app for cafe billing.

## Requirements

- Node.js >= 18

## Run locally

1. Install dependencies

```powershell
npm install
```

2. Start dev server

```powershell
npm run dev
```

3. Build for production

```powershell
npm run build
```

4. Preview production build

```powershell
npm run preview
```

Deployment: Upload the `dist/` folder to any static host (Netlify, Vercel, S3 + CloudFront, etc.).

Notes

- The build runs `tsc` then `vite build` to ensure type safety.
- Environment variables: add a `.env` or `.env.local` file if needed; `.env*` is ignored by Git.
