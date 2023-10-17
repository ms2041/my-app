/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      gridRow: {
        'span-14': 'span 14 / span 14',
        'span-15': 'span 15 / span 15',
      },
      gridTemplateRows: {
        '22': 'repeat(22, minmax(0, 1fr))'
      },
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))'
      },
      fontFamily: {
        'tinos': ['tinos-normal'],
        'cascadia': ['Cascadia-Mono-Italic']
      }
    },
  },
  plugins: [],
}

