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
