const login = {
  inputs: {
    username: () => cy.findByRole("textbox", { name: "Username" }),
    password: () => cy.findByPlaceholderText("Password"),
  },
  buttons: {
    login: () => cy.findByRole("button", { name: "Log in" }),
  },
  links: {
    "forgot-password": () =>
      cy.findByRole("link", { name: "Forgot password?" }),
    "create-user": () => cy.findByRole("link", { name: "Create" }),
  },
};

const register = {
  inputs: {
    username: () => cy.findByRole("textbox", { name: "Username" }),
    password: () => cy.findByPlaceholderText("Password"),
  },
  buttons: {
    register: () => cy.findByRole("button", { name: "Register" }),
  },
  links: {
    back: () => cy.get("a#back-button"),
  },
};

describe("Login page tests", () => {
  describe("Default page tests", () => {
    beforeEach(() => cy.visit("/"));

    it("Base URL should redirect to login", () => {
      cy.url().should("include", "/login");
    });

    it("Login page should match snapshot", () => {
      cy.get(".modal").compareSnapshot("loginPage");
    });

    it("Clicking login without input should show errors", () => {
      login.buttons.login().click();
      cy.get(".rounded-input__invalid-message").contains(
        "username is required"
      );
      cy.get(".rounded-input__invalid-message").contains(
        "password is required"
      );
      cy.get(".modal").compareSnapshot("loginPage-errors");
    });

    it("Login should redirect to home page", () => {
      login.inputs.username().type("test");
      login.inputs.password().type("test");
      login.buttons.login().click();
      cy.url().should("include", "/home");
    });

    it("Clicking forgot password should direct to the registration page", () => {
      login.links["forgot-password"]().click();
      cy.url().should("include", "/register");
      login.inputs.username().should("be.visible");
      login.inputs.password().should("be.visible");
      register.buttons.register().should("be.visible");
    });

    it("Clicking create user should direct to the registration page", () => {
      login.links["create-user"]().click();
      cy.url().should("include", "/register");
    });
  });

  describe("Register page tests", () => {
    beforeEach(() => cy.visit("/register"));

    it("Clicking register without input should show errors", () => {
      register.buttons.register().click();
      cy.get(".rounded-input__invalid-message").contains(
        "username is required"
      );
      cy.get(".rounded-input__invalid-message").contains(
        "password is required"
      );
    });

    it("Providing valid input for username and password should redirect to login page", () => {
      register.inputs.username().type("test");
      register.inputs.password().type("test");
      register.buttons.register().click();
      cy.url().should("contain", "/login");
    });

    it("Clicking back button on register modal should navigate back to login page", () => {
      register.links.back().should("be.visible").click();
      cy.url().should("contain", "/login");
    });
  });
});
