/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Merriweather', 'serif'],
      },
      colors: {
        pearl: "#E3E1D5",
        darkGrey: "#353535",
        softGray: "#C4C4C4",
        sepiaBrown: "#704212",
        redorg: "#D74108",
        foggyGrey: "#CBC8B9",
        warmGold: "#D4AF37"
      }
    },
  },
  plugins: [],
}
