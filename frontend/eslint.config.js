import pluginJs from '@eslint/js';
import pluginPrettier from 'eslint-plugin-prettier';
import pluginReact from 'eslint-plugin-react';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

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
      'simple-import-sort': simpleImportSort,
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
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Group 1: Node.js built-in modules (e.g., `fs`, `path`), placed at the top
            ['^node:'],
            // Group 2: External libraries from node_modules (e.g., `react`, `axios`, `date-fns`)
            ['^react', '^@?\\w'],
            // Group 3: Internal imports (starting with @src or @components for instance)
            [
              '^@src',
              '^@Components',
              '^@Assets',
              '^@Utils',
              '^@Store',
              '^@Constants',
              '^@Hooks',
              '^@Api',
              '^@Schemas',
              '^@Services',
              '^@Queries',
              '^@Routes',
              '^@Views',
              '^@UserModule',
              '^@Validations',
            ],
            // Group 4: Parent imports (e.g., `../..`), sibling imports (`./`) and index imports
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'], // Parent imports
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'], // Sibling imports
            // Group 5: Style imports (e.g., `.css`, `.scss`)
            ['^.+\\.s?css$'],
          ],
        },
      ],
    },
  },
];
