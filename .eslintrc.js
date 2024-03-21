module.exports = {
  env: {
    es2024: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  extends: ["plugin:@typescript-eslint/recommended", "plugin:unicorn/all", "plugin:prettier/recommended"],
  plugins: ["unicorn"],
  rules: {
    "unicorn/prefer-event-target": "off",
  },
};
