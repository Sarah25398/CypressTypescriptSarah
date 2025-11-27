import { BaseCommands } from "./BaseCommands";
import { Logger } from "../../support/Logs/CustomLog";
import { test, expect } from "@playwright/test";
export class ExtendBaseCommands extends BaseCommands {

    constructor() {
        super();
    }
    withinForm(selector: string, callback: () => void) {
        this.getElement(selector, true, true).within(() => {
            callback();
        })
    }
    withinCard(selector: string, callback: () => void) {
        this.getElement(selector, true, true).within(() => {
            callback();
        })
    }
    withinTable(selector: string, callback: () => void) {
        this.getElement(selector, true, true).within(() => {
            callback();
        })
    }
    withinList(selector: string, callback: () => void) {
        this.getElement(selector, true, true).within(() => {
            callback();
        })
    }
    clickChainElement<T extends HTMLElement>(cyChain: Cypress.Chainable<JQuery<T>>) {
        return cyChain
            .should('exist')
            .should('be.visible')
            .should('not.be.disabled')
            .click({ force: true });
    }
    


}   