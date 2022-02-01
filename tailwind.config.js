module.exports = {
  content: ['./src/**/*.js'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1800px',
      '2xl': '1800px',
    },
    extend: {
      colors: {
        'guc-blue': '#032147',
        'guc-bright-pink': '#ea6cb1',
        'guc-pink': '#e0c8d5',
        'gatsby-purple': '#653397',
      },
    },
  },
  plugins: [],
};
