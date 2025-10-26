module.exports = {
  darkMode: "class", // Enables dark mode based on the 'dark' class
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#13a4ec",
        "background-light": "#f6f7f8",
        "background-dark": "#101c22",
        "accent": "#FF7043",
        "card-light": "#ffffff",
        "card-dark": "#182832",
        "text-light": "#111618",
        "text-dark": "#f0f3f4",
        "subtext-light": "#617c89",
        "subtext-dark": "#9cb0bc",
        "border-light": "#dbe2e6",
        "border-dark": "#344551",
      },
      fontFamily: {
        "display": ["Sora", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "1rem",
        "xl": "1.5rem",
        "full": "9999px"
      },
      spacing: {
        'fluid-profile': 'clamp(5rem, 10vw, 8rem)', 
      },
    },
  },
  plugins: [
  ],
};