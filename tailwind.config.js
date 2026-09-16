/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './api/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        brand: {
          950: '#070F26',
          900: '#0B1633',
          800: '#142B5F',
          700: '#1E3A8A',
          600: '#2B55C6',
          100: '#E8EEF9'
        },
        gold: {
          100: '#FBF6E9',
          200: '#F2E7CD',
          300: '#E4C978',
          400: '#D3B563',
          500: '#C6A75B',
          600: '#B08E3C'
        }
      },
      opacity: {
        7: '0.07',
        12: '0.12',
        14: '0.14',
        45: '0.45',
        55: '0.55',
        65: '0.65',
        72: '0.72',
        82: '0.82',
        88: '0.88'
      },
      spacing: {
        15: '3.75rem'
      },
      boxShadow: {
        soft: '0 20px 60px rgba(15, 23, 42, 0.18)',
        gold: '0 18px 44px rgba(198, 167, 91, 0.28)'
      }
    }
  },
  plugins: []
};
