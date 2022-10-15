module.exports = {
  future: {},
  content: [
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  plugins: [require("daisyui")],
  theme: {
    extend: {},
  },
  variants: {},
  daisyui: {
    themes:["valentine"] //ライドモード、ダークモード、個別指定の順
  }
}
