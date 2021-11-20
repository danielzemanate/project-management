
// const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'xs': '260px',
      'xs1': '475px',
      ...defaultTheme.screens,
    },
    // colors: {
    //   // Build your palette here
    //   transparent: 'transparent',
    //   current: 'currentColor',
    //   red:colors.red,
    //   yellow:colors.yellow,
    //   blue:colors.blue,
    //   indigo:colors.indigo,
    //   gray:colors.gray,
    //   green:colors.green,
    //   // blueGray:colors.blueGray
    // },
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['disabled'],
      textColor: ['disabled'],
    },
  },
  plugins: [],
}


