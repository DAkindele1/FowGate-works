/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      animation: {
        'slide-in': 'slide-in 0.3s ease-out forwards',
      },
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
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
