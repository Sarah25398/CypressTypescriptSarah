# Custom Logging Commands Guide

## Overview
This guide explains how to use the custom logging commands in Cypress tests. These commands provide structured, readable logs that help with debugging and test reporting.

## Available Commands

### 1. `cy.logInfo(message, data?)`
Logs an informational message.

**Example:**
```typescript
cy.logInfo('Test started');
cy.logInfo('User data loaded', { userId: 123, username: 'testuser' });
```

**Output:**
```
[10:30:45 AM] ℹ️ INFO: Test started
[10:30:45 AM] ℹ️ INFO: User data loaded | Data: {"userId":123,"username":"testuser"}
```

---

### 2. `cy.logSuccess(message, data?)`
Logs a success message.

**Example:**
```typescript
cy.logSuccess('Login successful');
cy.logSuccess('Data saved', { recordId: 456 });
```

**Output:**
```
[10:30:45 AM] ✅ SUCCESS: Login successful
[10:30:45 AM] ✅ SUCCESS: Data saved | Data: {"recordId":456}
```

---

### 3. `cy.logWarning(message, data?)`
Logs a warning message.

**Example:**
```typescript
cy.logWarning('Element took longer than expected to load');
cy.logWarning('Using fallback method', { reason: 'Primary method failed' });
```

**Output:**
```
[10:30:45 AM] ⚠️ WARNING: Element took longer than expected to load
[10:30:45 AM] ⚠️ WARNING: Using fallback method | Data: {"reason":"Primary method failed"}
```

---

### 4. `cy.logError(message, error?)`
Logs an error message.

**Example:**
```typescript
cy.logError('Validation failed', { field: 'email', reason: 'Invalid format' });
cy.logError('Test failed', new Error('Something went wrong'));
```

**Output:**
```
[10:30:45 AM] ❌ ERROR: Validation failed | Error: {"field":"email","reason":"Invalid format"}
[10:30:45 AM] ❌ ERROR: Test failed | Error: Something went wrong
```

---

### 5. `cy.logStep(stepName)`
Logs a test step for better test flow visibility.

**Example:**
```typescript
cy.logStep('Step 1: Navigate to login page');
cy.logStep('Step 2: Enter credentials');
cy.logStep('Step 3: Submit form');
```

**Output:**
```
[10:30:45 AM] 📝 STEP: Step 1: Navigate to login page
[10:30:45 AM] 📝 STEP: Step 2: Enter credentials
[10:30:45 AM] 📝 STEP: Step 3: Submit form
```

---

### 6. `cy.logAction(action, element?, value?)`
Logs an action performed on an element.

**Example:**
```typescript
cy.logAction('click', 'button.submit');
cy.logAction('type', 'input[type="email"]', 'user@example.com');
cy.logAction('select', 'Country dropdown', 'Vietnam');
```

**Output:**
```
[10:30:45 AM] 🎯 ACTION: click on element: button.submit
[10:30:45 AM] 🎯 ACTION: type on element: input[type="email"] with value: "user@example.com"
[10:30:45 AM] 🎯 ACTION: select on element: Country dropdown with value: "Vietnam"
```

---

### 7. `cy.logAssertion(description, expected?, actual?)`
Logs an assertion with expected and actual values.

**Example:**
```typescript
cy.logAssertion('Text contains welcome message', 'Welcome', 'Welcome to our site');
cy.logAssertion('Item count matches', 5, 5);
```

**Output:**
```
[10:30:45 AM] ✓ ASSERTION: Text contains welcome message | Expected: "Welcome" | Actual: "Welcome to our site"
[10:30:45 AM] ✓ ASSERTION: Item count matches | Expected: 5 | Actual: 5
```

---

### 8. `cy.logPerformance(operation, duration)`
Logs a performance metric.

**Example:**
```typescript
cy.logPerformance('Page load', 1234);
cy.logPerformance('API call', 567);
```

**Output:**
```
[10:30:45 AM] ⏱️ PERFORMANCE: Page load took 1234ms
[10:30:45 AM] ⏱️ PERFORMANCE: API call took 567ms
```

---

### 9. `cy.logApi(method, url, status?)`
Logs an API call with method, URL, and status code.

**Example:**
```typescript
cy.logApi('GET', '/api/users', 200);
cy.logApi('POST', '/api/login', 401);
cy.logApi('PUT', '/api/settings');
```

**Output:**
```
[10:30:45 AM] ✅ API: GET /api/users - Status: 200
[10:30:45 AM] ❌ API: POST /api/login - Status: 401
[10:30:45 AM] ℹ️ API: PUT /api/settings
```

---

### 10. `cy.logNavigation(url)`
Logs page navigation.

**Example:**
```typescript
cy.logNavigation('https://example.com');
cy.logNavigation('https://example.com/about');
```

**Output:**
```
[10:30:45 AM] 🧭 NAVIGATION: Navigating to https://example.com
[10:30:45 AM] 🧭 NAVIGATION: Navigating to https://example.com/about
```

---

### 11. `cy.trackPerformance(operation, action)`
Tracks the performance of an operation automatically.

**Example:**
```typescript
cy.trackPerformance('Page load', () => {
    return cy.visit('https://example.com');
});

cy.trackPerformance('API call', () => {
    return cy.request('GET', 'https://api.example.com/users');
});
```

**Output:**
```
[10:30:45 AM] 📝 STEP: Starting: Page load
[10:30:45 AM] ⏱️ PERFORMANCE: Page load took 1234ms
```

---

## Best Practices

### 1. Use `logStep` for Test Structure
Break your tests into clear steps:
```typescript
it('Complete login flow', () => {
    cy.logStep('Step 1: Navigate to login page');
    cy.visit('/login');
    
    cy.logStep('Step 2: Enter credentials');
    cy.get('#username').type('user@example.com');
    cy.get('#password').type('password123');
    
    cy.logStep('Step 3: Submit form');
    cy.get('button[type="submit"]').click();
    
    cy.logStep('Step 4: Verify success');
    cy.url().should('include', '/dashboard');
    cy.logSuccess('Login completed successfully');
});
```

### 2. Use `logAction` for Element Interactions
Log all important user interactions:
```typescript
cy.logAction('click', 'Add to Cart button');
cy.get('button.add-to-cart').click();

cy.logAction('type', 'Search input', 'laptop');
cy.get('input[type="search"]').type('laptop');
```

### 3. Use `logAssertion` for Verifications
Document your assertions:
```typescript
cy.get('.product-name').invoke('text').then((text) => {
    cy.logAssertion('Product name displayed', 'Laptop', text);
    expect(text).to.contain('Laptop');
});
```

### 4. Use `logError` for Error Handling
Log errors without failing the test immediately:
```typescript
cy.wrap(null).then(() => {
    try {
        // Some operation
    } catch (error) {
        cy.logError('Operation failed', error);
        // Handle error or rethrow
    }
});
```

### 5. Use `trackPerformance` for Critical Operations
Track performance of important operations:
```typescript
cy.trackPerformance('Checkout process', () => {
    return cy.get('button.checkout').click()
        .then(() => cy.get('.order-confirmation').should('be.visible'));
});
```

### 6. Combine Logging with Test Flow
```typescript
describe('E2E Test', () => {
    beforeEach(() => {
        cy.logStep('Test setup');
        cy.logInfo('Initializing test data');
    });

    it('Complete flow', () => {
        cy.logStep('Starting test');
        
        cy.logAction('navigate', 'Home page');
        cy.visit('/');
        
        cy.logAction('click', 'Login link');
        cy.get('a.login').click();
        
        cy.logAssertion('Redirected to login', '/login', '/login');
        cy.url().should('include', '/login');
        
        cy.logSuccess('Test completed');
    });

    afterEach(() => {
        cy.logStep('Test cleanup');
    });
});
```

---

## Tips

1. **Don't over-log**: Use logging for important steps, not every single action
2. **Be descriptive**: Use clear, descriptive messages
3. **Include context**: Add relevant data when it helps debugging
4. **Use appropriate levels**: Use `logInfo` for general info, `logWarning` for concerns, `logError` for errors
5. **Performance tracking**: Use `trackPerformance` for operations you want to monitor

---

## Example Test with Logging

See `cypress/examples/LoggingExamples.cy.ts` for complete examples of all logging commands.


