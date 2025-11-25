declare namespace Cypress {
    interface Chainable<Subject = any> {
        forceClick(options?: Partial<Cypress.ClickOptions>): Chainable
        forceCheck(options?: Partial<Cypress.ClickOptions>): Chainable
        filterElVisible(): Chainable<Subject>
        filterElNotVisible(): Chainable<Subject>
        filterElDisabled(): Chainable<Subject>
        filterElEnabled(): Chainable<Subject>
        waitVisibleAndClick(): Chainable<Subject>
        typeAfterClear(text: string): Chainable<Subject>
        waitVisible(): Chainable<Subject>
        waitNotVisible(): Chainable<Subject>
        waitEnabled(): Chainable<Subject>
        waitDisabled(): Chainable<Subject>
        waitNotDisabled(): Chainable<Subject>
        waitNotEnabled(): Chainable<Subject> 
        waitForAction(action: () => Cypress.Chainable<JQuery<HTMLElement>>, duration: number): Chainable<Subject>

    }
}
