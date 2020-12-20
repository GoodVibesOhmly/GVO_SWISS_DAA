module.exports = {
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/flowtype',
    'prettier/react',
    'prettier/standard',
  ],
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-fragments': 0,
    'no-param-reassign': [
      2,
      {
        props: false,
      },
    ],
    'no-underscore-dangle': 0,
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 100,
        arrowParens: 'avoid',
      },
    ],
    'react/destructuring-assignment': 'off', // Seems to be way too restrictive
    'import/no-cycle': 1, // Should be addressed eventually but does not break
    'react/prop-types': 'off',
    'react/button-has-type': 'off',
    'no-case-declaration': 'off',
    'react/jsx-filename-extension': 'off',
    'react/no-unescaped-entities': 'off',
    'consistent-return': 'off',
    'no-use-before-define': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
  },
  env: {
    jest: true,
    browser: true,
  },
  globals: {
    FileReader: true,
    window: true,
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
