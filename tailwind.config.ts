/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // <-- Add this line
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'class',
  daisyui: {
    themes: ['light', 'dark'],
    base: true,
    darkTheme: 'dark',
    styled: true,
    utils: true,
    prefix: '',
    logs: true
  },
  plugins: [require('daisyui')]
};
