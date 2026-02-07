import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import PlantPage from "../../../pages/PlantPage";

Given("the user is on the plant list page", () => {
  cy.visit("/ui/plants");
  PlantPage.verifyPageLoaded();
});

When("the user searches for a plant with name {string}", (plantName) => {
  PlantPage.searchByName(plantName);
});

Then("only plants matching {string} should be displayed in the list", (plantName) => {
  PlantPage.validateNameSearchResult(plantName);
});

When("the user filters plants by category of the first plant in the table", () => {
  PlantPage.selectCategoryFromFirstRow().as("selectedCategory");
  PlantPage.searchButton.click();
});

Then("only plants belonging to the selected category should be displayed", () => {
  cy.get("@selectedCategory").then((categoryName) => {
    PlantPage.validateCategorySearchResult(categoryName);
  });
});

Then("the message {string} should be displayed in the plant list", (message) => {
  PlantPage.verifyNoPlantFound(message);
});

When("the user enters {string} in the search field", (name) => {
  PlantPage.searchByName(name); // Assuming this types and clicks search. Step 9 splits type and click.
  // Wait, step 9 said: type search term. Step 10 said click search.
  // Here, step 31 says "enters {string} in the search field". Step 39 says "clicks Reset".
  // So searchByName might be too aggressive if it clicks search.
  // PlantPage.searchByName clicks search.
  // Let's adjust PlantPage or use parts of it.
  // But step 9 types and clicks.
  // Step 31 JUST TYPES? "When the user enters {string} in the search field"
  // Let's look at `typePlantSearchTerm` command. It just types.
});

// Adjusting logic for split steps
When("the user enters {string} in the search field", (name) => {
  PlantPage.nameInput.clear().type(name);
});

When("the user selects the category of the first plant in the table", () => {
  PlantPage.selectCategoryFromFirstRow();
});

When("the user clicks the Reset button", () => {
  PlantPage.clickResetButton();
});

Then("the search filters should be cleared", () => {
  PlantPage.verifySearchFormReset();
});

When("the user clicks the sort by name option", () => {
  PlantPage.clickSortByNameHeader();
});

Then("the plant list should be sorted by name in descending order", () => {
  PlantPage.verifySortedByNameDesc();
});



