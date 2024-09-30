import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import stylistic from "@stylistic/eslint-plugin";

export default [
  {
    settings: {
      react: {
        version: "detect"
      }
    }
  },
  {
    ignores: [
      "public",
      "src/frontend/components/dashboard/lib/react/polyfills",
      "babel.config.js",
      "webpack.config.js",
      "jest.config.js",
      "tsconfig.json",
      "src/frontend/js/lib/jqplot",
      "src/frontend/js/lib/jquery",
      "src/frontend/js/lib/plotly",
      "src/frontend/components/timeline",
      "fengari-web.js",
      "cypress.config.ts",
      "src/frontend/testing/**/*",
      "eslint.config.mjs"
    ]
  },
  { files: ["./src/frontend/**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.jest, ...globals.jquery } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  stylistic.configs["recommended-flat"],
  {
    rules: {
      "@typescript-eslint/no-unused-expressions": 0,
    }
  }
];