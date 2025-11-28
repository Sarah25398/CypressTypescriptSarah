import { IframePage } from "../../pages/Assignment_4/IframePage";
import { iframeLocator } from "../../locators/Assignment_4/IframeLocator";

describe("Iframe Test", () => {
    let iframePage: IframePage;

    beforeEach(() => {
        iframePage = new IframePage();
        iframePage.navigateToIframePage();
    });

    it("Verify Iframe", () => {
        iframePage.renderIframe("https://katalon-demo-cura.herokuapp.com/#appointment");
    });
});