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
        cy.wrap(this.productData.products).each((data: any) => {
            productPage.findProduct(data.name).then((product) => {
                cy.wrap(product).should("be.visible");
            });
            productPage.fillQty(data.name, String(data.quantity)).then((product) => {
                cy.wrap(product).should("have.value", String(data.quantity));
            });
            productPage.addToCart(data.name);
            cy.wait(1000); 
        });
        
        productPage.cartItem().then((cartItems) => {
            const expectedNames = this.productData.products.map((product: any) => product.name);
            expect(cartItems).to.have.length(expectedNames.length);
            expect(cartItems).to.deep.equal(expectedNames);
        });
        
        cy.get('.cart-preview.active').should('be.visible');
        productPage.cartProductQty().then((cartQty) => {
            const expectedQuantities = this.productData.products.map((product: any) => product.quantity);
            expect(cartQty).to.have.length(expectedQuantities.length);
            expect(cartQty).to.deep.equal(expectedQuantities);
        });
        productPage.clickProceedCheckoutButton();
        productPage.getHeaderTable();
        productPage.getImageInRow();
        productPage.compareDataProduct(); // compare data product and fixture test file 
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


