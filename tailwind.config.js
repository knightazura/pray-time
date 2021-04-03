function withOpacity(variable_name) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variable_name}), ${opacityValue})`
    }
    return `rgb(var(${variable_name}))`
  }
}

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      skin: {
        primary: withOpacity('--primary-color'),
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
