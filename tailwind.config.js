/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#ecf7ee",
          100: "#d9f0de",
          200: "#b7e2c1",
          300: "#8acc97",
          400: "#58b66b",
          500: "#3a9d51",
          600: "#2c7d40",
          700: "#236535",
          800: "#1d512c",
          900: "#194425"
        }
      }
    },
  },
  plugins: [],
}
