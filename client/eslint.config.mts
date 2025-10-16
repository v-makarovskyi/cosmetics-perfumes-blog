import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import css from "@eslint/css";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,mts,cts,ts,jsx,tsx}"],
    plugins: { js },
    extends: [js.configs.recommended],
    languageOptions: { ecmaVersion: "latest", globals: { ...globals.browser } },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: [css.configs.recommended],
  },
  {
    files: ["**/*.{js,ts,tsx,jsx}"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);
