/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    container: {
      padding: {
        default: "7rem",
        sm: "3rem",
        md: "4rem",
        lg: "6rem",
      },
    },
  },
  plugins: [],
};
