// @ts-nocheck
import { FlatCompat } from "@eslint/eslintrc";
import { default as eslint } from "@eslint/js";
import typescriptParser from "@typescript-eslint/parser";
// @ts-expect-error ImportPlugin is not typed apparently
import importPlugin from "eslint-plugin-import";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import reactPlugin from "eslint-plugin-react";
import reactNative from "eslint-plugin-react-native";
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
import tailwind from "eslint-plugin-tailwindcss";
import globals from "globals";
import path from "path";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "url";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...tseslint.config(
      eslint.configs.recommended,
      tseslint.configs.recommended,
    // @ts-expect-error Confirmed type error when using React ESlint with Typescript ESLint https://github.com/typescript-eslint/typescript-eslint/issues/8522
    reactRecommended,
    reactPlugin.configs.flat?.["jsx-runtime"],
    {
      files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"],
      settings: {
        react: {
          version: "detect",
        },
      },
      languageOptions: {
        parser: typescriptParser,
        globals: {
          ...globals.serviceworker,
          ...globals.browser,
        },
      },
    },
    {
      rules: {
        "@typescript-eslint/no-require-imports": [
          "off",
          {
            allow: ["^assets/.*$", "react-native-google-mobile-ads"],
          },
        ],
        "@typescript-eslint/no-duplicate-enum-values": "off",
      },
    },
    {
      files: ["design/**/*"],
      rules: {
        "@typescript-eslint/no-restricted-imports": [
          "error",
          {
            patterns: [
              {
                group: ["@/components/*", "components/*"],
                message: "Design can't import from components.",
              },
              {
                group: ["@/containers/*", "containers/*"],
                message: "Design can't import from containers.",
              },
            ],
          },
        ],
      },
    },
    {
      files: ["components/**/*"],
      rules: {
        "@typescript-eslint/no-restricted-imports": [
          "error",
          {
            patterns: [
              {
                group: ["@/containers/*", "containers/*"],
                message: "Components can't import from containers.",
              },
            ],
          },
        ],
      },
    },
    {
      plugins: { react: reactPlugin },
      rules: {
        "react/jsx-fragments": ["error", "syntax"],
      },
    },
    {
      plugins: {
        "react-native": reactNative,
      },

      rules: {
        "react-native/no-raw-text": 2,
      },
    },
    ...compat.extends("plugin:react-hooks/recommended"),
    eslintPluginPrettierRecommended,
    ...tailwind.configs["flat/recommended"],
    {
      plugins: {
        "import-plugin": importPlugin,
      },
      rules: {
        "import-plugin/newline-after-import": ["error", { count: 1 }],
        // TODO : Can't use this rule right now because it's bugged
        // Will activate it later when it's resolved
        // Source : https://github.com/import-js/eslint-plugin-import/issues/3079
        // "import-plugin/no-unused-modules": [
        //   "error",
        //   {
        //     unusedExports: true,
        //   },
        // ],
      },
    },
    {
      ignores: [
        "*.config.js",
        "*.config.mjs",
        "*.config.ts",
        "*-env.d.ts",
        "scripts/reset-project.js",
      ],
    },
  ),
];
