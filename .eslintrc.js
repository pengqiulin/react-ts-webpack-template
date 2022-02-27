module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/jsx-runtime'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  ignorePatterns: ['.*', 'config', 'public', 'node_modules', 'dist', 'tsconfig.json','typing.d.ts'], // 忽略指定文件夹或文件
  rules: {
    // 在这里添加需要覆盖的规则
    'react/function-component-definition': 0,
    quotes: ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-single'],
    '@typescript-eslint/semi': [2, 'never'],
    '@typescript-eslint/comma-dangle': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-explicit-any':'off',
    // '@typescript-eslint/no-unsafe-member-access':'off'
    //'react/jsx-one-expression-per-line': 'off'
  }
}
