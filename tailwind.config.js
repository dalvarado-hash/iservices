/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        ink: '#030305',
        'ink-2': '#0a0a12',
        brand: {
          purple: '#7F39E9',
          light: '#a446f4',
          blue: '#4138f3',
          cyan: '#00c3ff',
          magenta: '#F1005B'
        },
        signal: '#3DDC97',
        amber: '#FFB454',
        down: '#FF5C6C'
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace']
      }
    }
  },
  plugins: []
}
