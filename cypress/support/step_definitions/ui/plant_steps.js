import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("the {string} navigates to the plant list page", (_role) => {
  cy.visit("/ui/plants");
});

// -----------------------------------
// Add plant
// -----------------------------------
When("the admin clicks on the Add Plant button", () => {
  cy.contains("a", "Add a Plant").should("be.visible").click();
});

Then("the admin should be navigated to the Add Plant page", () => {
  cy.url().should("include", "/ui/plants/add");
});


// -----------------------------------
// Edit plant
// -----------------------------------
When("the admin clicks on the edit button for the first plant in the list", () => {
  cy.get("tbody tr")
    .should("have.length.gt", 0, "Plant table is empty! Cannot click Edit.")
    .first()
    .find("a[title='Edit']")
    .click();
});

Then("the admin should be navigated to the Edit Plant page", () => {
  cy.url().should("include", "/ui/plants/edit/");
});
