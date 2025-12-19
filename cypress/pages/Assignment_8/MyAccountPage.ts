import { BaseCommands } from "../../support/Command/BaseCommands";
import { ExtendBaseCommands } from "../../support/Command/ExtendBaseCommands";
import { URL, validateURL } from "../../data/Enum/UrlEnum";
import { dataFactory } from "../../data/Factories/factoryUtility";
import { User } from "../../data/Factories/factoryUtility";
import { getUserData } from "../../data/Factories/factoryUtility";
import { myAccountLocator } from "../../locators/MyAccountLocator";
export class MyAccountPage {
    private baseCommands: BaseCommands
    extendBaseCommands: ExtendBaseCommands
    private baseUrl: string
    
    constructor(baseUrl: string) {
        this.extendBaseCommands = new ExtendBaseCommands();
        this.baseUrl = baseUrl;
        this.baseCommands = new BaseCommands();
    }
    naviateToMyAccountPage(extendUrl: string | null): void {
        const fullUrl = `${this.baseUrl}${extendUrl}`;
        cy.log(fullUrl)
        this.baseCommands.visitPage(fullUrl);
    }
    verifyMyAccountNavigate(): void {
        this.baseCommands.findElementByText(
            "a",
            "My Account",
            true,
            true
        ).then((element) => {
            cy.wrap(element).forceClick();
        })
        cy.url().then((url) => {
            url === `${this.baseUrl}/my-account/`
                ? console.log("Navigated to My Account Page")
                : console.log("Not Navigated to My Account Page");

        })

    }
}
