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
        // BG IMAGE
      }
    },
    colors: {
      bg: "#222831",
      bgAcc: "#31363F",
      textAcc: "#76ABAE",
      text: "#EEEEEE"
    }
  },
  plugins: [],
}

