import { livePandaLocators } from "../../locators/Assignment_5/livePandaLoctor";
import { BaseCommands } from "../../support/Command/BaseCommands";
import { ExtendBaseCommands } from "../../support/Command/ExtendBaseCommands";
import { PandaHomePage } from "../Assignment 3/PandaHomePage";
export class LivePandaPage {
    baseCommands: BaseCommands;
    extendBaseCommands: ExtendBaseCommands;
    baseUrl: string;
    constructor(baseUrl: string) {
        this.extendBaseCommands = new ExtendBaseCommands();
        this.baseUrl = baseUrl;
        this.baseCommands = new BaseCommands();
    }
    navigateToLivePandaPage(extendUrl: string | null) {
        const fullUrl = `${this.baseUrl}${extendUrl}`;
        this.baseCommands.visitPage(fullUrl);
    }
    verifyLogoAtribute(expectedString: string[] = []): void {
        const attributedString: string[] = [];
        cy.get(livePandaLocators.livePandaLogo).then(($el) => {
            $el.each((_, el) => {
                cy.wrap(el).getAtribute('alt').then((attr) => {
                    cy.log(attr);
                    attributedString.push(attr as string);
                })
            })
        }).then(() => {
            expect(attributedString).to.deep.equal(expectedString);
        })
    }
    verifyLoginFunction(): void {
        cy.get('span').contains('Account').forceClick();
        this.baseCommands.findElementByText(livePandaLocators.loginElement, 'Log In', true, true).forceClick();
        this.getLoginText();
    }
    verifyCreateAnAccount() {
        cy.get(livePandaLocators.createAccountButton).contains('Create an Account').forceClick();
        cy.get(livePandaLocators.createAccountText)
            .contains('Create an Account')
            .verifyCssProperty('font-size', '24px')
        cy.get(livePandaLocators.requiredField).contains('* Required Fields')
            .verifyCssProperty('color', 'rgb(223, 40, 10)')

    }
    clicksortByPrice(): void {
        this.extendBaseCommands.clickChainElement(
            cy.get('a').contains('Mobile')
        )
        this.baseCommands.selectDropdown(livePandaLocators.sortByElement, 'Price')
    }
    verifyPriceSorting(): void {
        cy.get('.price').then(($el) => {
            const prices = [...$el]
                .filter((el) => !el.id.includes('old-price'))
                .map((el) => parseFloat(el.innerText.replace(/[^0-9.]/g, '')))
            const sortedPrices = [...prices].sort((a, b) => a - b);
            expect(prices).to.deep.equal(sortedPrices);
        })

    }
    getPriceNumbers(): Cypress.Chainable<number> {
        return cy.get('.product-info').first()
            .find('.price')
            .invoke('text')
            .then((text) => {
                return parseFloat(text.replace(/[^0-9.]/g, ''));
            })
    }

    clickAddToCartButton() {
        cy.get('.product-info').first().within(() => {
            cy.contains('Add to Cart').click();
        })
        this.extendBaseCommands.clickChainElement(
            cy.get(".cart")
        )
    }
    verifyAddedCartPrice() {
        this.getPriceNumbers().then((price) => {
            this.clickAddToCartButton();
            cy.get('.cart-price .price, .price').then(($el) => {
                const cartPrice = parseFloat($el.text().replace(/[^0-9.]/g, ''));
                expect(Math.round(cartPrice * 100) / 100).to.equal(Math.round(price * 100) / 100);
            })
        })

    }


    getLoginText(): void {
        this.baseCommands.getElementText(livePandaLocators.loginText).then((text) => {
            expect(text.trim()).to.equal('Login or Create an Account');

        })
    }



}
