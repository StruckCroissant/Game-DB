describe("Login page tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Base URL should redirect to login", () => {
    cy.url().should("include", "/login");
  });

  it("Login should redirect to home page", () => {
    cy.findByRole("textbox", { name: "username" }).type("test");
    cy.findByPlaceholderText("Password").type("test");
    cy.findByRole("button", { name: "Log in" }).click();
    cy.url().should("include", "/home");
  });
});
