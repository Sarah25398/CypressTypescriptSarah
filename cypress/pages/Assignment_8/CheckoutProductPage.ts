
import { myAccountLocator } from "../../locators/MyAccountLocator";
import { MyAccountPage } from "./MyAccountPage";
import { getBillingKey } from "../../data/Factories/factoryUtility" 
import { TableHelper } from "../../support/TableHelper";

export class CheckoutProductPage extends MyAccountPage { 
tableHelper  = new TableHelper("table tfoot");
private parseAmount(text: string): number {
  return parseFloat(text.replace(/[^0-9.]/g, ''));
}
    private subTotalValue: number | null = null;
    private totalNetValue: number | null = null;
    goToShopPage(): void {
        this.verifyValidRegister();
        this.baseCommands.clickElement(myAccountLocator.menuIcon)
        this.baseCommands.findElementByText(
            "a",
            "Shop",
            true,
            true
        ).then((element) => {
            cy.wrap(element).click();
        })
        cy.url().then((url) => {
            url === `${this.baseUrl}/shop/`
                ? console.log("Navigated to My Account Page")
                : console.log("Not Navigated to My Account Page");
        }) 
    }
    selectSeleniumProd() : void {
        cy.get("h3")
            .contains("Selenium Ruby")
            .parent()
            .siblings()
            .contains("Add to basket").click();
        this.baseCommands.clickElement('[title="View Basket"]');
        this.baseCommands.waitForTimeout(2000);
        this.baseCommands.fillTextElement('.quantity input', '5');
        this.baseCommands.clickElement('[value="Update Basket"]');
        cy.wait(3000);
    }
    proceedCheckOut(): void {
        this.baseCommands.findElementByText(
            "a",
            "Proceed to Checkout",
            true,
            true
        ).then((element) => {
            cy.wrap(element).forceClick();
        })
    }
    fillBilling(): void {
        const billingLocator = [
            myAccountLocator.userName,
            myAccountLocator.lastName,
            myAccountLocator.company,
            myAccountLocator.phone,
            myAccountLocator.adress_1,
            myAccountLocator.city,
            myAccountLocator.zip
        ]
        const billingData = [
            getBillingKey('userName'),
            getBillingKey('lastName'),
            getBillingKey('company'),
            getBillingKey('phone'),
            getBillingKey('adress_1'),
            getBillingKey('city'),
            getBillingKey('zip')
        ]
        billingLocator.forEach((locator, index) => {
            this.baseCommands.fillTextElement(locator, String(billingData[index]));
        })  
    }
    verifyTaxData(taxRate : number): void { 
        this.baseCommands.getElement(".cart-subtotal .amount", true, true)
         .then((el) => {
             cy.wrap(el).invoke('text').then((text) => {
                 const total = this.parseAmount(text);
                 this.subTotalValue = total;
                 const expectedTotal = total * (1+taxRate);
                 this.baseCommands.getElement(".order-total .amount", true, true)
                 .then((el) => {
                     cy.wrap(el).invoke('text').then((text) => {
                         const actualTotal = this.parseAmount(text);
                         this.totalNetValue = actualTotal;
                         expect(actualTotal).to.closeTo(expectedTotal, 0.01);
                     })
                 })
                 
             })

         })
    }
    verifyTextForCountry(country : Record<string, number>): void {
        Object.entries(country).forEach(([key, value]) => {
            cy.get('#billing_country').select(key, { force: true });
            cy.wait(2000);
            this.verifyTaxData(value);
        })
    }
    selectState(state : string): void {
        cy.get('#billing_state').select(state, { force: true });

    }
    placeOrder(): void {
        this.baseCommands.getElement('#place_order',true,true).forceClick();
    }
    verifyTextOrder(): void {
        this.baseCommands.findElementByText(
            "a",
            "Selenium Ruby",
            true,
            true
        ).then((element) => {
            cy.wrap(element).should('be.visible');
        })
        this.tableHelper.getCheckOutData('tr').then((data) => {
            expect(data.subTotal).to.equal(this.subTotalValue);
            expect(data.totalNet).to.equal(this.totalNetValue);
        })

    }


}