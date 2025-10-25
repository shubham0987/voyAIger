# voyAIger back-end (Auth scaffold)

This is a minimal Express backend scaffold providing:

- POST /api/auth/register — register with email/password
- POST /api/auth/login — login with email/password
- GET /auth/google — start Google (Gmail) OAuth login
- GET /auth/google/callback — Google OAuth callback (redirects back to FRONTEND_URL with a token)

Setup

1. Copy `.env.example` to `.env` and fill the values. You must create Google OAuth credentials in Google Cloud Console (OAuth 2.0 Client IDs) and set the authorized redirect URI to the value of `GOOGLE_CALLBACK_URL` (e.g., `http://localhost:5000/auth/google/callback`).

Database

This scaffold now uses Postgres via Sequelize. You can provide a single `DATABASE_URL` (e.g., `postgres://user:password@localhost:5432/voyAIger`) or set the `PG_HOST`, `PG_PORT`, `PG_DATABASE`, `PG_USER`, and `PG_PASSWORD` variables in your `.env`. 2. Install dependencies and run:

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

Open in browser: http://localhost:5000/auth/google

After successful Google sign-in, you'll be redirected to `FRONTEND_URL` with `?token=<JWT>` query param.

Notes / Next steps

- Validate and harden JWT secret and token expiry.
- For production, use secure cookies or store tokens safely on frontend.
- Add refresh tokens if needed.
- Add tests and input validation libraries (Joi or express-validator) as desired.
