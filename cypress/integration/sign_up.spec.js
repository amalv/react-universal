// / <reference types="Cypress" />

context("Sign up", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get('[data-test="Sign Up"]')
      .contains("Sign Up")
      .click();
  });

  it("Should sign up and sign in with valid credentials", () => {
    cy.get('[data-test="sign-up-username"]')
      .type("foo")
      .should("have.value", "foo");
    cy.get('[data-test="sign-up-password"]')
      .type("bar", { delay: 500 })
      .should("have.value", "bar");
    cy.get("form").submit();

    cy.location("pathname").should("include", "signin");
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
