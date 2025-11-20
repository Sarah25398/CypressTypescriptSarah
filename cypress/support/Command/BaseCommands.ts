import { test, expect } from "@playwright/test";
import { defineConfig } from "cypress";
import { text } from "stream/consumers";

export class BaseCommands {
    visitPage(pageUrl: string) {
        return cy.visit(pageUrl).then(() => {
            cy.url().then((url) => {
                url === pageUrl
                    ? cy.log(`Navigated to ${pageUrl}`)
                    : cy.log(`Navigate to incorrect page`)
            })
        });
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
        return this.getElement(element, true, false)
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
}