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
    themes:["cupcake"] //ライドモード、ダークモード、個別指定の順
  }
}
