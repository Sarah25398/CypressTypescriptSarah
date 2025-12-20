import { BaseCommands } from "../../support/Command/BaseCommands";
import { ExtendBaseCommands } from "../../support/Command/ExtendBaseCommands";
import { URL, validateURL } from "../../data/Enum/UrlEnum";
import { dataFactory } from "../../data/Factories/factoryUtility";
import { User } from "../../data/Factories/factoryUtility";
import { getUserData, initializeUserData, getCachedUserData } from "../../data/Factories/factoryUtility";
import { myAccountLocator } from "../../locators/MyAccountLocator";
import { verifyPassword } from "../../data/Factories/factoryUtility";
export class MyAccountPage {

    baseCommands: BaseCommands
    extendBaseCommands: ExtendBaseCommands
    baseUrl: string
    email: string
    passWord: string

    constructor(baseUrl: string) {
        this.extendBaseCommands = new ExtendBaseCommands();
        this.baseUrl = baseUrl;
        this.baseCommands = new BaseCommands();
        const userData = getCachedUserData();
        this.email = userData.email;
        this.passWord = userData.password;
    }
    naviateToMyAccountPage(extendUrl: string | null): void {
        const fullUrl = `${this.baseUrl}${extendUrl}`;
        cy.log(fullUrl)
        this.baseCommands.visitPage(fullUrl);
    }
    verifyMyAccountNavigate(): void {
        this.baseCommands.clickElement(myAccountLocator.menuIcon)
        this.baseCommands.findElementByText(
            "a",
            "My Account",
            true,
            true
        ).then((element) => {
            cy.wrap(element).forceClick();
        })
        cy.url().then((url) => {
            url === `${this.baseUrl}/my-account/`
                ? console.log("Navigated to My Account Page")
                : console.log("Not Navigated to My Account Page");

        })
    }
    verifyRegisterInvalid(): void {
        this.baseCommands
            .clickElement(myAccountLocator.registerButton);
        this.baseCommands
            .getElementText(myAccountLocator.woocommerceError)
            .then((text) => {
                expect(text.trim())
                    .to.equal('Error: Please provide a valid email address.');
        })
        this.baseCommands
            .fillTextElement(myAccountLocator.regEmail, getUserData('email'))
        this.baseCommands
            .clickElement(myAccountLocator.registerButton);
        this.baseCommands
            .getElementText(myAccountLocator.woocommerceError)
            .then((text) => {
            expect(text.trim()).to.equal('Error: Please enter an account password.');
        })
    }
    verifyValidRegister(): void { 
        this.baseCommands
            .fillTextElement(myAccountLocator.regEmail, this.email);
        verifyPassword(this.passWord, 'strong')
            && this.baseCommands
            .fillTextElement(myAccountLocator.regPassword, this.passWord) 
        this.baseCommands
            .getElement(myAccountLocator.registerButton, true, true)
            .click();
        cy.wait(3000);
        cy.get('body').then(($body) => {
            const hasError = $body.find(myAccountLocator.woocommerceError).length > 0;
            if (hasError) {
                cy.get(myAccountLocator.woocommerceError).invoke('text').then((errorText) => {
                    cy.log(`Registration error : ${errorText}`);
                    if (errorText.includes('already registered') || errorText.includes('already exists') || errorText.includes('An account is already registered')) {
                        cy.log('User already exists, attempting to login instead...');
                        this.baseCommands.fillTextElement(myAccountLocator.loginEmail, this.email);
                        this.baseCommands.fillTextElement(myAccountLocator.loginPass, this.passWord);
                        this.baseCommands.clickElement(myAccountLocator.loginButton);
                    }
                });
            }
        });
        cy.get('.woocommerce-MyAccount-navigation', { timeout: 10000 })
            .should('exist')
            .should('be.visible');
    }
    loginInvalidCreds(): void { 
        let string = `${Math.random().toString(36).substring(2, 10)}gmail.com`
        this.baseCommands
            .fillTextElement(myAccountLocator.loginEmail, string)
        this.baseCommands
            .fillTextElement(myAccountLocator.loginPass, getUserData('password'))
        this.baseCommands
            .clickElement(myAccountLocator.loginButton);
        this.baseCommands
            .getElementText(myAccountLocator.woocommerceError)
            .then((text) => {
                cy.log(text)
            expect(text.trim())
                .to.equal(`Error: The username ${string} is not registered on this site. If you are unsure of your username, try your email address instead.`);
        })
    }
    loginValidCreds(): void { 
        this.baseCommands.fillTextElement(myAccountLocator.loginEmail, this.email);
        this.baseCommands.fillTextElement(myAccountLocator.loginPass, this.passWord);
        this.baseCommands.clickElement(myAccountLocator.loginButton);
        this.baseCommands
            .getElement('.woocommerce-MyAccount-navigation', true, true)
            .should('be.visible');
    }


}
