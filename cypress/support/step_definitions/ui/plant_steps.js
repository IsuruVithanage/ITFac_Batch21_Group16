import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("the {string} navigates to the plant list page", (_role) => {
  cy.visit("/ui/plants");
});

When("the admin clicks on the Add Plant button", () => {
  cy.contains("a", "Add a Plant").should("be.visible").click();
});

Then("the admin should be navigated to the Add Plant page", () => {
  cy.url().should("include", "/ui/plants/add");
});
