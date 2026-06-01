/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // SHRIFTLARNI TAILWIND'GA TANITISH
      fontFamily: {
        shirin: ["Fredoka", "sans-serif"],    // Sarlavhalar va logotip uchun
        asosiy: ["Quicksand", "sans-serif"],  // Oddiy matnlar va raqamlar uchun
      },
    },
  },
  plugins: [],
}