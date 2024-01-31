/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      /* Dark Grey Violet */
      '--color-dark-grey-violet': '#301F2F',
      /* Grey Violet */
      '--color-grey-violet': '#523F50',
      /* Greyest Violet */
      '--color-greyest-violet': '#766274',
      /* Grey */
      '--color-grey': '#9B869A',
      /* Light Grey Violet */
      '--color-light-grey-violet': '#C3ADC1',
      /* Dark Violet */
      '--color-dark-violet': '#500048',
      /* Purple Violet */
      '--color-violet-dark-black': '#7B3171',
      /* Pink */
      '--color-pink': '#A95B9C',
      /* Light Pink */
      '--color-light-pink': '#D887C9',
      /* Lightest Pink */
      '--color-lightest-pink': '#FFB4F9',
      /* White */
      '--color-white': '#FFFFFF',
      /* Black */
      '--color-black': '#1E1E1E',
      /* Very Light Grey */
      '--color-very-light-grey': '#CBCBCB',
    },
    fontFamily: {
      'roboto': ['roboto', 'sans-serif'],
    }
  },
  plugins: [],
}

