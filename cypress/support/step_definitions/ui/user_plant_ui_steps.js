import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

Given("the user is on the plant list page", () => {
  cy.goToPage("/ui/plants");
});

When("the user searches for a plant with name {string}", (plantName) => {
  cy.searchPlantByName(plantName);
});

Then("only plants matching {string} should be displayed in the list", (plantName) => {
  cy.validatePlantNameSearchResult(plantName);
});

When("the user filters plants by category {string}", (categoryName) => {
  cy.filterPlantsByCategory(categoryName);
});

Then("only plants belonging to category {string} should be displayed", (categoryName) => {
  cy.validatePlantCategorySearchResult(categoryName);
});

Then("the message {string} should be displayed in the plant list", (message) => {
  cy.assertNoPlantFound().should("contain.text", message);
});
