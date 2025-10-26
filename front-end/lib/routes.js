// Centralized route and API endpoint configuration for the front-end
const BACKEND = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

export const PAGES = {
  INDEX: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  HOME: "/home",
  SETTINGS: "/settings",
};

export const API = {
  AUTH_LOGIN: `${BACKEND}/api/auth/login`,
  AUTH_REGISTER: `${BACKEND}/api/auth/register`,
  AUTH_GOOGLE: `${BACKEND}/api/auth/google`,
};

export default {
  BACKEND,
  PAGES,
  API,
};
