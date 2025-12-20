import { BaseCommands } from "../../support/Command/BaseCommands";
import { ExtendBaseCommands } from "../../support/Command/ExtendBaseCommands";
import { URL, validateURL } from "../../data/Enum/UrlEnum";
import { dataFactory } from "../../data/Factories/factoryUtility";
import { User } from "../../data/Factories/factoryUtility";
import { getUserData, initializeUserData, getCachedUserData } from "../../data/Factories/factoryUtility";
import { myAccountLocator } from "../../locators/MyAccountLocator";
import { verifyPassword } from "../../data/Factories/factoryUtility";  
import {TableHelper} from "../../support/TableHelper"


export class ShopAccount {
    tableHelper : TableHelper
    private Qty : string
    private baseUrl; 
    baseCommands: BaseCommands;
    extendBaseCommands: ExtendBaseCommands
    constructor(baseUrl: string) {
        this.tableHelper = new TableHelper("table tbody");
        this.Qty = "10"
        this.extendBaseCommands = new ExtendBaseCommands();
        this.baseUrl = baseUrl
        this.baseCommands = new BaseCommands();
    }
    navigateToShop(): void {
        this.baseCommands.clickElement(myAccountLocator.menuIcon)
        this.baseCommands.findElementByText(
            "a",
            "Shop",
            true,
            true
        ).then((element) => {
            cy.wrap(element).forceClick();
        })
        cy.url().then((url) => {
            url === `${this.baseUrl}/shop/`
                ? console.log("Navigated to Shop Page")
                : console.log("Not Navigated to Shop Page");

        })
    }
    clickSortingOrder(): void {
        this.baseCommands.selectDropdown("select.orderby", "price-desc");
        cy.wait(1000);
        cy.get('.products .price').then(($priceElements) => {
            const discountPrices: number[] = [];
            $priceElements.each((index, priceEl) => {
                const $priceEl = Cypress.$(priceEl);
                let discountPriceText: string;
                if ($priceEl.find('ins .amount').length > 0) {
                    discountPriceText = $priceEl.find('ins .amount').text();
                } else if ($priceEl.find('.amount').length > 0) {
                    discountPriceText = $priceEl.find('.amount').last().text();
                } else {
                    discountPriceText = $priceEl.text();
                }
                const cleanPrice = discountPriceText.replace(/[^0-9.]/g, '');
                const numericPrice = parseFloat(cleanPrice);
                if (!isNaN(numericPrice)) {
                    discountPrices.push(numericPrice);
                    cy.log(`Product ${index + 1} - Discount Price: ${discountPriceText} -> ${numericPrice}`);
                }
            });
            const sortedDiscountPrices = [...discountPrices].sort((a: number, b: number) => b - a);
            expect(discountPrices, 'Sorted Discount Prices')
                .to.deep.equal(sortedDiscountPrices);
            cy.log(`Original Discount Prices: [${discountPrices.join(', ')}]`);
            cy.log(`Sorted Discount Prices: [${sortedDiscountPrices.join(', ')}]`);
        });
    }
    addSeleniumProdToCart(): void {
        this.baseCommands.clickElement(myAccountLocator.seleniUmProd); 
        this.baseCommands.fillTextElement(".quantity input", this.Qty); 
        this.baseCommands.findElementByText(
            "button",
            "Add to basket",
            true,
            false
        ).then((element) => {
            cy.wrap(element).click();
        })
        this.baseCommands.getElementText(".woocommerce-message")
            .then((text) => {
                expect(text.trim()).to.equal(`View Basket ${this.Qty} × “Selenium Ruby” have been added to your basket.`);
            })
        
        this.baseCommands.findElementByText(
            "a",
            "View Basket",
            true,
            true
        ).then((element) => {
            cy.wrap(element).click();
        })
        cy.url().then((url) => {
            url === `${this.baseUrl}/basket/`
                ? console.log("Navigated to Cart Page")
                : console.log("Not Navigated to Cart Page");
        })
          
    }
    verifyBasketProd(): void { 
        this.baseCommands.getElementAttribute(
            '[type="number"]',
            "value"
        ).then((Qty) => {
            expect(Qty).to.equal(this.Qty);
        })
    }
    addJSproductToCart(): void {
        cy.get("h3")
            .contains("Mastering JavaScript")
            .parent()
            .siblings()
            .contains("Add to basket")
            .click();
        this.baseCommands.clickElement('[title="View Basket"]');
        cy.url().then((url) => {
            url === `${this.baseUrl}/basket/`
                ? console.log("Navigated to Cart Page")
                : console.log("Not Navigated to Cart Page");
        })
    }
    verifyQtyBasket(): void {
        this.tableHelper.getDetailCellData('tr').then((data) => {
            data.forEach((item) => {
                if (item.product === "Mastering JavaScript") {
                    expect(item.qty).to.equal(1);
                } else {
                    console.log(`Product: ${item.product}, Qty: ${item.qty}`);
                }
            });
        });
        //remove row of product 
        const removeFirstRow = () => {
            cy.get('body').then(($body) => {
                if ($body.find('table tbody tr').length > 0) {
                    cy.get('table tbody tr').first().find('a.remove').should('exist').click({ force: true });
                    cy.wait(2000); 
                    cy.get('body').then(($bodyAfter) => {
                        if ($bodyAfter.find('table tbody tr').length > 0) {
                            removeFirstRow(); 
                        }
                    });
                }
            });
        };
        removeFirstRow();
        this.baseCommands.getElementText(".cart-empty").then((text) => {
            expect(text.trim()).to.equal("Your basket is currently empty.");
        });
    }
        





}