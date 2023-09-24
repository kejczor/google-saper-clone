/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        18: "repeat(18, minmax(0, 1fr))",
        24: "repeat(24, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
};
