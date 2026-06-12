/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#02010A",
        secondary: "#B1FFAD",
        tertiary: "#271938",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        chip: "#00b006"
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
        sm: "640px",
        md: "860px",
        lg: "1024px",
        xl: '1280px'
      },
      backgroundImage: {
        // "hero-pattern": "url('/src/assets/herobg.png')",
      },
      keyframes: {
        'border-spin': {
          '100%': {
            transform: 'rotate(-360deg)'
          }
        }
      },
      animation: {
        'border-spin': 'border-spin 7s linear infinite'
      }
    },
  },
  plugins: [],
};