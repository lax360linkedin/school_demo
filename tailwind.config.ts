import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FDFCFB",
          100: "#FAF8F5",
          200: "#F4EFEB",
          300: "#EAE3DB",
          400: "#DDD4C7",
          500: "#C4B8A5",
        },
        "school-navy": "#1E293B",
        "school-navy-dark": "#0F172A",
        "school-navy-light": "#334155",
        "school-blue": "#1D4ED8",
        "school-blue-light": "#2563EB",
        "school-violet": "#6366F1",
        "school-violet-light": "#818CF8",
        "academic-gold": "#B45309",
        "academic-gold-light": "#D97706",
        "academic-gold-dark": "#78350F",
        "campus-green": "#15803D",
        "campus-green-light": "#16A34A",
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        outfit: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
