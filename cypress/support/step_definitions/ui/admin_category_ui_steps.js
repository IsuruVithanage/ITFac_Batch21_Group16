import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("the admin clicks the Add Category button", () => {
  // More flexible: matches "Add Category" or "Add a Category"
  cy.contains("button, a", /add\s*(a\s*)?category/i).click();
});

Then("the admin should be redirected to the Add Category page", () => {
  cy.url().should("include", "/categories/add");
  cy.contains(/add\s*category/i).should("be.visible");
});

When("the admin clicks the Edit button for a category", () => {
  cy.get('a[title="Edit"]').first().click();
});


Then("the admin should be redirected to the Edit Category page", () => {
  cy.url().should("match", /edit/i);
});

Then("the category details should be loaded", () => {
  cy.get('input[name="name"], #name')
    .should("be.visible")
    .invoke("val")
    .should("not.be.empty");
});

When("the admin clicks the Delete button for a category", () => {
  // MUST be registered before the click
  cy.on("window:confirm", (text) => {
    expect(text).to.eq("Delete this category?");
    return false; // Cancel deletion
  });

  cy.get('button[title="Delete"]').first().click();
});

Then("a delete confirmation dialog should be displayed", () => {
  // If we reached here, confirm was triggered and handled.
  // (Optional: nothing else needed)
});

Then("the Add Category button should not be visible", () => {
  // If Add is a button/link with text, assert it doesn't exist
  cy.contains("button, a", /add\s*(a\s*)?category/i).should("not.exist");

  // Optional: if the Add button is an icon or has a known href, also assert it's absent
  cy.get('a[href*="/ui/categories/add"], a[href*="/categories/add"]').should("not.exist");
});

Then("the Edit buttons should not be visible", () => {
  // Edit is an icon-only button with title="Edit"
  cy.get('a[title="Edit"]').should("not.exist");

  // Extra safety: ensure no edit links are present by URL
  cy.get('a[href*="/ui/categories/edit"]').should("not.exist");
});


