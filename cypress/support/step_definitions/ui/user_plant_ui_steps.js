import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

Given("the user is on the plant list page", () => {
  cy.goToPage("/ui/plants");
});

When("the user searches for a plant with name {string}", (plantName) => {
  cy.typePlantSearchTerm(plantName);
  cy.clickOn("Search");
});

Then("only plants matching {string} should be displayed in the list", (plantName) => {
  cy.validatePlantNameSearchResult(plantName);
});

When("the user filters plants by category {string}", (categoryName) => {
  cy.selectPlantCategory(categoryName);
  cy.clickOn("Search");
});

Then("only plants belonging to category {string} should be displayed", (categoryName) => {
  cy.validatePlantCategorySearchResult(categoryName);
});

Then("the message {string} should be displayed in the plant list", (message) => {
  cy.assertNoPlantFound().should("contain.text", message);
});

When("the user enters {string} in the search field", (name) => {
  cy.typePlantSearchTerm(name);
});

When("the user selects category {string}", (categoryName) => {
  cy.selectPlantCategory(categoryName);
});

When("the user clicks the Reset button", () => {
  cy.clickOn("Reset");
});

Then("the search filters should be cleared", () => {
  cy.assertSearchFormReset();
});

When("the user clicks the sort by name option", () => {
  cy.clickPlantNameSortHeader();
});

Then("the plant list should be sorted by name in descending order", () => {
  cy.validatePlantListSortedByNameDesc();
});



