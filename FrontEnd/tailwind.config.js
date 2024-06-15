/** @type {import('tailwindcss').Config} */
export default {
  prefix: "sad-",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-bg': "url('/public/login.jpg')",
      }
    },
  },
  plugins: [],
}

