/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        slide: 'slide 20s linear infinite',
        loading: 'loading 1s ease-in-out infinite',
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        loading: {
          '0%': { transform: 'translateX(-200%)' },
          '100%': { transform: 'translateX(200%)' }
        },
      },
    },
  },
  plugins: [],
};
