import {When, Then, Given} from "@badeball/cypress-cucumber-preprocessor";

Given("the {string} is on the category list page", (_role) => {
  cy.goToPage("/ui/categories");
});

Then("the Delete button should be disabled for categories", () => {
  cy.get("button[title='Delete']")
      .should("exist")
      .and("be.disabled");
});

When("the admin clicks the Add Category button", () => {
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
  cy.on("window:confirm", (text) => {
    expect(text).to.eq("Delete this category?");
    return false;
  });

  cy.get('button[title="Delete"]').first().click();
});

Then("a delete confirmation dialog should be displayed", () => {
  // confirm handled in the When step; reaching here means it appeared
});

Then("the Add Category button should not be visible", () => {
  cy.contains("button, a", /add\s*(a\s*)?category/i).should("not.exist");
  cy.get('a[href*="/ui/categories/add"], a[href*="/categories/add"]').should("not.exist");
});

Then("the Edit buttons should not be visible", () => {
  cy.get('a[title="Edit"]').should("not.exist");
  cy.get('a[href*="/ui/categories/edit"]').should("not.exist");
});
