module.exports = {
  extends: 'airbnb-base',
  parser: 'babel-eslint',
  plugins: [
    'flowtype',
  ],
  globals: {
    HTMLElement: true,
    window: true,
    document: true,
  }
};
