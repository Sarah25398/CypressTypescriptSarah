import { MyAccountPage } from "../../pages/Assignment_8/MyAccountPage";
import { URL, getURL } from "../../data/Enum/UrlEnum";
import { generateData } from "../../utilities/GenerateDataUtils/DataUtils";
import { initializeUserData } from "../../data/Factories/factoryUtility";
import { ShopAccount } from "../../pages/Assignment_8/Shop"; 

describe('Assignment 8', () => {
    let myAccountPage: MyAccountPage
    let shopPage: ShopAccount

    beforeEach(() => {
        myAccountPage = new MyAccountPage(getURL("my_account_url"));
        shopPage = new ShopAccount(getURL("my_account_url"));
        myAccountPage.naviateToMyAccountPage("");
        myAccountPage.verifyMyAccountNavigate();
        myAccountPage.verifyValidRegister();
        shopPage.navigateToShop() 

    })
    it('Verify add to cart product  ', () => {
        shopPage.verifySortingOrder()
        shopPage.addSeleniumProdToCart();
        shopPage.verifyBasketProd();
        shopPage.navigateToShop() 
        shopPage.addJSproductToCart();
        shopPage.verifyQtyBasket();


    });
    
    
   
})

