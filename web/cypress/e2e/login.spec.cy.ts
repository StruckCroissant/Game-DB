describe("Login page tests", () => {
  describe("Default page tests", () => {
    beforeEach(() => cy.visit("/"));

    it("Base URL should redirect to login", () => {
      cy.url().should("include", "/login");
    });

    it("Login page should match snapshot", () => {
      cy.get(".modal").compareSnapshot("loginPage");
    });

    it("Login should redirect to home page", () => {
      cy.findByRole("textbox", { name: "Username" }).type("test");
      cy.findByPlaceholderText("Password").type("test");
      cy.findByRole("button", { name: "Log in" }).click();
      cy.url().should("include", "/home");
    });

    it("Clicking forgot password should direct to the registration page", () => {
      cy.findByRole("link", { name: "Forgot password?" }).click();
      cy.url().should("include", "/register");
      cy.findByRole("textbox", { name: "Username" }).should("be.visible");
      cy.findByPlaceholderText("Password").should("be.visible");
      cy.findByRole("button", { name: "Register" }).should("be.visible");
    });

    it("Clicking create user should direct to the registration page", () => {
      cy.findByRole("link", { name: "Create" }).click();
      cy.url().should("include", "/register");
    });
  });

  describe("Register page tests", () => {
    beforeEach(() => cy.visit("/register"));

    it("Clicking register without input should show errors", () => {
      cy.findByRole("button", { name: "Register" }).click();
      cy.get(".rounded-input__invalid-message").contains(
        "username is required"
      );
      cy.get(".rounded-input__invalid-message").contains(
        "password is required"
      );
    });

    it("Providing valid input for username and password should redirect to login page", () => {
      cy.findByRole("textbox", { name: "Username" }).type("test");
      cy.findByPlaceholderText("Password").type("test");
      cy.findByRole("button", { name: "Register" }).click();
      cy.url().should("contain", "/login");
    });

    it("Clicking back button on register modal should navigate back to login page", () => {
      cy.get("a#back-button").should("be.visible").click();
      cy.url().should("contain", "/login");
    });
  });
});
