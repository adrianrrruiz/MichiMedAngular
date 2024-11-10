module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
        'sour-gummy': ['Sour Gummy', 'cursive'],
        'sarabun': ['Sarabun', 'sans-serif'],
        'Host+Grotesk': ['Host Grotesk', 'sans-serif'],
      }
    }
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Desactiva estilos base de Tailwind
  },
}
