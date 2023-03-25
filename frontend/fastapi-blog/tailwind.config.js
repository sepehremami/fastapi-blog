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
    container: {
      center: true,
      padding: {
        default: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
      },
    },
    borderRadius: {
      'none': '0',
      'sm': '.125rem',
      default: '.25rem',
      'lg': '.5rem',
      'full': '9999px',
    },
  },
  plugins: [],
}


