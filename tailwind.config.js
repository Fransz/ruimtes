/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./**/*.html",
  ],
  theme: {
    colors: {
        transparent: 'transparent',
        current: 'currentColor' ,
        black: '#282828',
        red: '#cc241d',
        green: '#98971a',
        yellow: '#d79921',
        blue: '#458588',
        purple: '#b16286',
        aqua: '#689d6a',
        gray: '#a89984',
        brgray: '#928374',
        brred: '#fb4934',
        brgreen: '#b8bb26',
        bryellow: '#fabd2f',
        brblue: '#83a598',
        brpurple: '#d3869b',
        braqua: '#8ec07c',
        white: '#ebdbb2'
    },
  },
  plugins: [],
}
