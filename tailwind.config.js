/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#080808',
        'surface-light': '#dfdfdd',
        'surface-dark': '#121212',
        'surface-card': '#1a1a1a',
        'accent-red': '#c80a1f',
        'subtle-border': 'rgba(223, 223, 221, 0.14)',
        'laser-glow': 'rgba(200, 10, 31, 0.45)'
      },
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace']
      },
      borderRadius: {
        'card': '32px',
        'card-sm': '24px'
      },
      boxShadow: {
        'red-laser': '0 16px 36px rgba(0, 0, 0, 0.85), 0 0 16px rgba(200, 10, 31, 0.22)',
        'red-laser-sm': '0 8px 18px rgba(0, 0, 0, 0.7), 0 0 8px rgba(200, 10, 31, 0.16)'
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      }
    },
  },
  plugins: [],
}
