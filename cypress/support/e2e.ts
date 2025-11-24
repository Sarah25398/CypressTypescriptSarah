// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import '../utilities/CustomCommands';
// Handle uncaught exceptions - only suppress known non-critical errors
Cypress.on('uncaught:exception', (err, runnable) => {
    // Suppress specific known errors that don't affect test execution
    if (err.message.includes('ResizeObserver loop limit exceeded') ||
        err.message.includes('Non-Error promise rejection captured')) {
        return false;
    }
    // Let other errors fail the test
    return true;
})
import 'cypress-real-events/support'; 