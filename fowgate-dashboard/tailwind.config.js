/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
      },
        fontSize: {
      base: '14px', // or customize more sizes if needed
    },
      letterSpacing: {
        'wide-5': '0.05em', // 5% of the font size
      },
      colors: {
        googleGreen: '#34A853',
      },
    },
  },
  plugins: [],
}
