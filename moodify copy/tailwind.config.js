/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", // gray-200
        input: "var(--color-input)", // white
        ring: "var(--color-ring)", // blue-500
        background: "var(--color-background)", // gray-50
        foreground: "var(--color-foreground)", // gray-800
        primary: {
          DEFAULT: "var(--color-primary)", // blue-500
          foreground: "var(--color-primary-foreground)", // white
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // purple-500
          foreground: "var(--color-secondary-foreground)", // white
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // red-500
          foreground: "var(--color-destructive-foreground)", // white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // gray-100
          foreground: "var(--color-muted-foreground)", // gray-500
        },
        accent: {
          DEFAULT: "var(--color-accent)", // coral-500
          foreground: "var(--color-accent-foreground)", // white
        },
        popover: {
          DEFAULT: "var(--color-popover)", // white
          foreground: "var(--color-popover-foreground)", // gray-800
        },
        card: {
          DEFAULT: "var(--color-card)", // white
          foreground: "var(--color-card-foreground)", // gray-800
        },
        success: {
          DEFAULT: "var(--color-success)", // green-500
          foreground: "var(--color-success-foreground)", // white
        },
        warning: {
          DEFAULT: "var(--color-warning)", // orange-500
          foreground: "var(--color-warning-foreground)", // white
        },
        error: {
          DEFAULT: "var(--color-error)", // red-500
          foreground: "var(--color-error-foreground)", // white
        },
        // Biometric Spectrum Colors
        biometric: {
          calm: "var(--color-biometric-calm)", // blue-500
          focus: "var(--color-biometric-focus)", // purple-500
          energy: "var(--color-biometric-energy)", // coral-500
          stress: "var(--color-biometric-stress)", // orange-500
          alert: "var(--color-biometric-alert)", // red-500
        },
        // Surface Colors
        surface: {
          DEFAULT: "var(--color-surface)", // white
          foreground: "var(--color-surface-foreground)", // gray-800
        },
        // Text Colors
        text: {
          primary: "var(--color-text-primary)", // gray-800
          secondary: "var(--color-text-secondary)", // gray-500
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        emotion: "var(--emotion-border-radius)",
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Source Sans Pro', 'sans-serif'],
        caption: ['Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      boxShadow: {
        'neomorphic': 'var(--emotion-shadow-blur) var(--emotion-shadow-blur) calc(var(--emotion-shadow-blur) * 2) rgba(0, 0, 0, 0.1), calc(var(--emotion-shadow-blur) * -0.5) calc(var(--emotion-shadow-blur) * -0.5) var(--emotion-shadow-blur) rgba(255, 255, 255, 0.8)',
        'neomorphic-inset': 'inset var(--emotion-shadow-blur) var(--emotion-shadow-blur) calc(var(--emotion-shadow-blur) * 2) rgba(0, 0, 0, 0.1), inset calc(var(--emotion-shadow-blur) * -0.5) calc(var(--emotion-shadow-blur) * -0.5) var(--emotion-shadow-blur) rgba(255, 255, 255, 0.8)',
        'biometric-glow': '0 0 20px rgba(74, 144, 226, 0.3)',
      },
      animation: {
        'biometric-pulse': 'biometric-heartbeat var(--emotion-animation-duration) ease-in-out infinite',
        'emotion-morph': 'emotion-transform var(--emotion-animation-duration) cubic-bezier(0.4, 0, 0.2, 1)',
        'ambient-shift': 'ambient-color-shift 10s ease-in-out infinite',
      },
      keyframes: {
        'biometric-heartbeat': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
        },
        'emotion-transform': {
          '0%': { transform: 'translateZ(0) scale(1)' },
          '50%': { transform: 'translateZ(5px) scale(1.02)' },
          '100%': { transform: 'translateZ(0) scale(1)' },
        },
        'ambient-color-shift': {
          '0%, 100%': { filter: 'hue-rotate(0deg) saturate(1)' },
          '25%': { filter: 'hue-rotate(15deg) saturate(1.1)' },
          '50%': { filter: 'hue-rotate(0deg) saturate(0.9)' },
          '75%': { filter: 'hue-rotate(-15deg) saturate(1.1)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      backdropBlur: {
        'xs': '2px',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      transitionTimingFunction: {
        'emotion': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'biometric': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}