/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        "glow": "0 0 10px #FFD700",
      },
      colors: {
        "gold-color": "#FFD700",
        "background": "#ffffff",
        "text-color": "#3f7de0",
        "gray-color": "#f2f0ef",
      },
      backgroundImage: {
        "custom-gradient":
          "radial-gradient(circle, rgb(50 125 224) 0%, rgb(0, 0, 20) 50%)",
      },
    },
  },
  plugins: [],
};
