/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}", // This line is crucial for React projects
];

export const theme = {
  extend: {
    fontFamily: {
      inter: ["Inter", "sans-serif"], // Add the Inter font family
    },
    animation: {
      "spin-slow": "spin 2s linear infinite",
      fadeIn: "fadeIn 0.3s ease-in-out",
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: 0, transform: "scale(0.95)" },
        "100%": { opacity: 1, transform: "scale(1)" },
      },
    },
  },
};

export const plugins = [];
