const dsl = {
  inputs: {
    username: () => cy.findByRole("textbox", { name: "username" }),
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

describe("Login page tests", () => {
  beforeEach(() => cy.visit("/"));

  it("Base URL should redirect to login", () => {
    cy.url().should("include", "/login");
  });

  it("Login page should match snapshot", () => {
    cy.get(".modal").compareSnapshot("loginPage");
  });

  it("Clicking login without input should show errors", () => {
    dsl.buttons.login().click();
    cy.get(".rounded-input__invalid-message").contains("username is required");
    cy.get(".rounded-input__invalid-message").contains("password is required");
    cy.get(".modal").compareSnapshot("loginPage-errors");
  });

  it("Login should redirect to home page", () => {
    dsl.inputs.username().type("jdeveloper");
    dsl.inputs.password().type("test");
    dsl.buttons.login().click();
    cy.url().should("include", "/home");
  });

  it("Clicking forgot password should direct to the registration page", () => {
    dsl.links["forgot-password"]().click();
    cy.url().should("include", "/register");
  });

  it("Clicking create user should direct to the registration page", () => {
    dsl.links["create-user"]().click();
    cy.url().should("include", "/register");
  });

  it("Authentication error should show in the toast component", () => {
    dsl.inputs.username().type("teeest");
    dsl.inputs.password().type("teeeest");
    dsl.buttons.login().click();
    // TODO set up the toast component to handle errors as 'alerts' and use findByRole here
    cy.findByText("Username or Password is incorrect");
  });
});
