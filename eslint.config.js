import angular from "@angular-eslint/eslint-plugin";
import angularTemplate from "@angular-eslint/eslint-plugin-template";
import tseslint from "@typescript-eslint/eslint-plugin";
import tseslintParser from "@typescript-eslint/parser";
import angularParser from "@angular-eslint/template-parser";

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        project: "./tsconfig.json",
        createDefaultProgram: true,
      },
    },
    plugins: {
      "@angular-eslint": angular,
      "@typescript-eslint": tseslint,
    },
    rules: {
      "no-debugger": "error",
      "no-console": "warn",
      "@angular-eslint/component-selector": [
        "error",
        { "type": "element", "prefix": "app", "style": "kebab-case" }
      ],
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/no-unused-vars": "error"
    },
  },
  {
    files: ["**/*.html"],
    languageOptions: {
      parser: angularParser,
    },
    plugins: {
      "@angular-eslint/template": angularTemplate,
    },
    rules: {
      "@angular-eslint/template/no-any": "error",
    },
  },
];
