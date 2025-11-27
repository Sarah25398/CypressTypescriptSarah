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
import 'cypress-iframe';


// Handle uncaught exceptions - only suppress known non-critical errors
Cypress.on('uncaught:exception', (err) => {
  // returning false prevents Cypress from failing the test
  if (err.message.includes('postMessage')) {
    return false;
  }
  // allow other errors to fail tests
  return true;
});

import 'cypress-real-events/support';

