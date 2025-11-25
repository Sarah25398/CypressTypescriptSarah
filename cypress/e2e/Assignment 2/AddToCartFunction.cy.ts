import { AddToCartFunction } from "../../pages/Assignment 2/AddToCartFunction";
import { BaseCommands } from "../../support/Command/BaseCommands";
import { CheckoutPage } from "../../pages/Assignment 2/CheckoutPage";
import { addToCartFunctionData } from "../../data/DataTest/Assignement 2/AddToCartFunctionData";
import { Logger } from "../../support/Logs/CustomLog";
import { getCountry, Country } from "../../data/Enum/CountryEnum";

describe('Add to Cart Functionality', () => {
    let logger: Logger
    let addToCartFunction: AddToCartFunction;
    let baseCommands: BaseCommands;
    let checkoutPage: CheckoutPage;
    beforeEach(() => {
        logger = new Logger();
        checkoutPage = new CheckoutPage();
        baseCommands = new BaseCommands();
        addToCartFunction = new AddToCartFunction();
        addToCartFunction.navigateToProductPage()
    });
    it.only('Add to Cart', () => {
        cy.log(getCountry('MEXICO'));
        logger.logStep('Find text cucumber and get add to cart button');
        addToCartFunction.clickAddToCartButton();
    })
    it('Verify Added Item with trial step ', () => {
        addToCartFunction.clickAddToCartButton();
        addToCartFunction.verifyClicKCartIcon();
        addToCartFunction.verifyItemAddedToCart();
        addToCartFunction.clickProceedCheckoutButton();
        checkoutPage.enterPromoteCode("23123");
        checkoutPage.applyPromoteCode();
        checkoutPage.verifyPromoteInfo("Invalid code ..!");
        checkoutPage.verifyDiscountNumber("0%");
    })
    it('Verify Apply Multiple codes and E2E flow ', () => {
        addToCartFunction.findTextProduct()
            .should('be.visible')
            .and('contain.text', addToCartFunctionData.productNameText);
        addToCartFunction.clickAddToCartButton();
        addToCartFunction.verifyClicKCartIcon();
        addToCartFunction.verifyItemAddedToCart();
        addToCartFunction.clickProceedCheckoutButton();
        checkoutPage.applyMultiplePromoteCode();
        checkoutPage.clickPlaceOrderButton();
        checkoutPage.selectCountryData("Vietnam");
        checkoutPage.checkConditionBox();
        checkoutPage.pressProceedCheckoutButton();
        checkoutPage
            .getSucessCheckOutText(addToCartFunctionData.messageCheckOut1
                , addToCartFunctionData.messageCheckOut2);
    })
});
