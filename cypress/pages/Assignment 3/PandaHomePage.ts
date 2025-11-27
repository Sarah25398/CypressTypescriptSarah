import { BaseCommands } from "../../support/Command/BaseCommands";
import { PandaHomePageLocator } from "../../locators/Assignment 3/PandaHomePageLocator";
import { ExtendBaseCommands } from "../../support/Command/ExtendBaseCommands";
import { URL, validateURL } from "../../data/Enum/UrlEnum";
import { registerAccountData } from "../../data/DataTest/Assignment 3/RegisterAccountData"
import { assertStringIncludes } from "../../support/Assertion/CustomAssertion";

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
    clickCreateAccount() {
        this.baseCommands.clickElement(PandaHomePageLocator.createAccountButton);
    }
    fillAllFields() {
        const registerFields: string[] = [
            PandaHomePageLocator.firstName
            , PandaHomePageLocator.middleName
            , PandaHomePageLocator.lastName
            , PandaHomePageLocator.email
            , PandaHomePageLocator.password
            , PandaHomePageLocator.confirmPassword
        ];
        const values: string[] = [
            registerAccountData.firstName
            , registerAccountData.middleName
            , registerAccountData.lastName
            , registerAccountData.email
            , registerAccountData.password
            , registerAccountData.password
        ];
        registerFields.forEach((field, index) => {
            const isPassField = field
                === PandaHomePageLocator.password
                || field === PandaHomePageLocator.confirmPassword;
            this.baseCommands.fillTextSecurity(field, values[index], isPassField);
        })
    }
    clickRegisterButton() {
        this.baseCommands.clickElement(PandaHomePageLocator.registerButton);
        cy.url({ timeout: 5000 }).should('include', '/customer/account/index');
    }
    verifyRegistration() {
        this.baseCommands
            .getElementText(PandaHomePageLocator.welcomeMessage)
            .then((text) => {
                assertStringIncludes(text, "Hello", "Welcome Message should contain 'Hello'");
            })
    }
}

