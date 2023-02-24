/*
| Developed by Starton
| Filename : index.js
*/

// Use the code and add rules for react-native-dotenv
module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
    "prettier",
  ],
  plugins: ["prettier", "import", "react", "react-hooks"],
  settings: {
    "import/ignore": ["react-native"],
    "import/no-unresolved": "on",
    "import/resolver": {
      node: {
        path: ["*"],
      },
    },
  },
  overrides: [
    {
      parser: "@typescript-eslint/parser",
      files: ["*.ts", "*.tsx", "*.d.tsx"], // Your TypeScript files extension
      // As mentioned in the comments, you should extend TypeScript plugins here,
      // instead of extending them outside the `overrides`.
      // If you don't want to extend any rules, you don't need an `extends` attribute.
      extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      plugins: ["@typescript-eslint"],
      parserOptions: {
        project: ["tsconfig.json"], // Specify it only for TypeScript files
        tsconfigRootDir: __dirname,
      },
      rules: {
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-misused-promises": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/unbound-method": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          { ignoreRestSiblings: true },
        ],
        "@typescript-eslint/no-unsafe-call": "off",
        // "@typescript-import/no-unresolved": "on",
      },
    },
  ],
  rules: {
    semi: ["error", "never"],
    "comma-dangle": ["error", "always-multiline"],
    "quote-props": ["error", "as-needed"],
    "no-unused-vars": "off",
    "no-import-unresolved": "on",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "parent",
          "sibling",
          "index",
          "internal",
          "object",
        ],
      },
    ],
    "import/no-unresolved": "off",
    "import/extensions": [
      "error",
      {
        js: "never",
        jsx: "never",
        svg: "always",
        ts: "never",
        tsx: "never",
      },
    ],
    "import/prefer-default-export": "off",
    "jsx-a11y/anchor-is-valid": "off",
    // 'jsx-a11y/label-has-associated-control': [
    // 	'error',
    // 	{
    // 		assert: 'either',
    // 	},
    // ],
    "jsx-a11y/label-has-for": "off",
    "react/jsx-props-no-spreading": "off",
    "react/no-children-prop": ["warn"],
    "react/jsx-no-leaked-render": ["warn", { validStrategies: ["ternary"] }],
    "react/jsx-filename-extension": ["warn", { extensions: [".ts", ".tsx"] }],
    "react/no-namespace": "off",
    "react/react-in-jsx-scope": "off",
    "react-hooks/exhaustive-deps": "warn",
    "prettier/prettier": [
      "error",
      {
        printWidth: 120,
        tabWidth: 4,
        useTabs: true,
        semi: false,
        singleQuote: true,
        quoteProps: "as-needed",
        jsxSingleQuote: true,
        trailingComma: "all",
        bracketSpacing: true,
        jsxBracketSameLine: false,
        arrowParens: "always",
        proseWrap: "preserve",
        htmlWhitespaceSensitivity: "css",
        endOfLine: "lf",
      },
    ],
  },
};
