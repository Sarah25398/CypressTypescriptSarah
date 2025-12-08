import { ProductLocator } from "../../locators/Assignment_6/ProductPageLocator";
import { BaseCommands } from "../../support/Command/BaseCommands";
import {
    ExtendBaseCommands

} from "../../support/Command/ExtendBaseCommands";
import { TableHelper } from "../../support/TableHelper";


export class ProductPage {
    tableHelper: TableHelper
    private baseUrl: string
    baseCommands: BaseCommands
    extendBaseCommands: ExtendBaseCommands
    constructor(baseUrl: string) {
        this.tableHelper = new TableHelper("table.cartTable");
        this.baseUrl = baseUrl
        this.baseCommands = new BaseCommands();
        this.extendBaseCommands = new ExtendBaseCommands();
    }

    navigateToProductPage(extendUrl: string | null): void {
        const fullUrl = `${this.baseUrl}${extendUrl}`;
        this.baseCommands.visitPage(fullUrl);
    }

    findProduct(text: string): Cypress.Chainable<JQuery<HTMLElement>> {
        return this.baseCommands.findElementByText(
            ProductLocator.productTitle,
            text,
            true,
            true
        );
    }
    fillQty(text: string, number: string): Cypress.Chainable<JQuery<HTMLElement>> {
        return this.baseCommands.getElementByParentTag(
            ProductLocator.productTitle,
            text
            , "div.product"
            , ".quantity"
        ).then((el) => {
            cy.wrap(el).clear();
            cy.wrap(el).type(number).then(() => {
                const isToEqual: boolean = el.val() == number
                isToEqual ? cy.wrap(el).should('have.value', number) : cy.log('Data enterered not equal');
            });
        })
    }
    addToCart(text: string): Cypress.Chainable<JQuery<HTMLElement>> {
        {
            return this.baseCommands.getElementByParentTag(
                ProductLocator.productTitle,
                text
                , "div.product"
                , ProductLocator.addToCartButton
            ).then((el) => {
                cy.wrap(el).forceClick();
            })
        }
    }
    cartItem(): Cypress.Chainable<string[]> {
        return this.baseCommands.clickElement(ProductLocator.cartIcon).then(() => {
            return this.baseCommands
                .getElement(ProductLocator.productItemAddedToCartLocator, true, false)
                .then(($el) => {
                    const texts = Array.from($el)
                        .map((el) => el.textContent?.trim())
                        .filter((text): text is string => !!text && text.length > 0);
                    return texts;
                });
        });
    }
    cartProductQty() {
        return this.baseCommands
            .getElement(".cart-preview.active .product-total .quantity", true, false)
            .then(($el) => {
                const qtys = Array.from($el)
                    .map((el) => {
                        const cleanedQty = el.textContent?.replace(/Nos?\./, "").trim() ?? '';
                        return Number(cleanedQty)
                    }
                    )
                    .filter(cleanedQty => !isNaN(cleanedQty));
                return qtys;
            })
    }
    clickProceedCheckoutButton() {
        this.baseCommands.verifyEnableAndClick(
            cy.get('button[type="button"]')
                .contains("PROCEED TO CHECKOUT")).then(() => {
                    cy.get(ProductLocator.productDetailTable).should("be.visible");
                });

    }
    getHeaderTable(): void {
        this.tableHelper.getTableHeader("tr td b").then(($text) => {
            const expectedTexts = ["#", "Prodcut Name", "Quantiry", "Price", "Total"];
            const toEqual: boolean = expectedTexts === $text;
            toEqual ? cy.log("Table header is correct") : cy.log("Table header is not correct");
        })
    }
    getImageInRow(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('table tbody tr')
            .each(($el) => {
                cy.wrap($el).find('img').should('be.visible');
            })
    }
    getProductDetail() {
      return this.tableHelper.getCellData("tbody tr");
    }
    compareDataProduct() {
        cy.fixture('product-detail').then((data) => {
            this.getProductDetail().then((dataTable) => {
                expect(dataTable.length).to.deep.equal(data.products.length);
                data.products.forEach((expectedData: any, index: any) => {
                    const actualData = dataTable[index];
                    expect(actualData.product).to.equal(expectedData.name);
                    expect(actualData.qty).to.equal(expectedData.quantity);
                }
                )
            })
        
        });
    }
    
    loopInRows() {
        cy.get('table.cartTable tbody tr').each(($row, index) => {
            cy.wrap($row).find('td').eq(1).invoke('text').then(productName => {
                cy.wrap($row).find('td').eq(2).invoke('text').then(quantity => {
                    cy.wrap($row).find('td').eq(3).invoke('text').then(price => {
                        cy.wrap($row).find('td').eq(4).invoke('text').then(total => {
                            cy.log(`Row ${index + 1}: ${productName} - ${quantity} - ${price} - ${total}`);
                            //assert calculation 
                            const calcTotal = parseFloat(price) * parseInt(quantity);
                            expect(parseFloat(total)).to.equal(calcTotal);
                        });
                    });
                });
            });
        });

    }
    assertRows() {
        cy.fixture('product-detail').then((data) => {
            const length = data.products.length;
            cy.get('table.cartTable tbody tr').should('have.length', length);
        });
    }
    assertTotal() {
        let sum = 0;
        cy.get('table.cartTable tbody tr').each(($row, index) => {
            cy.wrap($row).find('td').eq(4).invoke('text').then(total => {
                sum += parseFloat(total);

            });
        }).then(() => {
            cy.get('.totAmt').invoke('text').then(text => {
                expect(parseFloat(text)).to.equal(sum);
            })
        });
    }
    verifyCountrySelect(country: string) {
        return cy.get('select').invoke('val').should('eq', country)

    }















}

