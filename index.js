// @ts-check
import nodStudioConfigReactNative from "@nodstudio/eslint-config-react-native";

export default [
  ...nodStudioConfigReactNative,
  {
    files: ["@design/**/*", "@/design/**/*", "design/**/*", "src/design/**/*"],
    rules: {
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@components/**/*",
                "@/components/**/*",
                "components/**/*",
                "src/components/**/*",
              ],
              message: "Design can't import from components.",
            },
            {
              group: [
                "@containers/**/*",
                "@/containers/**/*",
                "containers/**/*",
                "src/containers/**/*",
              ],
              message: "Design can't import from containers.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["@components/**/*", "@/components/**/*", "components/**/*", "src/components/**/*"],
    rules: {
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@containers/**/*",
                "@/containers/**/*",
                "containers/**/*",
                "src/containers/**/*",
              ],
              message: "Components can't import from containers.",
            },
          ],
        },
      ],
    },
  },
  {
    ignores: ["*-env.d.ts", "scripts/reset-project.js"],
  },
];
