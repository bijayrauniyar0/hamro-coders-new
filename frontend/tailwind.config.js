/** @type {import('tailwindcss').Config} */
export const darkMode = ['class'];
export const content = [
  './pages/**/*.{ts,tsx}',
  './components/**/*.{ts,tsx}',
  './app/**/*.{ts,tsx}',
  './src/**/*.{ts,tsx}',
];
export const theme = {
  container: {
    center: true,
    padding: '2rem',
    screens: {
      '2xl': '1400px',
      xs: '540px',
    },
  },
  extend: {
    fontFamily: {
      primary: ['Poppins'],
    },
    utilities: {
      '.backface-hidden': {
        'backface-visibility': 'hidden',
      },
    },
    colors: {
      primary: {
        50: '#faf8fc', // Very light, almost white
        100: '#f3ecfa', // Very light, almost white
        200: '#e1d4f3', // Soft lavender
        300: '#cebceb', // Light purple
        400: '#bfa2e2', // Slightly stronger, but still calm
        500: '#aa8bd3', // Base color - muted lavender
        600: '#886db0', // Muted mid-tone
        700: '#65508c', // Comfortable for dark mode
        800: '#433569', // Deep but readable
        900: '#261b3d', // Very dark, but not pitch black
      },
      // grey and neutral represent same color
      grey: {
        100: '#F7F7F7',
        200: '#F1F1F1',
        300: '#E3E4E3',
        400: '#D6D6D5',
        500: '#C8C9C7',
        600: '#D0D5DD',
        800: '#484848',
      },
      matt: {
        100: '#475467',
        200: '#667085',
      },
    },

    boxShadow: {
      xs: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
      sm: '0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)',
      '3xl': '0px 2px 20px 4px rgba(0, 0, 0, 0.20)',
      light: '0px 2px 20px 4px rgba(0, 0, 0, 0.12)',
      dark: '0px 4px 16px 8px rgba(217, 217, 217, 0.28)',
      formshadow: '4px 0px 19px 0px rgba(58, 58, 58, 0.16)',
      custom: '0px 2px 6px 0px rgba(20, 86, 146, 0.12)',
      box: '2px 6px 6px rgba(16, 24, 40, 0.5)',
      stats: '1.5px 1.5px 3px #bfa2e2',
      statsCard: '0 4px 12px rgba(0, 0, 0, 0.07)',
    },
    animation: {
      loader: 'loader 0.6s infinite alternate',
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out',
      'fade-down': 'fade-down .5s both',
      'fade-up-hide': 'fade-up-hide .5s both',
    },

    keyframes: {
      loader: {
        to: {
          transform: 'translate3d(0, -0.3rem, 0)',
        },
      },
      'accordion-down': {
        from: { height: '0' },
        to: { height: 'var(--radix-accordion-content-height)' },
      },
      'accordion-up': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: '0' },
      },
      'fade-up-hide': {
        '0%': {
          opacity: '1',
          transform: 'translateY(0)',
        },
        '100%': {
          opacity: '0',
          transform: 'translateY(-2rem)',
        },
      },
      'fade-down': {
        '0%': {
          opacity: '0',
          transform: 'translateY(-2rem)',
        },
        '100%': {
          opacity: '1',
          transform: 'translateY(0)',
        },
      },
    },
  },
  fontSize: {
    xs: '0.625rem',
    sm: '0.75rem',
    md: '0.875rem',
    base: '1rem',
    lg: '1.25rem',
    xl: '1.375rem',
    '2xl': '1.5rem',
    '3xl': '1.75rem',
    '4xl': '2rem',
    '5xl': '2.25rem',
    '6xl': '2.5rem',
  },
};
export const plugins = [import('tailwindcss-animate')];
