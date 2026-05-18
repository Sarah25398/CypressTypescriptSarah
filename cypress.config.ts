import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    projectId: "kdgrg9",
    chromeWebSecurity: false,
    pageLoadTimeout: 120000,
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    video: false,
    retries: {
      runMode: 1,
      openMode: 1,
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: true,
      html: true,
      json: true,
      timestamp: 'mmddyyyy_HHMMss',
      reportTitle: 'Cypress Test Report',
      charts: true,
      code: true,
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false
    },
    
    setupNodeEvents(on, config) {
      // Initialize Mochawesome reporter plugin
      // This must be called first - it sets up its own before:run hook
      
      return config;
    }
  }
});