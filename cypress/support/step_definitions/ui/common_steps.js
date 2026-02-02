import { Given } from "@badeball/cypress-cucumber-preprocessor";

Given("the admin user is logged in", () => {
  cy.loginAs("admin");
  cy.get(".btn").should("be.visible").click();
  cy.url().should("not.include", "/ui/login");
});

Given("the test user is logged in", () => {
  cy.loginAs("testUser");
  cy.get(".btn").should("be.visible").click();
  cy.url().should("not.include", "/ui/login");
});

Given("the admin is on the category list page", () => {
  cy.visit("/ui/categories");
  cy.url().should("include", "/categories");
});

Given("the user is on the category list page", () => {
  cy.visit("/ui/categories");
  cy.url().should("include", "/categories");
});
