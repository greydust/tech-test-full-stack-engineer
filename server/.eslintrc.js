module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: "./tsconfig.eslint.json",
  },
  plugins: [
    '@typescript-eslint',
  ],
  env: {
    mocha: true,
  },
  extends: [
    'airbnb-typescript',
  ],
};