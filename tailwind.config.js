/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a12',
        'ink-deep': '#030305',
        'ink-2': '#1a1a2e',
        signal: '#7F39E9',
        'signal-light': '#a446f4',
        'signal-deep': '#6E4098',
        cyan: '#00c3ff',
        'cyan-deep': '#003ab6',
        magenta: '#F1005B',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
