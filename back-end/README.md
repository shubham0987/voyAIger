# voyAIger back-end (Auth scaffold)

This is a minimal Express backend scaffold providing:

- POST /api/auth/register — register with email/password
- POST /api/auth/login — login with email/password
- GET /api//auth/google — start Google (Gmail) OAuth login
- GET /api/auth/google/callback — Google OAuth callback (redirects back to FRONTEND_URL with a token)

Setup

```powershell
cd back-end
npm install
npm run dev
```

Testing

- Register:

POST http://localhost:5000/api/auth/register
Body (JSON): { "email": "you@example.com", "password": "secret123", "name": "Your Name" }

- Login (email/password):

POST http://localhost:5000/api/auth/login
Body (JSON): { "email": "you@example.com", "password": "secret123" }

- Google login:

Open in browser: http://localhost:5000/api/auth/google

After successful Google sign-in, you'll be redirected to `FRONTEND_URL` with `?token=<JWT>` query param.
