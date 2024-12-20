      /** @type {import('tailwindcss').Config} */
      module.exports = {
        content: ["./app/**/*.{ts,tsx,jsx,js}"],
        darkMode: 'class',
        theme: {
          extend: {
            colors: {
              'primary': '#2563eb',
              'primary-dark': '#1d4ed8',
            },
          },
        },
        plugins: [],
      }