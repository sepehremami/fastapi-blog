/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "public/index.{html,js,jsx}",
  "src/index.{js,jsx,ts,tsx}",
  "src/App.{js,jsx,ts,tsx}",
  "src/navbar.{js,jsx,ts,tsx}",
  "src/home.{js,jsx,ts,tsx}",
  "src/**/*.{js,jsx,ts,tsx}",
  "src/pages/login/index.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
