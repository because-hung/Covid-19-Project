module.exports = {
    parserOptions: {
        parser: 'babel-eslint'
      },
      extends: [
        '@nuxtjs',
        'prettier/vue',
        'eslint:recommended',
        'plugin:nuxt/recommended',
        'plugin:prettier/recommended'
      ],
      plugins: ['prettier'],
      // 加入您專案的自訂規則
      rules: {
        'nuxt/no-cjs-in-config': 'off',
        'no-console': 'off',
        'no-debugger': 'off',
        'no-unused-expressions': 'off',
        'vue/no-v-html': 'off'
      }
  }