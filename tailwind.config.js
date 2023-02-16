/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './src/client/components/**/*.{ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
    },
    safelist: [
        'border',
        'border-2',
        'border-sky-400',
        'border-sky-800/50'
    ],
    plugins: [],
}
