module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{html,js,ts,jsx,tsx}",
    "./components/**/*.{html,js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      sans: ["Flama"],
      mono: ["Cascadia"]
    }
  },
  extend: {},
  plugins: [],
}
