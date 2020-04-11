module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["react-app", "prettier", "plugin:react-redux/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "prettier", "react-redux"],
  rules: {
    "jsx-quotes": ["warn", "prefer-double"],
    "semi-style": ["warn", "last"],
    "no-plusplus": "off",
    "eol-last": "warn",
    "max-len": ["warn", 80, { ignoreUrls: true, ignoreStrings: true }],
    "no-tabs": "off",
    indent: ["warn", 2],
    "no-console": "off",
    "prettier/prettier": [
      "error",
      {
        doubleQuote: true,
        endOfLine: "auto",
      },
    ],
    "import/prefer-default-export": "off",
    "import/no-named-as-default": "off",
    "import/extensions": "off",
    "import/no-unresolved": "off",
    "react/jsx-filename-extension": [
      "warn",
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "react/jsx-props-no-spreading": "off",
    "react-redux/prefer-separate-component-file": "off",
  },
}
