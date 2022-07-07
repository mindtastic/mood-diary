module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // Express recongizes the error handler by the number of arguments
    // the function accepts, so `next` should be defined in middleware
    // even if it is not used inside the handler. ESLint will complain
    // about unused vars, so we disable it by no-unused-vars rule.
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  },
};
