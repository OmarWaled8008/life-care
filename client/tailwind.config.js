/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        main2: "#5e6468",
        main1: "#082336",
        main3: "#0c324d",
        prim: "#c99c43",
        text: "#fefefe",
      },
    },
  },
  plugins: [],
};
