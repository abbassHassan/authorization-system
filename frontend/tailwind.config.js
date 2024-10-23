/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}", // Look for Tailwind in pages
    "./src/components/**/*.{js,ts,jsx,tsx}", // Look for Tailwind in components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
