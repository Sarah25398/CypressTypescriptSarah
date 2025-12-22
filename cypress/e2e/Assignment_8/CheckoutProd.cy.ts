import { CheckoutProductPage } from '../../pages/Assignment_8/CheckoutProductPage' 
import { URL, getURL } from "../../data/Enum/UrlEnum";
import { MyAccountPage } from '../../pages/Assignment_8/MyAccountPage';


describe('Verify Checkout function ', () => {
    let checkout: CheckoutProductPage
    let myAccounPage : MyAccountPage
    beforeEach(() => { 
        myAccounPage = new MyAccountPage(getURL("my_account_url"));
        checkout = new CheckoutProductPage(getURL("my_account_url"))
        myAccounPage.naviateToMyAccountPage("");
        myAccounPage.verifyMyAccountNavigate();
        checkout.goToShopPage()
    })
    it('Verify checkout cart with Selenium Product ', () => {
        checkout.selectSeleniumProd()
        checkout.proceedCheckOut()
        checkout.fillBilling()
        checkout.verifyTaxForCountry(
            {
                "Hong Kong": 0.05,
                "India": 0.02
            }
        )
        checkout.selectState("Bihar")
        checkout.placeOrder()
        checkout.verifyTextOrder()
            
        
    });
    
})
