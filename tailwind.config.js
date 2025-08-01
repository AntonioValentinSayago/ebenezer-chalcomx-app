/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./presentation/**/*.{js,jsx,ts,tsx}",
],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'work-light': ['WinkyRough-Light', 'sans-serif'],
        'work-medium': ['WinkyRough-Medium', 'sans-serif']
      }
    },
  },
  plugins: [],
}