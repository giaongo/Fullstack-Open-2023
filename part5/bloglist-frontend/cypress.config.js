// eslint-disable-next-line no-undef
const { defineConfig } = require('cypress');

// eslint-disable-next-line no-undef
module.exports = defineConfig({
  videoCompression: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl:'http://localhost:3000'
  },
  env: {
    BACKEND:'http://localhost:3003/api'
  }
});
