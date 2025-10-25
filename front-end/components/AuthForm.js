import { useState } from "react";
import { useRouter } from "next/router";

export default function AuthForm({ mode = "login" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const backend = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const url =
        mode === "register"
          ? `${backend}/api/auth/register`
          : `${backend}/api/auth/login`;
      const body =
        mode === "register" ? { email, password, name } : { email, password };
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || data.message || "Request failed");

      // extract token/user from common shapes
      const token =
        data.token ||
        data.accessToken ||
        data.jwt ||
        data.authToken ||
        data.idToken;
      const userName =
        (data.user && (data.user.name || data.user.email)) ||
        data.name ||
        data.email ||
        email;

      if (token) {
        try {
          localStorage.setItem("voyAIger_token", token);
          localStorage.setItem("voyAIger_user_name", userName);
        } catch (e) {
          // ignore
        }
      }

      setMessage({ type: "success", text: "Welcome! Redirecting..." });
      setTimeout(() => router.push("/home"), 350);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  }

  const googleUrl = `${backend}/api/auth/google`;

  return (
    <div className="max-w-xl mx-auto mt-12">
      <div className="card flex flex-col md:flex-row items-center gap-6">
        <div className="w-full md:w-1/2 text-center p-4">
          <h2 className="text-3xl font-bold mb-2 brand-grad">voyAIger</h2>
          <p className="text-sm text-gray-600">
            Join the travel community. Share itineraries, photos and tips.
          </p>
          <div className="mt-4">
            <svg
              width="120"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto opacity-90"
            >
              <path
                d="M2 12l5 2 3-5 4 3 6-2"
                stroke="#06b6d4"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="#6366f1"
                strokeWidth="1.2"
              />
            </svg>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <form onSubmit={submit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    required
                    className="block w-full rounded-md border-gray-200 px-3 py-2 focus:ring-2 focus:ring-indigo-300"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  required
                  type="email"
                  className="block w-full rounded-md border-gray-200 px-3 py-2 focus:ring-2 focus:ring-indigo-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  required
                  type="password"
                  className="block w-full rounded-md border-gray-200 px-3 py-2 focus:ring-2 focus:ring-indigo-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <button
                type="submit"
                className="w-full inline-flex justify-center items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow"
                disabled={loading}
              >
                {loading
                  ? "Working..."
                  : mode === "register"
                  ? "Create account"
                  : "Sign in"}
              </button>

              <a
                href={googleUrl}
                className="w-full inline-flex justify-center items-center gap-3 px-4 py-2 border rounded-md hover:shadow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="20"
                  height="20"
                >
                  <path
                    fill="#fbc02d"
                    d="M43.6 20.5H42V20H24v8h11.3C34.7 32.9 30 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l5.7-5.7C34.6 4.9 29.7 3 24 3 12.9 3 3.7 12.1 3.7 23.2S12.9 43.5 24 43.5c11 0 20-8.1 20-20 0-1.3-.1-2.6-.4-3.8z"
                  />
                  <path
                    fill="#e53935"
                    d="M6.3 14.3l6.6 4.8C14.6 15 18.9 12 24 12c3.1 0 5.9 1.1 8.1 2.9l5.7-5.7C34.6 4.9 29.7 3 24 3 16.7 3 10.1 6.8 6.3 14.3z"
                  />
                  <path
                    fill="#4caf50"
                    d="M24 43.5c5.3 0 10-1.9 13.7-5.1l-6.2-5c-2 1.5-4.5 2.4-7.5 2.4-6 0-10.7-3.1-13.3-7.7l-6.7 5.2C8 37.9 15.5 43.5 24 43.5z"
                  />
                  <path
                    fill="#1565c0"
                    d="M43.6 20.5H42V20H24v8h11.6c-1 3-3.6 5.5-6.6 6.9v5.6c6.1-1.7 11-6.6 12.6-12.6 0-1.3-.1-2.6-.6-3.8z"
                  />
                </svg>
                <span>Continue with Google</span>
              </a>
            </div>
          </form>

          {message && (
            <div
              className={`mt-4 p-3 rounded ${
                message.type === "error"
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="mt-4 text-sm text-gray-600">
            {mode === "register" ? (
              <p>
                Already have an account?{" "}
                <a href="/login" className="text-indigo-600 font-medium">
                  Sign in
                </a>
              </p>
            ) : (
              <p>
                New here?{" "}
                <a href="/register" className="text-indigo-600 font-medium">
                  Create an account
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
