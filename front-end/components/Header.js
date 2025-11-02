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

  const firstInitial = name ? name.charAt(0).toUpperCase() : "";

  return (
    <header className="w-full bg-white/60 backdrop-blur sticky top-0 z-30 border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={PAGES.INDEX}>
            <a className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-teal-400 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                <span className="material-symbols-outlined text-xl">
                  travel_explore
                </span>
              </div>

              <div className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                voy
                <span className="text-indigo-600 dark:text-indigo-400">AI</span>
                ger
              </div>
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
                <span className="text-xs text-gray-700">Welcome,</span>
                <div
                  className="flex items-center justify-center rounded-full size-8 
                   bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary-light 
                   font-bold text-sm flex-shrink-0"
                  aria-label={`Avatar for ${name}`}
                >
                  {firstInitial}
                </div>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md py-1 z-40">
                  <a
                    href={PAGES.SETTINGS}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 transition-colors duration-100"
                  >
                    <span className="material-symbols-outlined text-sm">
                      settings
                    </span>
                    Settings
                  </a>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-gray-100 transition-colors duration-100"
                  >
                    <span className="material-symbols-outlined text-sm">
                      logout
                    </span>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href={PAGES.LOGIN}>
                <a className="text-xs text-indigo-600">Login</a>
              </Link>
              <Link href={PAGES.REGISTER}>
                <a className="text-xs text-gray-600">Register</a>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
