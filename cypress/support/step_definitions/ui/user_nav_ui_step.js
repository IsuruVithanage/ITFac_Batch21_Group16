import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


// When Steps
When("the user clicks on {string} in the navbar", (linkText) => {
  // Finds the anchor tag containing the specific text and clicks it
  cy.get(".sidebar.nav").contains("a", linkText).click();
});

// Then Steps - Page Loading
Then("the Dashboard page should load", () => {
  cy.url().should("include", "/ui/dashboard");
  cy.get("h3").should("contain", "Dashboard"); // Adjust header selector as needed
});

Then("the Categories page should load", () => {
  cy.url().should("include", "/ui/categories");
});

Then("the Plants page should load", () => {
  cy.url().should("include", "/ui/plants");
});

Then("the Sales page should load", () => {
  cy.url().should("include", "/ui/sales");
});

// Then Steps - Highlighting
Then("the {string} tab should be highlighted", (linkText) => {
  // Checks for the 'active' class used in your HTML
  cy.get(".sidebar.nav")
    .contains("a", linkText)
    .should("have.class", "active");
});

// Special Step for TC_USER_NAV_05 (Disabled Link)
Then("the {string} link should be disabled", (linkText) => {
  cy.get(".sidebar.nav")
    .contains("a", linkText)
    .should("have.class", "disabled")
    .and("have.attr", "href", "javascript:void(0);");
});

Then("it should show a tooltip {string}", (tooltipText) => {
  cy.get(".sidebar.nav")
    .contains("a", "Inventory")
    .should("have.attr", "title", tooltipText);
});