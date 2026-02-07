import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import PlantPage from "../../../pages/PlantPage";

Given("the {string} is on the plant list page", (_role) => {
  cy.visit("/ui/plants");
  PlantPage.verifyPageLoaded();
});

When("the {string} navigates to the plant list page", (_role) => {
  cy.visit("/ui/plants");
  PlantPage.verifyPageLoaded();
});

When("the admin clicks on the Add Plant button", () => {
  PlantPage.clickAddPlantButton();
});

Then("the admin should be redirected to the Add Plant page", () => {
  PlantPage.verifyRedirectToAddPage();
});

Then("the Add Plant button should not be visible", () => {
  PlantPage.verifyAddButtonNotVisible();
});

When("the admin clicks on the edit button for the first plant in the list", () => {
  PlantPage.clickEditPlant(0);
});

Then("the admin should be redirected to the Edit Plant page", () => {
  PlantPage.verifyRedirectToEditPage();
});

Then("the Edit Plant button should not be visible", () => {
  PlantPage.verifyEditButtonNotVisible();
});

When("the admin clicks on the delete button for the first plant in the list", () => {
  // 1. Set up a stub that returns FALSE (Simulates clicking "Cancel")
  cy.window().then((win) => {
    cy.stub(win, "confirm").as("deletePrompt").returns(false);
  });

  // 2. Click the delete button
  PlantPage.clickDeletePlant(0);
});

Then("a delete confirmation alert should be displayed", () => {
  // 3. Verify the alert was triggered
  cy.get("@deletePrompt").should("have.been.called");
});

// Reusing your friend's navigation logic
Given("the admin is on the Add Plant page", () => {
  PlantPage.goToAddPlantPage();
});

// TC_ADMIN_PLANT_16
Then("the delete button should not be visible for any plant item", () => {
  PlantPage.verifyDeleteButtonNotVisible();
});

// TC_ADMIN_PLANT_17
Then("the low stock indicator should be displayed for plants with quantity less than 5", () => {
  PlantPage.verifyLowStockIndicator();
});

// TC_ADMIN_PLANT_18
When("the admin enters a negative value for price", () => {
  // Entering a generic negative price
  PlantPage.fillPrice("-100");
});

Then("a validation error message for price should be displayed", () => {
  // Replace "Price cannot be negative" with the ACTUAL message your app shows
  PlantPage.verifyFieldValidationError("price", "Price must be greater than 0");
});

// TC_ADMIN_PLANT_19
When("the admin enters a negative value for quantity", () => {
  PlantPage.fillQuantity("-5");
});

Then("a validation error message for quantity should be displayed", () => {
  // Replace with actual error message from your app
  PlantPage.verifyFieldValidationError("quantity", "Quantity cannot be negative");
});

// TC_ADMIN_PLANT_20
When("the admin leaves the category unselected", () => {
  PlantPage.deselectCategory();
});

Then("a validation error message for category should be displayed", () => {
  // Replace with actual error message from your app
  PlantPage.verifyFieldValidationError("categoryId", "Category is required");
});

// Generic step for submitting the form (used in 18, 19, 20)
When("the admin submits the plant form", () => {
  PlantPage.submitForm();
});
