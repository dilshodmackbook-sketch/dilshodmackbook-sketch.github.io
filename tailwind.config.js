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
        bg: {
          primary: rgbVar('--c-bg-primary'),
          secondary: rgbVar('--c-bg-secondary'),
          tertiary: rgbVar('--c-bg-tertiary'),
          card: rgbVar('--c-bg-card'),
          elevated: rgbVar('--c-bg-elevated'),
        },
        border: {
          DEFAULT: rgbVar('--c-border'),
          subtle: rgbVar('--c-border-subtle'),
          strong: rgbVar('--c-border-strong'),
        },
        accent: {
          violet: rgbVar('--c-accent-violet'),
          cyan: rgbVar('--c-accent-cyan'),
          pink: rgbVar('--c-accent-pink'),
          green: rgbVar('--c-accent-green'),
          amber: rgbVar('--c-accent-amber'),
        },
        text: {
          primary: rgbVar('--c-text-primary'),
          secondary: rgbVar('--c-text-secondary'),
          muted: rgbVar('--c-text-muted'),
          dim: rgbVar('--c-text-dim'),
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'Menlo', 'monospace'],
      },
      fontSize: {
        'display-1': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1', letterSpacing: '-0.04em', fontWeight: '800' }],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.025em',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
      },
      boxShadow: {
        card: '0 4px 24px rgba(0, 0, 0, 0.4)',
        'glow-violet': '0 0 40px rgba(124, 58, 237, 0.35)',
      },
    },
  },
  plugins: [],
}
