/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        "text-color": "#000000",
        "gray-color": "#f2f0ef",
        
      },
      backgroundImage: {
        "custom-gradient":
          "radial-gradient(circle,rgb(180, 238, 237) 0%, rgb(252, 250, 250) 100%)",
      },
    },
  },
  plugins: [],
};
