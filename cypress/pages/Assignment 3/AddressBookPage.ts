import { BaseCommands } from "../../support/Command/BaseCommands";
import { PandaHomePageLocator } from "../../locators/Assignment 3/PandaHomePageLocator";
import { ExtendBaseCommands } from "../../support/Command/ExtendBaseCommands";
import { URL, validateURL } from "../../data/Enum/UrlEnum";
import { registerAccountData, addressBookData } from "../../data/DataTest/Assignment 3/RegisterAccountData";
import { addressBookPageLocator } from "../../locators/Assignment 3/AddressBookPageLocator";


export class AddressBookPage {
    baseCommands: BaseCommands;
    extendBaseCommands: ExtendBaseCommands;
    constructor() {
        this.baseCommands = new BaseCommands();
        this.extendBaseCommands = new ExtendBaseCommands();
    }

    clickAddressBook() {
        this.extendBaseCommands.clickChainElement(
            cy.get(addressBookPageLocator.addressMenu)
                .contains("Address Book")
        )
        cy.url({ timeout: 5000 }).should('include', 'customer/address/new');
        cy.log('Navigated to Address Book');
    }
    fillAddressRegister() {
        const fields: string[] = [
            addressBookPageLocator.firstName,
            addressBookPageLocator.middleName,
            addressBookPageLocator.lastName,
            addressBookPageLocator.company,
            addressBookPageLocator.phone,
            addressBookPageLocator.fax,
            addressBookPageLocator.street_1,
            addressBookPageLocator.street_2,
            addressBookPageLocator.city,
            addressBookPageLocator.zip,
        ];
        const values: string[] = [
            addressBookData.firstName,
            addressBookData.middleName,
            addressBookData.lastName,
            addressBookData.company,
            (addressBookData.phone).toString(),
            addressBookData.fax,
            addressBookData.street_1,
            addressBookData.street_2,
            addressBookData.city,
            addressBookData.zip,

        ];
        fields.forEach((field, index) => {
            const isNameField = field
                === addressBookPageLocator.firstName
                || field === addressBookPageLocator.middleName
                || field === addressBookPageLocator.lastName;
            if (isNameField) {
                cy.get(field).invoke('val').then((currentValue) => {
                    if (!currentValue || currentValue === '') {
                        this.baseCommands.fillTextElement(field, values[index]);
                    }
                    else {
                        cy.log(`Field ${field} already has a value: ${currentValue}`);
                    }
                })
            }
            else {
                this.baseCommands.fillTextElement(field, values[index]);
            }

            this.baseCommands.fillTextElement(field, values[index]);
        })
    }
    selectState() {
        this.baseCommands.selectDropdown(addressBookPageLocator.state, addressBookData.state);
    }
    clickAdressRegister() {
        this.baseCommands.clickElement(addressBookPageLocator.saveButton);
        this.baseCommands.waitForTimeout(5000);
        this.baseCommands.getElement(addressBookPageLocator.verifyMessage, true, true).should('contains.text', 'The address has been saved.');

    }

}
