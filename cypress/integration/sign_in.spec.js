// / <reference types="Cypress" />

context("Sign in", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get('[data-test="Sign In"]')
      .contains("Sign In")
      .click();
  });

  it("Should sign in with valid credentials", () => {
    cy.get('[data-test="sign-in-username"]')
      .type("foo")
      .should("have.value", "foo");

    cy.get('[data-test="sign-in-password"]')
      .type("bar")
      .should("have.value", "bar");

    cy.get("form").submit();

    cy.get('[data-test="Logout"]')
      .contains("Logout")
      .click();
  });
});
