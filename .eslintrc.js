// @todo Needs to be aligned better with existing https://github.com/restreamio/restream-frontend/blob/master/tslint.json
//       For now it's mostly standard rules with some additions from CRA (https://github.com/facebook/create-react-app/blob/b3f8ef21a24f980244b64d41b86873c05eb97172/packages/eslint-config-react-app/index.js)
// @todo Add some plugins from Standard

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    warnOnUnsupportedTypeScriptVersion: true,
  },
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    // Some TS default rules tweaks
    '@typescript-eslint/no-inferrable-types': 0,

    // https://github.com/benmosher/eslint-plugin-import/tree/master/docs/rules
    'import/first': 'error',
    'import/no-amd': 'error',
    'import/no-webpack-loader-syntax': 'error',

    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
}
