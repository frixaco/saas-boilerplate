module.exports = {
  ...require("../../.prettierrc.js"),
  plugins: [
    ...require("../../.prettierrc.js").plugins,
    "prettier-plugin-tailwindcss",
  ],
  tailwindFunctions: ["clsx", "cn", "cva"],
}
