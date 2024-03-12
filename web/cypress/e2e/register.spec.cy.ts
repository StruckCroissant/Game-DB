const dsl = {
  inputs: {
    username: () => cy.findByRole("textbox", { name: "username" }),
    password: () => cy.findByPlaceholderText("Password"),
  },
  buttons: {
    register: () => cy.findByRole("button", { name: "Register" }),
  },
  links: {
    back: () => cy.get("a#back-button"),
  },
  alerts: {
    username: () => cy.findByRole("alert", { name: "username-error" }),
    password: () => cy.findByRole("alert", { name: "password-error" }),
  },
};

describe("Register page tests", () => {
  beforeEach(() => cy.visit("/register"));

  it.skip("Register page should match snapshot", () => {
    cy.get(".modal").compareSnapshot("registerPage");
  });

  it.skip("Register page with errors should match snapshot", () => {
    cy.get(".modal").compareSnapshot("registerPage-errors");
  });

  it("Clicking register without input should show errors", () => {
    dsl.buttons.register().click();
    dsl.alerts.username().contains("username is required");
    dsl.alerts.password().contains("password is required");
  });

  it("Providing valid input for username and password should redirect to login page", () => {
    dsl.inputs.username().type("test");
    dsl.inputs.password().type("test");
    dsl.buttons.register().click();
    cy.url().should("contain", "/login");
  });

  it("Clicking back button on register modal should navigate back to login page", () => {
    dsl.links.back().should("be.visible").click();
    cy.url().should("contain", "/login");
  });
});
