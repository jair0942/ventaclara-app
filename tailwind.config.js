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
        primary: '#0EA5E9', // Sky 500
        'primary-light': '#38BDF8', // Sky 400
        'primary-dark': '#0284C7', // Sky 600
        accent: '#2DD4BF', // Teal 400
        success: '#10B981', // Emerald 500
        danger: '#F43F5E', // Rose 500
        warning: '#F59E0B', // Amber 500
        bg: '#F8FAFC', // Slate 50
        'bg-dark': '#020617', // Slate 950 (Midnight)
        'card-dark': '#0F172A', // Slate 900
        'text-dark': '#F1F5F9' // Slate 100
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
