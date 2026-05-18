import {
  buildInvalidLoginCases,
  createLoginUser,
} from "../../data/DataTest/Assignment_9/LoginTestData";
import { LoginPage } from "../../pages/Assignment_9/LoginPage";

describe("Assignment 9 - Login with POM", () => {
  const loginPage = new LoginPage();
  const registeredUser = createLoginUser();
  const invalidLoginCases = buildInvalidLoginCases(registeredUser);

  before(() => {
    loginPage.registerIfNeeded(registeredUser);
  });

  beforeEach(() => {
    loginPage.ensureLoggedOut();
  });

  invalidLoginCases.forEach(({ title, credentials, expectedError }) => {
    it(title, () => {
      loginPage.login(credentials);
      loginPage.assertLoginError(expectedError);
    });
  });

  it("logs in with a reusable authenticated session", () => {
    loginPage.loginWithSession(registeredUser);
    cy.visit("https://practice.automationtesting.in/my-account/");
    loginPage.assertLoggedIn();
  });
});
