/** @format */

module.exports = {
  root: true,
  env: {
    node: true,
    commonjs: true,
    es6: true,
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  extends: ['plugin:prettier/recommended'],
  parser: 'babel-eslint', // 解析器用于解析代码
  parserOptions: { parser: 'babel-eslint' },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  },
};
