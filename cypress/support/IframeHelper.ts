

export class IframeHelper {
    static getIframeBody(iframeSelector: string) {
        return cy.get(iframeSelector)
            .should('exist')
            .its('0.contentDocument')
            .should('exist')
            .its('body')
            .should('not.be.null')
            .should('be.visible')
            .then((body) => {
                // Ensure we have a valid body element
                if (!body) {
                    throw new Error('Iframe body is null or undefined');
                }
                return cy.wrap(body);
            });
    }
    static findElInIframe(iframeSelector: string, elementSelector: string) {
        return this.getIframeBody(iframeSelector)
            .find(elementSelector);
    }
    static typeElInIframe(iframeSelector: string, cyChain: Cypress.Chainable<JQuery<HTMLElement>>) {
        return this.getIframeBody(iframeSelector)
            .within(() => {
                cyChain
            })
    }
    static findElInIframeAndClick(iframeSelector: string, elementSelector: string) {
        return this.getIframeBody(iframeSelector)
            .within(() => {
                cy.get(elementSelector).click();
            })
    }
    static waitIframe(iframeLocator: string, timeout: number = 10000) {
        return cy.get(iframeLocator, { timeout })
            .should('be.visible')
            .its('0.contentDocument.body')
            .should('be.visible', { timeout })
    }
    static getTextInIframe(iframeSelector: string, elementSelector: string) {
        return this.getIframeBody(iframeSelector)
            .find(elementSelector)
            .invoke('text');
    }
    static getIframeDocument(iframeSelector: string) {
        return cy.get(iframeSelector)
            .its('0.contentDocument')
            .should('be.visible')
            .then((cyBoday) => cy.log(cyBoday));
    }

}
    
