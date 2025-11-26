import { PandaHomePage } from "../../pages/Assignment 3/PandaHomePage";
import {
    BaseCommands
} from "../../support/Command/BaseCommands";

describe("Panda Mobile", () => {
    let baseCommands: BaseCommands;
    let pandaHomePage: PandaHomePage;

    beforeEach(() => {
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
    });
});
