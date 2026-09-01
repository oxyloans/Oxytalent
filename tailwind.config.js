/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '421px',
        nav: '1041px',
      },
      colors: {
        ink: '#1b2430',
        'ink-soft': '#232f3d',
        paper: '#ede6d6',
        'paper-dim': '#e1d8c4',
        brass: '#c9a24b',
        'brass-bright': '#dab766',
        signal: '#5fa8a0',
        rust: '#b4573f',
        muted: '#8b95a3',
        'muted-on-paper': '#6b6455',
        line: 'rgba(237, 230, 214, 0.14)',
      },
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        fade: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slide: {
          from: { transform: 'translateX(24px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        fade: 'fade 0.15s ease',
        slide: 'slide 0.22s cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
      boxShadow: {
        card: '0 10px 24px rgba(0, 0, 0, 0.28)',
        'card-hover': '0 18px 32px rgba(0, 0, 0, 0.36)',
        pin: '0 2px 4px rgba(0, 0, 0, 0.4)',
        drawer: '-20px 0 40px rgba(0, 0, 0, 0.4)',
        'hero-card': '0 20px 50px rgba(0, 0, 0, 0.35)',
        'hero-card-offset': '0 12px 32px rgba(0, 0, 0, 0.3)',
        search: '0 16px 40px rgba(0, 0, 0, 0.25)',
        feature: '0 12px 28px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
}
