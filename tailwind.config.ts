/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './components/**/*.tsx', './components/**/*.ts'],
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
