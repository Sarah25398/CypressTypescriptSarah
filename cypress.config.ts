import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    projectId: "kdgrg9",
    // baseUrl: "https://rahulshettyacademy.com/seleniumPractise/#/",
    setupNodeEvents(on, config) {
    },
    chromeWebSecurity: false,
    pageLoadTimeout: 120000,
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    // baseUrl: 'https://rahulshettyacademy.com/seleniumPractise/#/',
    // viewportHeight: 1080,
    // viewportWidth: 1920,
    // chromeWebSecurity: false,
    experimentalPromptCommand: true,
    // retries: {
    //   runMode: 2,
    //   openMode: 1
    // },
    video: false,
    
  },
});





