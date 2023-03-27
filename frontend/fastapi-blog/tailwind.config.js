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
    extend:{
      margin:{
        "40p":"40%",
        "30p":"30%",
        "20p":"20%",
        "10p":"10%",
      },
      height:{
        1300: "1300px",
      },
      backgroundImage:{

      },
      fontSize: {
        "12xl": "8rem",
      },
      colors: {
        primary: "#223867",

        secondary: {
          2: "#20325b",
          1:"#0f172a",
          100: "#E2E2D5",
          200: "#888883",
          3:"#14213a",
        },
        third_party:{
          "50":"#eff6ff",
          "100":"#dbeafe",
          "200":"#bfdbfe",
          "300":"#93c5fd",
          "400":"#60a5fa",
          "500":"#3b82f6",
          "600":"#2563eb",
          "700":"#1d4ed8",
          "800":"#1e40af",
          "900":"#1e3a8a"
        },

      },
    },
    container: {
      center: true,
      padding: {
        default: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
      },
    },

  },
  plugins: [],
}


