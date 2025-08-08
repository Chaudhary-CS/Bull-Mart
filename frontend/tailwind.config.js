/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  mode: "jit",
  theme: {
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        brand: {
          black: "#0a0a0a",
          dark: "#111827",
          darker: "#0f172a",
          primary: "#16a34a",
          primaryDark: "#065f46",
          accent: "#22c55e",
          neon: "#00ff88",
          mint: "#10b981",
          forest: "#059669",
        },
      },
      screens: {
        "1000px": "1050px",
        "1100px": "1110px",
        "800px": "800px",
        "1300px": "1300px",
        "400px": "400px",
      },
    },
  },
  plugins: [],
};
