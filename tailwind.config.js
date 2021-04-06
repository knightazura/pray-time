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
    colors: {
      main: withOpacity('--bg-main'),
      primary: withOpacity('--primary-color'),
      white: withOpacity('--white')
    },
    gradientColorStops: theme => ({
      'primary': withOpacity('--primary-color'),
      'primary-end': withOpacity('--primary-end-color'),
      'action': withOpacity('--action-color'),
      'action-end': withOpacity('--action-end-color')
    }),
    extend: {
      gridTemplateColumns: {
        'full-bleed': '1fr min(65ch, calc(100% - 64px)) 1fr'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
