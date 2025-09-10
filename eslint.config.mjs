// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      'vue/multi-word-component-names': 0, // Disables the rule
      "vue/html-self-closing": ["error", {
      "html": {
        "void": "never",
        "normal": "always",
        "component": "always"
        },
        "svg": "always",
        "math": "always"
      }],
      "@typescript-eslint/no-explicit-any": "off",
    },
  }
)
