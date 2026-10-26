/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        apple: {
          bg: '#000000',
          card: '#0D0D11',
          surface: '#16161A',
          subtle: '#222227',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(255, 255, 255, 0.18)',
          text: '#F5F5F7',
          muted: '#86868B',
          secondary: '#A1A1A6',
          accent: '#FF7700', // Refined Saffron Orange
          accentHover: '#FF881A',
          accentLight: 'rgba(255, 119, 0, 0.12)',
        },
        brand: {
          dark: '#000000',
          card: '#0D0D11',
          surface: '#16161A',
          border: 'rgba(255, 255, 255, 0.08)',
          accent: '#FF7700',
          accentLight: 'rgba(255, 119, 0, 0.12)',
          muted: '#86868B',
          light: '#F5F5F7',
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Inter"',
          'system-ui',
          'sans-serif'
        ],
        display: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"Inter"',
          'sans-serif'
        ],
        mono: [
          '"SF Mono"',
          '"JetBrains Mono"',
          'ui-monospace',
          'monospace'
        ],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        wide: '0.04em',
        widest: '0.12em'
      },
      boxShadow: {
        'apple-card': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        'apple-glow': '0 0 50px -10px rgba(255, 119, 0, 0.15)',
        'apple-subtle': '0 4px 20px rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
}
