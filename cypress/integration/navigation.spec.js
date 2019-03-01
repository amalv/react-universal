// / <reference types="Cypress" />

context("Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get('[data-test="Sign In"]')
      .contains("Sign In")
      .click();
  });

  it("cy.reload() - reload the page", () => {
    // https://on.cypress.io/reload
    cy.reload();

    // reload the page without using the cache
    cy.reload(true);
  });

  it("cy.go() - go back or forward in the browser's history", () => {
    // https://on.cypress.io/go

    cy.location("pathname").should("include", "signin");

    cy.go("back");
    cy.location("pathname").should("not.include", "signin");

    cy.go("forward");
    cy.location("pathname").should("include", "signin");

    // clicking back
    cy.go(-1);
    cy.location("pathname").should("not.include", "signin");

    // clicking forward
    cy.go(1);
    cy.location("pathname").should("include", "signin");
  });
});
