import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("the admin user is logged in", () => {
  cy.loginAs("admin");
  cy.get(".btn").click();
});


Given("the admin is on the category list page", () => {
  // Adjust URL if your actual route differs
  cy.visit("/ui/categories");

  // Sanity check that category list page loaded
  cy.url().should("include", "/categories");
});

When("the admin clicks the Add Category button", () => {
  // Flexible selector: button or link with visible text
  cy.contains("button, a", /add a category/i).click();
});

Then("the admin should be redirected to the Add Category page", () => {
  // URL-based assertion (stable)
  cy.url().should("include", "/categories/add");

  // Optional UI assertion: Add Category form heading
  cy.contains(/add category/i).should("be.visible");
});
