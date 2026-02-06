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

When("the user filters plants by category of the first plant in the table", () => {
  cy.selectPlantCategoryFromFirstRow().as("selectedCategory");
  cy.clickOn("Search");
});

Then("only plants belonging to the selected category should be displayed", () => {
  cy.get("@selectedCategory").then((categoryName) => {
    cy.validatePlantCategorySearchResult(categoryName);
  });
});

Then("the message {string} should be displayed in the plant list", (message) => {
  cy.assertNoPlantFound().should("contain.text", message);
});

When("the user enters {string} in the search field", (name) => {
  cy.typePlantSearchTerm(name);
});

When("the user selects the category of the first plant in the table", () => {
  cy.selectPlantCategoryFromFirstRow();
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



