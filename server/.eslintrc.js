module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './server/tsconfig.eslint.json',
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
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['./server/test/**/*-test.ts'] },
    ],
    'no-underscore-dangle': [
      'error',
      { allow: ['__get__'] },
    ],
  },
};
