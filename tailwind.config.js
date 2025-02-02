module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {},
    },
    variants: {
      extend: {},
    },
    safelist: [
        'bg-yellow-200',
        'bg-sky-200',
        'bg-green-200',
      ],
    
    plugins: [],
  }