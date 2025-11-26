import { BaseCommands } from "../../support/Command/BaseCommands";
import { PandaHomePageLocator } from "../../locators/Assignment 3/PandaHomePageLocator";
import { ExtendBaseCommands } from "../../support/Command/ExtendBaseCommands";
import { URL, validateURL } from "../../data/Enum/UrlEnum";

export class PandaHomePage {
    baseCommands: BaseCommands;
    extendBaseCommands: ExtendBaseCommands;
    constructor() {
        this.baseCommands = new BaseCommands();
        this.extendBaseCommands = new ExtendBaseCommands();
    }
    navigateToPandaHomePage() {
        this.baseCommands.visitPage(validateURL("tech_panda_url"));
    }
    getAccountIconLocator() {
        return this.baseCommands.getElByParent(
            PandaHomePageLocator.accountIcon
            , "Account"
            , "a[data-target-element]"
        )
    }
    clickPandaLogo() {
        this.getAccountIconLocator().forceClick();
    }
    verifyClickLoginButton() {
        this.baseCommands.clickElement(PandaHomePageLocator.loginButton);
        cy.url().should('include', '/customer/account/login/');
    }
    getPageTitle() {
        return cy.get('div.account-login')
            .children('.page-title')
            .find('h1')
            .invoke('text')
            .then((text) => {
                return text.trim();
            })
    }
}
