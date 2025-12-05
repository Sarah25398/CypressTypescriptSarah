import { ProductPage } from "../../pages/Assignment_6/ProductPage";
import { ProductLocator } from "../../locators/Assignment_6/ProductPageLocator";
import { CheckoutPage } from "../../pages/Assignment 2/CheckoutPage"

import { addToCartFunctionData } from "../../data/DataTest/Assignement 2/AddToCartFunctionData";

describe("Product Page", () => {
    let productPage: ProductPage;
    let checkoutPage: CheckoutPage

    beforeEach(() => {
        checkoutPage = new CheckoutPage();
        cy.fixture('product-detail').as('productData');
        productPage = new ProductPage(Cypress.env('add-to-cart-url'));
        productPage.navigateToProductPage("");
    });
    it("Verify Product Page", function () {
        this.productData.products.forEach((data: any) => {
            productPage.findProduct(data.name).then((product) => {
                cy.wrap(product).should("be.visible");
            });
            productPage.fillQty(data.name, data.quantity).then((product) => {
                cy.wrap(product).should("have.value", data.quantity);
            });
            productPage.addToCart(data.name).then(() => {
                cy.log(`${data.quantity} ${data.name} added to cart`);
            });
        });
        productPage.cartItem().then((cartItems) => {
            const expectedNames = this.productData.products.map((product: any) => product.name);
            expect(cartItems).to.have.length(expectedNames.length);
            expect(cartItems).to.deep.equal(expectedNames);

        });
        productPage.clickProceedCheckoutButton();
        productPage.getHeaderTable();
        productPage.getImageInRow();
        productPage.loopInRows();
        productPage.assertRows();
        productPage.assertTotal();
        checkoutPage.clickPlaceOrderButton();
        cy.url().should('include', '/country')
        checkoutPage.selectCountryData("Vietnam");
        checkoutPage.verifyCountrySelect("Vietnam");
        checkoutPage.pressProceedCheckoutButton();
        checkoutPage.verifyWarningMessage();
        checkoutPage.checkConditionBox();
        checkoutPage.pressProceedCheckoutButton();
        checkoutPage
            .getSucessCheckOutText(addToCartFunctionData.messageCheckOut1
                , addToCartFunctionData.messageCheckOut2);

    });


});

