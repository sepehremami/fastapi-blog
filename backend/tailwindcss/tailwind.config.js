/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["../templates/**/*.{html,js}"],
  theme: {
    extend: {
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
      fontFamily: {
        body: ['Nunito'],
      }
    },
  },
  plugins: [],
}
