/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      gridRow: {
        'span-14': 'span 14 / span 14',
        'span-15': 'span 15 / span 15',
        'span-17': 'span 17 / span 17',
      },
      gridColumn: {
        'span-8': 'span 8 / span 8',
        'span-9': 'span 9 / span 9',
        'span-18': 'span 18 / span 18',
      },
      gridTemplateRows: {
        '22': 'repeat(22, minmax(0, 1fr))',
        '17': 'repeat(17, minmax(0, 1fr))',
      },
      gridTemplateColumns: {
        '9': 'repeat(9, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
        '18': 'repeat(18, minmax(0, 1fr))'
      },
      spacing: {
        '128': '32rem',
      },
      fontFamily: {
        'tinos': ['tinos-normal'],
        'cascadia': ['Cascadia-Mono-Italic'],
        'alegreya': ['algreya-regular'],
        'marta': ['marta'],
        'phosphorus-tribromide': ['phosphorus-tribromide'],
        'hultog': ['hultog-v2'],
        'hultog-italic': ['hultog-italic-v2'],
      }
    },
  },
  plugins: [],
}

