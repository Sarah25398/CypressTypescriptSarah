import { BaseCommands } from "../../support/Command/BaseCommands";
import { checkOutPageLocator } from "../../locators/Assignment 2/CheckoutPageLocator";

export class CheckoutPage {
    baseCommands: BaseCommands;
    constructor() {
        this.baseCommands = new BaseCommands();
    }
    enterPromoteCode(promoteCode: string) {
        this.baseCommands.fillTextElement(checkOutPageLocator.promoteCodeLocator, promoteCode);
    }
    applyPromoteCode() {
        this.baseCommands.verifyEnableAndClick(
            cy.get(checkOutPageLocator.applyCodeButton)
        )
    }
    verifyPromoteInfo(promoteInfo: string) {
        return cy.get(checkOutPageLocator.promoteInfoLocator, { timeout: 150000 })
            .should("be.visible")
            .then(($el) => {
                expect($el.text()).to.equal(promoteInfo);
            });
    }
    verifyDiscountNumber(discountNumber: string) {
        return this.baseCommands.getElementText(checkOutPageLocator.discountNumberLocator)
            .then(($el) => {
                expect($el).to.equal(discountNumber);
            })

    }
    clickPlaceOrderButton() {
        this.baseCommands.verifyEnableAndClick(
            cy.get("Button").contains("Place Order")
        )
    }
    selectCountryData(country: string) {
        this.baseCommands.selectDropdown("select", country);
    }
    checkConditionBox() {
        this.baseCommands.forceCheckBox(checkOutPageLocator.checkBoxCondition)
    }
    pressProceedCheckoutButton() {
        this.baseCommands.verifyEnableAndClick(
            cy.get("Button").contains("Proceed")
        )
    }
    getSucessCheckOutText(message1 :string, message2 :string) {
        cy.get(checkOutPageLocator.sucessCheckOutMessage)
            .invoke('text')
            .should('contain', message1)
            .and('contain', message1);
    }

    applyMultiplePromoteCode() {
        cy.fixture('promote-code.json').then((codes) => {
            codes.forEach((code: any) => {
                this.enterPromoteCode(code.code);
                this.applyPromoteCode();
                this.baseCommands.waitForTimeout(5000);
                const validateType = {
                    "valid": () => {
                        this.verifyPromoteInfo("Code applied ..!")
                        this.verifyDiscountNumber(code.discount);
                    },
                    "invalid": () => {
                        this.verifyPromoteInfo("Invalid code ..!");
                        this.verifyDiscountNumber(code.discount)

                    }
                }
                if (code.type in validateType) {
                    validateType[code.type as keyof typeof validateType]();
                }
                else {
                    cy.log("Invalid validate promote code type ")
                }

            })

        })
    }
}
