/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        ink: '#050507',
        panel: '#0b0b13',
        'panel-2': '#101019',
        brand: {
          purple: '#7F39E9',
          light: '#a446f4',
          soft: '#c9a4ff',
          blue: '#4138f3'
        },
        signal: '#3DDC97',
        amber: '#FFB454',
        down: '#FF5C6C'
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        serif: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace']
      }
    }
  },
  plugins: []
}
