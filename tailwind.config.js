/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: '#3A3737',
        brand: {
          red: '#E02404',
          yellow: '#F4E44C',
          grey: '#B4B4BC',
          brown: '#AE614C',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -10px rgba(58,55,55,0.25)',
        lift: '0 18px 40px -15px rgba(224,36,4,0.35)',
      },
    },
  },
  plugins: [],
}
