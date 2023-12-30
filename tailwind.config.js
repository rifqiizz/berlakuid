/** @type {import('tailwindcss').Config} */
// tailwind.config.js
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlueLight: '#C9E0F6',
        customBlueMain: '#0066CC',
        
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
