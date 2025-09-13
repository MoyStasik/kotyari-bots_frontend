// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  { ignores: ['.nuxt', '.output/', 'node_modules/'] },
  {
    rules: {
      'vue/multi-word-component-names': 0, // Disables the rule
      'vue/html-self-closing': 'off',
      "@typescript-eslint/no-explicit-any": "off",
      "semi": ["error", "always"],
    },
  }
);
