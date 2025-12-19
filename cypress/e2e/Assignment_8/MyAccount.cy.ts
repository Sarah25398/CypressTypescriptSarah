import { MyAccountPage } from "../../pages/Assignment_8/MyAccountPage";
import { URL, getURL } from "../../data/Enum/UrlEnum";
import { generateData } from "../../utilities/GenerateDataUtils/DataUtils";


describe('Assignment 8', () => {
    let myAccountPage: MyAccountPage

    before(() => {
        myAccountPage = new MyAccountPage(getURL("my_account_url"));
        cy.viewport(1280, 720);
        myAccountPage.naviateToMyAccountPage("");
    })

    it('Verify register login test case', () => {
        myAccountPage.verifyMyAccountNavigate();

    })
})
