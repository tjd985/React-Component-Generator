module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "airbnb",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["dist", ".eslintrc.cjs", "*.spec.tsx"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: { react: { version: "detect" } },
  plugins: ["react-refresh"],
  rules: {
    semi: "warn",
    "no-unused-vars": "warn",
    "import/no-extraneous-dependencies": "off",
    "react/prop-types": "off",
    "react/button-has-type": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-no-bind": "off",
    "react/self-closing-comp": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": ["warn", { extensions: [".ts", ".tsx"] }],
    "no-param-reassign": 0,
    "no-underscore-dangle": "off",
    "no-restricted-syntax": ["error", "LabeledStatement", "WithStatement"],
    "no-useless-return": "off",
    "guard-for-in": "off",
    "consistent-return": "off",
    "no-shadow": "off",
    "no-await-in-loop": "off",
    "no-restricted-globals": "off",
    "react/no-unescaped-entities": "off",
    "no-continue": "off",
    "lines-between-class-members": "off",
    "no-use-before-define": "off",
  },
};
