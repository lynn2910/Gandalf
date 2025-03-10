/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'media',
    theme: {},
    variants: {},
    plugins: [require("daisyui")],
    daisyui: {
        styled: true,
        themes: true,
        base: true,
        utils: true,
        logs: true,
        rtl: false,
        prefix: "",
    },
}