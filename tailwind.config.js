/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#7F39E9', light: '#a446f4', deep: '#4138f3' },
        magenta: '#F1005B',
        ink: { DEFAULT: '#1a1a2e', 2: '#1e293b' },
        muted: { DEFAULT: '#475569', soft: '#64748b' },
        surface: { 1: '#f8fafc', 2: '#f1f5f9' },
      },
      fontFamily: {
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15,23,42,.04), 0 8px 24px -16px rgba(15,23,42,.18)',
        lift: '0 30px 80px -40px rgba(65,56,243,.28)',
      },
      maxWidth: {
        read: '680px',
      },
    },
  },
  plugins: [],
}
