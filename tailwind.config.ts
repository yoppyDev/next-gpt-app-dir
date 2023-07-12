/** @type {import('tailwindcss').Config} */
import { Config } from 'tailwindcss';

module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './ui/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} satisfies Config;
