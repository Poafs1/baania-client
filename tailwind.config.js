module.exports = {
  darkMode: 'class',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      body: ['Prompt', 'sans-serif'],
      header: ['Prompt', 'sans-serif'],
      sans: ['Prompt', 'sans-serif'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio'), require('@tailwindcss/line-clamp')],
};
