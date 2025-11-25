
import { CustomTimeOutError, ValidationError } from "../support/CustomError";


Cypress.Commands.add('forceClick', {
    prevSubject: 'element',
}, (subject) => {
    return cy.wrap(subject).click({ force: true });
})

Cypress.Commands.add('forceCheck', {
    prevSubject: 'element',
}, (subject) => {
    return cy.wrap(subject).click({ force: true }).should('be.checked');
})

Cypress.Commands.add('filterElVisible', {
    prevSubject: 'element',
}, (subject) => {
    return cy.wrap(subject).should('be.visible');
})

Cypress.Commands.add('filterElVisible', {
    prevSubject: 'element',
}, (subject) => {
    return cy.wrap(subject).should('be.visible');
})

Cypress.Commands.add('filterElEnabled', {
    prevSubject: 'element',
}, (subject) => {
    return cy.wrap(subject).should('be.enabled');
})

Cypress.Commands.add('filterElNotVisible', {
    prevSubject: 'element',
}, (subject) => {
    return cy.wrap(subject).should('not.be.visible');
})

Cypress.Commands.add('typeAfterClear', {
    prevSubject: 'element',
}, (subject, text) => {
    return cy.wrap(subject).clear().type(text);
})

Cypress.Commands.add('waitVisibleAndClick', {
    prevSubject: ['element'],
}, (subject) => {
    return cy.wrap(subject).should('be.visible').click();
})
Cypress.Commands.add('waitForAction',
    (action, duration) => {
        const startTime = Date.now();
        return cy.wrap(null).then(() => {
            return action;

        }).then((result) => {
            const endTime = Date.now() - startTime
            if (endTime >= duration) {
                throw new CustomTimeOutError(duration, action.toString());
            }
            return result
        }
        )
    })
