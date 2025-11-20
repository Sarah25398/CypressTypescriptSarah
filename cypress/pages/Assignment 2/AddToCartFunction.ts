import { BaseCommands } from "../../support/Command/BaseCommands";
import { addToCartLocator } from "../../locators/Assignment 2/AddToCartLocator";
import { addToCartFunctionData } from "../../data/DataTest/Assignement 2/AddToCartFunctionData";


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
            addToCartFunctionData.productNameTextLocator,
            true,
            true
        );

    }

}