/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#009688',
        secondary: '#FF6F61',
        background: '#F5F5F5',
        textPrimary: '#333333',
        testSecondary: '#757575',
        buttonBg: '#009688',
        buttonText: '#FFFFFF',
        navbarBg: '#E0F2F1',
        navbarText: '#009688',
      }
    },
  },
  plugins: [],
}
