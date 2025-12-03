import { LivePandaPage } from '../../pages/Assignment_5/LivePandaPage'
import { PandaHomePage } from '../../pages/Assignment 3/PandaHomePage';

describe("Live Panda", () => {
    let livePandaPage: LivePandaPage;
    let pandaHomePage: PandaHomePage;

    beforeEach(() => {
        pandaHomePage = new PandaHomePage();
        livePandaPage = new LivePandaPage("https://live.techpanda.org");
        livePandaPage.navigateToLivePandaPage('/index.php/mobile.html');
    });
    it("Verify Panda Mobile", () => {
        livePandaPage.verifyLogoAtribute(["Magento Commerce", "Magento Commerce"]);
        livePandaPage.verifyLoginFunction();
        livePandaPage.verifyCreateAnAccount();
        pandaHomePage.fillAllFields();
        pandaHomePage.clickRegisterButton();
        pandaHomePage.verifyRegistration();
        livePandaPage.clicksortByPrice();
        livePandaPage.verifyPriceSorting();
        livePandaPage.verifyAddedCartPrice();
    });
});
