/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Saira", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#768E00",
        "primary-thin": "#768e0010",
      },
    },
  },
  plugins: [],
};
