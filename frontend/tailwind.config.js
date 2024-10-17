/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#04B4C6',   // Color primario
        secondary: '#1C6A53', // Color secundario
        accent: '#07312C',    // Color acento
        background: '#0364c6',
        thov: '#aed192',
        btnc: '#0aa461', 
      },
      fontFamily: {
        sans: ['bahianita'],
        subst: ['chakra petch'],
        fprecio: ['changa one'], // Aquí puedes reemplazar 'Roboto' por la fuente que uses
      },
      animation: {
        zoom: 'zoomEffect 5s ease-in-out infinite',
      },
      keyframes: {
        zoomEffect: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' }, // Aumenta un 10% en la mitad de la animación
        },
        
      },
      boxShadow: {
        'custom-inset': 'inset 4px 4px 100px 0px rgba(0, 0, 0, 0.3)', // Tu sombra personalizada
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}


