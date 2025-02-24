import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config} */
export default {
  // Specify the environments
  env: {
    browser: true,
    es2021: true,
  },
  // Extend recommended configurations
  extends: [
    "eslint:recommended",
    "plugin:react/recommended", // React-specific rules
  ],
  // Define parser options
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  // Add plugins
  plugins: ["react"],
  // Define global variables
  globals: {
    ...globals.browser, // Include browser globals (e.g., `window`, `document`)
  },
  // Define custom rules
  rules: {
    "no-unused-vars": "warn", // Warn for unused variables
    "no-undef": "warn",       // Warn for undefined variables
    "react/react-in-jsx-scope": "off", // Disable React in scope for JSX (not needed in React 17+)
  },
};
