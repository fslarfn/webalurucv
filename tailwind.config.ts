import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        tosca: {
          DEFAULT: '#1eb8b0',
          dark: '#159089',
          light: '#e5f6f5',
        },
        ink: '#1f2d2c',
      },
    },
  },
  plugins: [forms],
}

export default config
