const {defineConfig} = require("cypress")

module.exports = defineConfig({
  e2e: {
    env: {
      commandDelay: 500,
    },
    baseUrl: "https://example.cypress.io",
    fixturesFolder: false,
    watchForFileChanges: true,
    setupNodeEvents(on, config) {
      // on("file:preprocessor", () => {
      //   console.log('file:preprocessor')
      // })
    }
  },
})
