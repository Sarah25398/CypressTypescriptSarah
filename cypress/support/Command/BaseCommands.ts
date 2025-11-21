import { test, expect } from "@playwright/test";
import { defineConfig } from "cypress";
import { text } from "stream/consumers";

export class BaseCommands {
    visitPage(pageUrl: string) {
        return cy.visit(pageUrl).then(() => {
            cy.url().should('eq', pageUrl);
        })
    }

    getCyValue(element: string) {
        return cy.get(element).invoke('val');
    }
    typeIntoElement(element: string, text: string) {
        return cy.get(element)
            .should('be.visible')
            .focus()
            .clear({ force: true })
            .invoke('val', text)
            .trigger('input')
            .trigger('change')
            .should('have.text', text);
    }
    fillTextElement(element: string, text: string) {
        return this.getElement(element, true, true)
            .clear({ force: true })
            .type(text)
            .should('have.value', text);
    }

    getElement(element: string,
        filterElVisle: boolean,
        scrollToView: boolean
    ) {
        let cyChain = cy.get(element);
        filterElVisle ? cyChain.filterElVisible() : cyChain;
        scrollToView ? cyChain.scrollIntoView() : cyChain;
        return cyChain;
    }
    getElementText(element: string) {
        return this.getElement(element, true, true)
            .invoke('text');
    }
    getElementAttribute(element: string,
        attribute: string) {
        return cy.get(element).invoke('attr', attribute);
    }
    getElementListText(element: string) {
        return cy.get(element).then(($el) => {
            const texts: string[] = [];
            $el.each((index, el) => {
                texts.push(el.innerText.trim());
            });
            return texts;
        });
    }
    findElementByText(element: string
        , text: string
        , filterElVisle: boolean
        , scrollToView: boolean
    ) {
        let cyChain = cy.get(element).contains(text);
        filterElVisle ? cyChain.filterElVisible() : cyChain;
        scrollToView ? cyChain.scrollIntoView() : cyChain;
        return cyChain;
    }
    getTextListNotNull(element: string) {
        return cy.get(element).then(($el) => {
            const texts = Array.from($el)
                .map((el) => el.textContent?.trim())
                .filter((text) => text !== null
                    && text !== undefined
                    && text.length > 0);
            return texts;

        })
    }
    // add more commands 
    getElementByParentTag(element: string
        , textToFind: string
        , parentTag: string
        , elChild: string) {
        return cy.get(element)
            .contains(textToFind)
            .parents(parentTag)
            .find(elChild)
    }
    getUploadFile(element: string,
        scrollIntoView: boolean
    ) {
        const el = cy.get(element);
        return scrollIntoView ? el.scrollIntoView() : el;
    }
    clickElement(element: string) {
        return this.getElement(element, true, true).click();
    }
    verifyEnableAndClick(cyChain: Cypress.Chainable<JQuery<HTMLElement>>) {
        return cyChain
            .should('exist')
            .should('be.visible')
            .should('not.be.disabled')
            .click();
    }
    waitForTimeout(timeout: number): Promise<void> {
        return new Promise((resolve) => {
            cy.wait(timeout).then(() => {
                cy.log(`Waited for ${timeout}ms`);
                resolve();
            });
        });
    }
    forceCheckBox(element: string) {
        return this.getElement(element, true, true)
            .forceCheck();
    }

    selectDropdown(element: string
        , text: string
    ) {
        return this.getElement(element, true, true)
            .select(text, { force: true })
            .should('be.visible');
    }



}
