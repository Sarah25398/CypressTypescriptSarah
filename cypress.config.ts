import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // projectId: "u9p3q1",
    // baseUrl: "https://rahulshettyacademy.com/seleniumPractise/#/",
    setupNodeEvents(on, config) {
    },
    experimentalPromptCommand: true,
    // retries: {
    //   runMode: 2,
    //   openMode: 1
    // },
    video: false
  },
});





