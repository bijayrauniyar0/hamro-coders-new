import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
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
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/forbid-prop-types': 'off',
      'react/prop-types': 'off',
      'no-unsafe-optional-chaining': 'warn',
      'import/no-import-module-exports': 'off',
      'react/function-component-definition': 'off',
      'react/jsx-filename-extension': 'off',
      'react/require-default-props': 'off',
      'object-curly-newline': 'off',
      'no-undef': 'off',
      'import/no-unresolved': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
];
