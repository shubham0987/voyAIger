# voyAIger front-end (Next.js + Tailwind)

This is a minimal Next.js app with Tailwind CSS providing login and register pages that call the backend auth endpoints.

Setup

1. Install dependencies:

```powershell
cd front-end
npm install
```

2. Run the dev server:

```powershell
npm run dev
```

3. Open http://localhost:3000

Environment

- If your backend runs at a different origin, set in `.env.local` (create in `front-end/`):

```
NEXT_PUBLIC_API_BASE=http://localhost:5000
```

Notes

- The Google sign-in link in the form points at `/api/auth/google` on the same origin; if your backend is on a different host use the NEXT_PUBLIC_API_BASE variable.
