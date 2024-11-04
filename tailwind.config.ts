/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "blob-1": "blob-1 40s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "blob-2": "blob-2 40s cubic-bezier(0.4, 0, 0.6, 1) infinite alternate",
      },
    },
  },
  plugins: [],
};
