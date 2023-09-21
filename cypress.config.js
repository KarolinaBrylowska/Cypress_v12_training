const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    baseUrl: 'http://localhost:4200',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}', //all of these I can find in documentation in configuration
    excludeSpecPattern: ['**/1-getting-started/*','**/2-advanced-examples/*'], //two folders that we want do exclude
    //from execution
  },
})
