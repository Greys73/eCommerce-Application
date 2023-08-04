module.exports = {
  "env": {
      "browser": true,
      "es2021": true,
      "jest": true
  },
  "extends": [
    'airbnb-base',
    'airbnb-typescript/base',
    "eslint:recommended",
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended'
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module",
      "project": 'tsconfig.json',
      "tsconfigRootDir": __dirname,
  },
  "plugins": [
      "@typescript-eslint"
  ],
  "rules": {
      'no-console': 'off',
      'import/extensions': 'off',
      'import/prefer-default-export': 'off',
      '@typescript-eslint/no-explicit-any': 2,
      'max-len': ["error", { "code": 160, "ignoreStrings": true  }],
      'indent': ["error", 2,],
      'no-trailing-spaces': "error",
  },
  "ignorePatterns": ['.eslintrc.js','*.js']
}