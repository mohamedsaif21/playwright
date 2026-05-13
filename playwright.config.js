const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  timeout: 60000,

  fullyParallel: false,

  use: {
    baseURL: 'https://dev-sphere-phi.vercel.app',

    headless: false,

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    trace: 'on-first-retry'
  },

  reporter: [
    ['html'],
    ['list']
  ]
});