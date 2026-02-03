import { Given } from "@badeball/cypress-cucumber-preprocessor";

Given("the user is logged in as {string}", (role) => {
  cy.loginAs(role);
  cy.currentUrlShouldIncludes("/ui/dashboard");
});

Given("the admin is on the category list page", () => {
  cy.goToCategoryList();
});

Given("the user is on the category list page", () => {
  cy.goToCategoryList();
});
