const dsl = {
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

describe("Register page tests", () => {
  beforeEach(() => cy.visit("/register"));

  it("Clicking register without input should show errors", () => {
    dsl.buttons.register().click();
    cy.get(".rounded-input__invalid-message").contains("username is required");
    cy.get(".rounded-input__invalid-message").contains("password is required");
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
