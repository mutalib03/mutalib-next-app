module.exports = {
  content: [
    "./pages/index.js",
    "./component/header.js",
    "./pages/transfer.js",
    "./pages/**/*.{html,js}",
     './components/**/*.{html,js}'
  ],
 theme: {
    screens: {
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [
    require("@tailwindcss/forms")
  ],
}
