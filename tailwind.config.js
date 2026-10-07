/** @type {import('tailwindcss').Config} */
function rgbVar(name) {
  return `rgb(var(${name}) / <alpha-value>)`
}

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: rgbVar('--c-ink'),
        paper: rgbVar('--c-paper'),
        line: rgbVar('--c-line'),
        accent: rgbVar('--c-accent'),
        glow: rgbVar('--c-glow'),
        fg: rgbVar('--c-fg'),
        muted: rgbVar('--c-muted'),
        faint: rgbVar('--c-faint'),
        surface: rgbVar('--c-surface'),
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.05em',
        tighter: '-0.03em',
      },
      maxWidth: {
        site: '76rem',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'scroll-hint': {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '50.01%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
        pulse2: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        'scroll-hint': 'scroll-hint 2.2s cubic-bezier(0.65, 0, 0.35, 1) infinite',
        pulse2: 'pulse2 2s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
