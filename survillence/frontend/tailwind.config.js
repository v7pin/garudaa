
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        moveCCTV :{
          "0%": {
            transform: "rotate(-40deg)",
          },
          "50%":{
            transform: "rotate(5deg)",
          },
          "100%":{
            transform: "rotate(20deg)",
          }
        }
      },
      animation: {
        moveCCTV: "moveCCTV 10s linear infinite alternate  ",
      },
      fontFamily:{
        'poppins': ['Poppins', 'sans-serif'],
        'madimi': ['Madimi One', 'sans-serif'],
        'nunito': ['Nunito Sans', 'sans-serif'],
        'ubuntu': ['Ubuntu', 'sans-serif'],
        'passion': ['Passion One', 'sans-serif'],
        'afacad': ['Afacad', 'sans-serif'],
        'belanosima': ['Belanosima', 'sans-serif'],
        'mukta':['Mukta', 'sans-serif'],
        'yatra':['Yatra One', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
