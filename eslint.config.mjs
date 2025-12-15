import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import standard from "eslint-config-standard";
import typescript from "eslint-config-standard-with-typescript";
import react from "eslint-plugin-react";
import hooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  {
    ...standard,
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        browser: true,
        jest: true,
      },
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    ...typescript,
    languageOptions: {
      parserOptions: { project: "./tsconfig.json" },
    },
    
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "semi": ["error", "never"],
      "@typescript-eslint/semi": ["error", "never"],
      "react/jsx-props-no-spreading": "off",
    },
  },
  {
    files: ["**/*.jsx", "**/*.tsx"],
    settings: {
      react: { version: "detect" },
    },
    plugins: {
      react,
      "react-hooks": hooks,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...hooks.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
    },
  },
  ...nextVitals,
  ...nextTs,
  {
    ...prettier,
    files,
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
