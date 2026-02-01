import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("the admin user is logged in", () => {
  cy.loginAs("admin");

  // Option B: explicit login click
  cy.get(".btn").should("be.visible").click();

  // Optional sanity: ensure we left login page
  cy.url().should("not.include", "/ui/login");
});

Given("the admin is on the category list page", () => {
  cy.visit("/ui/categories");
  cy.url().should("include", "/categories");
});

When("the admin clicks the Add Category button", () => {
  // More flexible: matches "Add Category" or "Add a Category"
  cy.contains("button, a", /add\s*(a\s*)?category/i).click();
});

Then("the admin should be redirected to the Add Category page", () => {
  cy.url().should("include", "/categories/add");
  cy.contains(/add\s*category/i).should("be.visible");
});

When("the admin clicks the Edit button for a category", () => {
  cy.get('a[title="Edit"]').first().click();
});


Then("the admin should be redirected to the Edit Category page", () => {
  cy.url().should("match", /edit/i);
});

Then("the category details should be loaded", () => {
  cy.get('input[name="name"], #name')
    .should("be.visible")
    .invoke("val")
    .should("not.be.empty");
});
