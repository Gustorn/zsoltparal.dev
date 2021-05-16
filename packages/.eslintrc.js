module.exports = {
  root: true,
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/all",
    "plugin:react-hooks/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
  ],
  plugins: ["simple-import-sort"],
  rules: {
    "simple-import-sort/imports": "error",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "import/no-unresolved": "off",
    "react/no-danger": "off",
    "react/jsx-no-literals": "off",
    "react/jsx-max-depth": "off",
    "react/jsx-sort-props": "off",
    "react/jsx-no-bind": "off",
    "react/button-has-type": "off",
    "react/no-unescaped-entities": "off",
    "react/jsx-props-no-spreading": "off",
    "react/forbid-component-props": "off",
    "react/jsx-filename-extension": "off",
    "react/react-in-jsx-scope": "off",
    "react-hooks/exhaustive-deps": [
      "warn",
      { enableDangerousAutofixThisMayCauseInfiniteLoops: true },
    ],
  },
  overrides: [
    {
      files: ["*.stories.tsx"],
      rules: {
        "react/function-component-definition": "off",
      },
    },
  ],
};
