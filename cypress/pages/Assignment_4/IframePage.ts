import { BaseCommands } from "../../support/Command/BaseCommands"; 
import {
    ExtendBaseCommands 

} from "../../support/Command/ExtendBaseCommands"; 
import 'cypress-iframe';
import { URL, validateURL } from "../../data/Enum/UrlEnum";  
import { assertStringIncludes } from "../../support/Assertions/CustomAssertions";
import {IframeHelper } from "../../support/IframeHelper";
import { iframeLocator } from "../../locators/Assignment_4/IframeLocator";
import { userSetCorrect, userSetIncorrect ,userSet} from "../../data/DataTest/Assignment_4/IframeData";


export class IframePage {
    baseCommands: BaseCommands
    extendBaseCommands: ExtendBaseCommands
    constructor() {
        this.baseCommands = new BaseCommands();
        this.extendBaseCommands = new ExtendBaseCommands();
    }
    navigateToIframePage() {
        this.baseCommands.visitPage(validateURL("iframe_url"));
    }
    renderIframe(url : string) {
        this.baseCommands.fillTextElement(
            iframeLocator.searchBoxInput, url
        );
        this.baseCommands.clickElement(iframeLocator.renderIframeButton);
        cy.frameLoaded(iframeLocator.iframeWindowLocator);
        IframeHelper.waitIframe(iframeLocator.iframeWindowLocator, 10000);
    }
    
    verifyMakeAppointment() {
        IframeHelper.getIframeBody(iframeLocator.iframeWindowLocator).within(() => {
            cy.get(iframeLocator.makeAppointmentButton, { timeout: 10000 })
                .should("be.visible")
                .click();
            cy.wait(3000); 
        });
        
        const userSets: userSet[] = [userSetIncorrect, userSetCorrect];
        
        userSets.forEach((userSet, index) => {
            
            cy.get(iframeLocator.iframeWindowLocator)
                .should('exist')
                .its('0.contentDocument')
                .should('exist')
                .its('body')
                .should('not.be.null')
                .should('be.visible')
                .then((body) => {
                    return cy.wrap(body);
                })
                .within(() => {
                    
                    cy.get(iframeLocator.userName, { timeout: 15000 })
                        .should("be.visible")
                        .clear()
                        .type(userSet.userName);
                    
                    cy.get(iframeLocator.passWord, { timeout: 15000 })
                        .should("be.visible")
                        .clear()
                        .type(userSet.passWord);
                    
                    cy.get(iframeLocator.loginButton, { timeout: 10000 })
                        .should("be.visible")
                        .click();
                    cy.wait(2000);
                    
                });
        });
    }
   


}