import {When, Then, Given} from "@badeball/cypress-cucumber-preprocessor";

Given("the {string} is on the plant list page", (_role) => {
  cy.goToPage("/ui/plants");
});

// -----------------------------------
// Add plant
// -----------------------------------
When("the admin clicks on the Add Plant button", () => {
  cy.clickOn("Add a Plant")
});

Then("the admin should be redirected to the Add Plant page", () => {
  cy.currentUrlShouldIncludes("/ui/plants/add")
});

Then("the Add Plant button should not be visible", () => {
  cy.contains("a", "Add a Plant").should("not.exist");
});


// -----------------------------------
// Edit plant
// -----------------------------------
When("the admin clicks on the edit button for the first plant in the list", () => {
  cy.clickOnTheButtonOfFirstPlantItem("a[title='Edit']");
});

Then("the admin should be redirected to the Edit Plant page", () => {
  cy.currentUrlShouldIncludes("/ui/plants/edit");
});

Then("the Edit Plant button should not be visible", () => {
  cy.get("a[title='Edit']").should("not.exist");
});

// -----------------------------------
// Delete plant
// -----------------------------------
When("the admin clicks on the delete button for the first plant in the list", () => {
  // 1. Set up a stub that returns FALSE (Simulates clicking "Cancel")
  cy.window().then((win) => {
    cy.stub(win, "confirm").as("deletePrompt").returns(false);
  });

  // 2. Click the delete button
  cy.clickOnTheButtonOfFirstPlantItem("button[title='Delete']");
});

Then("a delete confirmation alert should be displayed", () => {
  // 3. Verify the alert was triggered
  cy.get("@deletePrompt").should("have.been.called");
});
