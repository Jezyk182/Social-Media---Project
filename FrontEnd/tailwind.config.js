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
      },
      colors: {
        bg: "#212121",
        secbg: "#161618",
        bgAcc: "#8f8f8f",
        textAcc: "#c96202",
        text: "#eeeeee",
        navIcon: "#b8b8b8",
        navIconHover: "#ffffff"
      }
    }
    
  },
  plugins: [],
}

