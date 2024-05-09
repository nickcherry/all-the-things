// eslint-disable-next-line no-undef
module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['simple-import-sort', 'unused-imports'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-duplicate-imports': 'error',
    'react/display-name': 'off',
    'react-hooks/exhaustive-deps': [
      'warn',
      {
        additionalHooks: '(useDerivedValue|useAnimatedStyle)',
      },
    ],
    'no-shadow': 'error',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'unused-imports/no-unused-imports': 'error',
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: ['../*'],
            message: 'Prefer absolute imports using the `~` alias.',
          },
          {
            group: ['react-native-date-picker'],
            message:
              'Please use DatePicker from ~/component/datepicker/DatePicker instead',
          },
        ],
        paths: [
          {
            name: 'lodash',
            message: 'Import [module] from lodash/[module] instead',
          },
          {
            name: 'react-native',
            importNames: ['Text', 'Switch'],
            message: 'Please use component from ~/component instead.',
          },
          {
            name: 'react-native-gesture-handler',
            importNames: ['Switch'],
            message: 'Please use component from ~/component instead.',
          },
          {
            name: 'react-native-reanimated',
            importNames: ['useDerivedValue', 'useAnimatedStyle'],
            message: 'Please use hook from ~/hook/reanimated instead.',
          },
          {
            name: '@gorhom/bottom-sheet',
            importNames: ['BottomSheet', 'useBottomSheet'],
            message: 'Prefer ~/hook/useBottomSheet instead.',
          },
        ],
      },
    ],
  },
};
