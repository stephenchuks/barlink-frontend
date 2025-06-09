// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ED4A72", // Lovable's pink
        secondary: "#0d9488",
        lightBg: "#f8fafc",
        boxedBg: "#fff",
        heroBg: "#f6f8fa",
        borderLight: "#eef1f4",
      },
      borderRadius: {
        "2xl": "1rem",
      },
      boxShadow: {
        card: '0 2px 8px rgba(0, 0, 0, 0.05)',
      },
      fontFamily: {
        sans: ['Nunito Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'boxed': '75rem', // 1200px
      },
    },
  },
  plugins: [],
};
