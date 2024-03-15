/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/utils/notify.ts',
  ],
  plugins: [],
  important: '#body',
  theme: {
    extend: {
      colors: {
        shark: '#1E2226',
        bunker: '#0D1116',
      },
      keyframes: {
        fade: {
          '0%': { backgroundPosition: '0% 50%' },
          '25%': { backgroundPosition: '100% 50%' },
          '50%': { backgroundPosition: '0% 50%' },
          '75%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
};
