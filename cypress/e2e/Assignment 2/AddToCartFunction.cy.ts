import { AddToCartFunction } from "../../pages/Assignment 2/AddToCartFunction";
import { BaseCommands } from "../../support/Command/BaseCommands";

describe('Add to Cart Functionality', () => {

    let addToCartFunction: AddToCartFunction;
    let baseCommands: BaseCommands;
    beforeEach(() => {
        baseCommands = new BaseCommands();
        addToCartFunction = new AddToCartFunction();
        addToCartFunction.navigateToProductPage()
    });
    it('Verify go to correct page', () => {
        addToCartFunction.navigateToProductPage();

    });
    it('Verify product name', () => {
        addToCartFunction.findTextProduct();
    })
});