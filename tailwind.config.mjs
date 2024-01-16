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
      },
    },
  },
};
