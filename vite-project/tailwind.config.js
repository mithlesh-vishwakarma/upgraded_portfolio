/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        merienda: ['Merienda', 'cursive'],
        roboto: ['Roboto', 'sans-serif'],
        plugins: [require('@tailwindcss/line-clamp')],
      },
    },
  },
  plugins: [],
}


