import { PandaHomePage } from "../../pages/Assignment 3/PandaHomePage";
import {
    BaseCommands
} from "../../support/Command/BaseCommands";
import { AddressBookPage } from "../../pages/Assignment 3/AddressBookPage";

describe("Panda Mobile", () => {
    let addressBookPage: AddressBookPage;
    let baseCommands: BaseCommands;
    let pandaHomePage: PandaHomePage;

    beforeEach(() => {
        addressBookPage = new AddressBookPage();
        baseCommands = new BaseCommands();
        pandaHomePage = new PandaHomePage();
        pandaHomePage.navigateToPandaHomePage();
    });

    it("Verify Panda Mobile", () => {
        pandaHomePage.clickPandaLogo();
        pandaHomePage.verifyClickLoginButton();
        pandaHomePage.getPageTitle().then((title) => {
            expect(title).to.equal("Login or Create an Account");
        })
        pandaHomePage.clickCreateAccount();
        pandaHomePage.fillNameField();
        pandaHomePage.fillAllFields();
        pandaHomePage.clickRegisterButton();
        pandaHomePage.verifyRegistration();
        addressBookPage.clickAddressBook();
        addressBookPage.fillAddressRegister();
        addressBookPage.selectState();
        addressBookPage.clickAdressRegister();

    });
});
