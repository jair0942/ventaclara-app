/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // Indigo 600
        'primary-light': '#818CF8', // Indigo 400
        'primary-dark': '#3730A3', // Indigo 800
        success: '#10B981', // Emerald 500
        danger: '#EF4444', // Red 500
        warning: '#F59E0B', // Amber 500
        bg: '#F8FAFC', // Slate 50
        'bg-dark': '#0F172A', // Slate 900
        'card-dark': '#1E293B', // Slate 800
        'text-dark': '#F8FAFC' // Slate 50
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', '-apple-system', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'bounce-in': 'bounceIn 0.5s ease-out'
      }
    }
  },
  plugins: []
}
