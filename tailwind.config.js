/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      'sans': [
        '"SF Pro Display"', 
        'system-ui', 
        '-apple-system', 
        'BlinkMacSystemFont', 
        '"Segoe UI"', 
        'Roboto', 
        '"Helvetica Neue"', 
        'Arial', 
        'sans-serif', 
        '"Apple Color Emoji"', 
        '"Segoe UI Emoji"', 
        '"Segoe UI Symbol"'
      ],
    },
    extend: {
      colors: {
        dark: {
          background: '#121212',
          text: '#e0e0e0',
          card: '#1E1E1E',
          accent: '#BB86FC',
          primary: '#3700B3',
          secondary: '#03DAC6',
        }
      },
      backgroundColor: {
        dark: {
          primary: '#121212',
          secondary: '#1E1E1E',
        }
      },
      textColor: {
        dark: {
          primary: '#e0e0e0',
          secondary: '#BB86FC',
        }
      },
      boxShadow: {
        'dark-lg': '0 10px 15px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05)',
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      transitionProperty: {
        'colors-all': 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform',
      }
    },
  },
  plugins: [],
}
