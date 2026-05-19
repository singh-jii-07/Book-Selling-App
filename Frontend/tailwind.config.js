/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7C3AED',
          50:  '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
        secondary: {
          DEFAULT: '#06B6D4',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
        },
        accent: {
          DEFAULT: '#F59E0B',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        surface: {
          bg:     '#0F172A',
          card:   '#111827',
          border: '#1E293B',
          hover:  '#1F2937',
        },
        brand: {
          text:   '#F8FAFC',
          muted:  '#94A3B8',
          subtle: '#64748B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow-pulse':     'glowPulse 2s ease-in-out infinite',
        'float':          'float 3s ease-in-out infinite',
        'shimmer':        'shimmer 1.5s infinite',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'slide-in-left':  'slideInLeft 0.4s ease-out',
        'fade-in-up':     'fadeInUp 0.5s ease-out',
        'page-flip':      'pageFlip 1.2s ease-in-out infinite',
        'spin-slow':      'spin 3s linear infinite',
        'bounce-slow':    'bounce 2s ease-in-out infinite',
        'gradient-x':     'gradientX 4s ease infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124,58,237,0.4)' },
          '50%':      { boxShadow: '0 0 50px rgba(124,58,237,0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideInRight: {
          from: { transform: 'translateX(100%)', opacity: '0' },
          to:   { transform: 'translateX(0)',    opacity: '1' },
        },
        slideInLeft: {
          from: { transform: 'translateX(-100%)', opacity: '0' },
          to:   { transform: 'translateX(0)',     opacity: '1' },
        },
        fadeInUp: {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to:   { transform: 'translateY(0)',    opacity: '1' },
        },
        pageFlip: {
          '0%':   { transform: 'rotateY(0deg)' },
          '50%':  { transform: 'rotateY(-180deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
      },
      backgroundSize: {
        '200%': '200%',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-sm':  '0 0 10px rgba(124,58,237,0.3)',
        'glow':     '0 0 25px rgba(124,58,237,0.5)',
        'glow-lg':  '0 0 50px rgba(124,58,237,0.7)',
        'glow-cyan':'0 0 25px rgba(6,182,212,0.5)',
        'glow-gold':'0 0 25px rgba(245,158,11,0.5)',
        'card':     '0 4px 6px -1px rgba(0,0,0,0.5), 0 2px 4px -1px rgba(0,0,0,0.3)',
        'card-hover':'0 20px 40px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}