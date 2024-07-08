/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode : 'class',
  theme: {
    extend: {
      colors:{
        bgk_dark : '#000',
        txt_dark : '#fff',
        btn_dark : '#363636',
        bgk_light : '#fff',
        txt_light : '#000',
        btn_light : '#EFEFEF',
        btn_follow : '#0095f6',
        category_bio : '#a8a8a8',
        txt_all_small : '#8a8989',
        bgk_account_light : '#e6e6e640',
        bgk_account_dark : '#3e3d3d40',
        txt_promo : '#ff3040',
        border_color : '#ccc',
        txt_title : '#737373',
        bgk_suggested_dark : '#50505035',
        bgk_suggested_light : '#f3f3f3',
        bgk_hover_light : "#f2f2f2",
        bgk_hover_dark : "#1a1a1a",
      }
    },
  },
  plugins: [require("daisyui")]}