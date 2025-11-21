import { BaseCommands } from "../../support/Command/BaseCommands";
import { addToCartLocator } from "../../locators/Assignment 2/AddToCartLocator";
import { addToCartFunctionData } from "../../data/DataTest/Assignement 2/AddToCartFunctionData";
import { checkOutPageLocator } from "../../locators/Assignment 2/CheckoutPageLocator";

export class AddToCartFunction {
    baseCommands: BaseCommands
    constructor() {
        this.baseCommands = new BaseCommands();
    }
    navigateToProductPage() {
        this.baseCommands.visitPage(Cypress.env('add-to-cart-url'));
    }
    findTextProduct() {
        this.baseCommands.findElementByText(
            addToCartLocator.productNameTextLocator,
            addToCartFunctionData.productNameText,
            true,
            true
        );
    }
    clickAddToCartButton() {
        this.baseCommands.getElementByParentTag(
            addToCartLocator.productNameTextLocator
            , "Cucumber - 1 Kg"
            , "div.product"
            , addToCartLocator.addToCartButton
        ).then((el) => {
            cy.wrap(el).click({ force: true });
        })
    }
    verifyAddedItem() {

    }
    verifyClicKCartIcon() {
        this.baseCommands.clickElement(
            addToCartLocator.cartIcon
        ).then(() => {
            return cy.get("div.cart-preview.active").should("be.visible");
        })
    }
    verifyItemAddedToCart() {
        this.baseCommands.getElementText(
            addToCartLocator.productItemAddedToCartLocator
        ).should("eq", addToCartFunctionData.productNameText);
    }
    clickProceedCheckoutButton() {
        this.baseCommands.verifyEnableAndClick(
            cy.get('button[type="button"]')
                .contains("PROCEED TO CHECKOUT")).then(() => {
                    cy.get(checkOutPageLocator.productDetailTable).should("be.visible");
                });

    }


}
