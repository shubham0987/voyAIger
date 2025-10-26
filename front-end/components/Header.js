import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { PAGES } from "../lib/routes";

export default function Header() {
  const [name, setName] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const menuRef = useRef(null);

  useEffect(() => {
    try {
      const u = localStorage.getItem("voyAIger_user_name");
      setName(u || null);
    } catch (e) {
      setName(null);
    }

    function onStorage(e) {
      if (e.key === "voyAIger_user_name") {
        setName(e.newValue || null);
      }
    }
    window.addEventListener("storage", onStorage);

    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    // close menu on route change
    const handleRoute = () => setMenuOpen(false);
    router.events.on("routeChangeStart", handleRoute);
    return () => router.events.off("routeChangeStart", handleRoute);
  }, [router.events]);

  useEffect(() => {
    function onClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [menuOpen]);

  function handleLogout() {
    try {
      localStorage.removeItem("voyAIger_token");
      localStorage.removeItem("voyAIger_user_name");
    } catch (e) {}
    setName(null);
    setMenuOpen(false);
    router.push(PAGES.HOME);
  }

  return (
    <header className="w-full bg-white/60 backdrop-blur sticky top-0 z-30 border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={PAGES.INDEX}>
            <a className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-teal-400 flex items-center justify-center text-white font-bold">
                V
              </div>
              <div className="text-lg font-semibold">voyAIger</div>
            </a>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {name ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((s) => !s)}
                className="flex items-center gap-3 px-3 py-1 rounded hover:bg-gray-50"
                aria-haspopup="true"
                aria-expanded={menuOpen}
              >
                <span className="text-sm text-gray-700">Welcome,</span>
                <span className="text-sm font-medium text-gray-900">
                  {name}
                </span>
                <svg
                  className="w-4 h-4 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md py-1 z-40">
                  <a
                    href={PAGES.SETTINGS}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Settings
                  </a>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href={PAGES.LOGIN}>
                <a className="text-sm text-indigo-600">Login</a>
              </Link>
              <Link href={PAGES.REGISTER}>
                <a className="text-sm text-gray-600">Register</a>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
