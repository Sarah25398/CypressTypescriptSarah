import { getURL } from "../../data/Enum/UrlEnum";
import type { LoginCredentials } from "../../data/DataTest/Assignment_9/LoginTestData";
import { loginPageLocator } from "../../locators/Assignment_9/LoginPageLocator";

export class LoginPage {
  private readonly accountUrl: string;

  constructor() {
    this.accountUrl = `${getURL("my_account_url")}my-account/`;
  }

  visit(): void {
    cy.visit(this.accountUrl);
    cy.url().should("eq", this.accountUrl);
    cy.get(loginPageLocator.pageHeading).should("contain.text", "My Account");
  }

  ensureLoggedOut(): void {
    cy.visit(this.accountUrl);
    cy.get("body").then(($body) => {
      if ($body.find(loginPageLocator.logoutLink).length > 0) {
        cy.get(loginPageLocator.logoutLink).click();
      }
    });
  }

  registerIfNeeded(credentials: LoginCredentials): void {
    this.ensureLoggedOut();
    this.visit();

    cy.get("body").then(($body) => {
      if ($body.find(loginPageLocator.registerForm).length === 0) {
        return;
      }

      cy.get(loginPageLocator.registerEmailInput)
        .should("be.visible")
        .clear()
        .type(credentials.email);
      cy.get(loginPageLocator.registerPasswordInput)
        .should("be.visible")
        .clear()
        .type(credentials.password, { log: false });
      cy.get(loginPageLocator.registerButton).click();

      cy.get("body").then(($page) => {
        const errorText = $page.find(loginPageLocator.errorNotice).text().trim();

        if (errorText.includes("already registered")) {
          return;
        }

        cy.get(loginPageLocator.accountNavigation, { timeout: 10000 }).should(
          "be.visible"
        );
        this.logout();
      });
    });
  }

  login(credentials: LoginCredentials, rememberMe = false): void {
    this.visit();

    cy.get(loginPageLocator.loginForm).within(() => {
      cy.get(loginPageLocator.usernameInput)
        .should("be.visible")
        .clear()
        .type(credentials.email);
      cy.get(loginPageLocator.passwordInput)
        .should("be.visible")
        .clear()
        .type(credentials.password, { log: false });

      if (rememberMe) {
        cy.get(loginPageLocator.rememberMeCheckbox).check({ force: true });
      }

      cy.get(loginPageLocator.loginButton).click();
    });
  }

  loginWithSession(credentials: LoginCredentials): void {
    cy.session(
      ["my-account-login", credentials.email],
      () => {
        this.ensureLoggedOut();
        this.login(credentials, true);
        this.assertLoggedIn();
      },
      {
        validate: () => {
          cy.visit(this.accountUrl);
          cy.get(loginPageLocator.accountNavigation).should("be.visible");
        },
      }
    );
  }

  logout(): void {
    cy.visit(this.accountUrl);
    cy.get("body").then(($body) => {
      if ($body.find(loginPageLocator.logoutLink).length > 0) {
        cy.get(loginPageLocator.logoutLink).click();
      }
    });
  }

  assertLoggedIn(): void {
    cy.url().should("include", "/my-account/");
    cy.get(loginPageLocator.accountNavigation).should("be.visible");
    cy.get(loginPageLocator.logoutLink).should("be.visible");
  }

  assertLoginError(expectedError: string): void {
    cy.get(loginPageLocator.errorNotice)
      .should("be.visible")
      .invoke("text")
      .then((text) => text.trim())
      .should("include", expectedError);
  }
}
