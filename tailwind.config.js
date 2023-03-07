/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "src/home.{html,js}"
  ],
  theme: {
    extend: {
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
      },
      fontFamily: {
        body: ['Nunito'],
      }
    },
  },
  plugins: [],
}
