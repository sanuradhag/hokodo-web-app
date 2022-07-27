/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "sans":"Montserrat"
      },
      colors: {
        'bg': '#F3F0EF',
        'red': '#CA024F',
        'green':'#169E7F',
        'green-dark': '#075553',
        'black': '#14212A'
    }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}