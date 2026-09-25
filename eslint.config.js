import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
      // English pages live under /en — links must keep the visitor's language.
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "react-router-dom",
              importNames: ["Link", "NavLink"],
              message: "Use `import { Link } from '@/components/LocalizedLink'` so links keep the /en prefix on English pages.",
            },
          ],
        },
      ],
    },
  },
  {
    // The one place allowed to wrap react-router's Link.
    files: ["src/components/LocalizedLink.tsx", "src/components/NavLink.tsx"],
    rules: { "no-restricted-imports": "off" },
  },
);
