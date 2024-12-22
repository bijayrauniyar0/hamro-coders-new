const globals = require('globals');
const pluginJs = require('@eslint/js');
const tseslint = require('typescript-eslint');
const pluginPrettier = require('eslint-plugin-prettier');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      prettier: pluginPrettier.rules,
    },
    rules: {
      semi: ['error', 'always'],
      'no-unused-vars': 'error',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-console': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-unsafe-optional-chaining': 'warn',
      'import/no-import-module-exports': 'off',
      'object-curly-newline': 'off',
      'no-undef': 'off',
      'import/no-unresolved': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
];
