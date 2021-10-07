module.exports = {
  plugins: [
    'react-hooks'
  ],
  parser: 'babel-eslint',
  env: {
    jest: true,
  },
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
  },
  globals: {
    fetch: false
  }
};
