import { MyAccountPage } from "../../pages/Assignment_8/MyAccountPage";
import { URL, getURL } from "../../data/Enum/UrlEnum";
import { generateData } from "../../utilities/GenerateDataUtils/DataUtils";
import { initializeUserData } from "../../data/Factories/factoryUtility";


describe('Assignment 8', () => {
    let myAccountPage: MyAccountPage

    beforeEach(() => {
        initializeUserData();
        myAccountPage = new MyAccountPage(getURL("my_account_url"));
        myAccountPage.naviateToMyAccountPage("");
        myAccountPage.verifyMyAccountNavigate();

    })

    it('Verify register login test case', () => {
        myAccountPage.verifyRegisterInvalid(); 
        myAccountPage.verifyValidRegister();
    });
    
    it('Verify login test case with invalid credentials', () => {
       myAccountPage.loginInvalidCreds();
    });
    
    it('Verify login test case with valid credentials', () => {
        myAccountPage.loginValidCreds();
    });
})
