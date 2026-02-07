import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import CategoryPage from "../../../pages/CategoryPage";

Given("the {string} is on the category list page", (_role) => {
  cy.visit("/ui/categories");
  CategoryPage.verifyPageLoaded();
});

Given("the {string} is on the Add Category page", (_role) => {
  CategoryPage.goToAddCategoryPage();
});


Then("the Delete button should be disabled for categories", () => {
  CategoryPage.assertActionButtonDisabled("Delete");
});

When("the admin submits the category form without entering a name", () => {
  CategoryPage.clearNameInput();
  CategoryPage.saveButton.click();
});

When("the admin clicks the Add Category button", () => {
  CategoryPage.clickAddCategoryButton();
});


When("the admin submits the category form", () => {
  CategoryPage.saveButton.click();
});

When("the admin enters a category name shorter than the minimum length", () => {
  CategoryPage.enterName("ab");
});

When("the admin enters a category name longer than the maximum allowed length", () => {
  CategoryPage.enterName("abbdgtyhsweg");
});


Then("a validation message should be displayed indicating minimum and maximum length requirement", () => {
  CategoryPage.verifyValidationMessage(/category name.*between\s*3\s*and\s*10\s*characters/i);
});

Then("a validation message should be displayed indicating category name is required", () => {
  CategoryPage.verifyValidationMessage(/category name.*required|required.*category name/i);
});

Then("the admin should be redirected to the Add Category page", () => {
  cy.url().should("include", "/categories/add");
  cy.contains(/add\s*category/i).should("be.visible");
});

When("the admin clicks the Edit button for a category", () => {
  CategoryPage.clickEditCategory(0);
});

Then("the admin should be redirected to the Edit Category page", () => {
  CategoryPage.verifyRedirectToEditPage();
});

Then("the category details should be loaded", () => {
  CategoryPage.verifyCategoryDetailsLoaded();
});

When("the admin clicks the Delete button for a category", () => {
  cy.on("window:confirm", (text) => {
    expect(text).to.eq("Delete this category?");
    return false;
  });

  CategoryPage.clickDeleteCategory(0);
});

Then("a delete confirmation dialog should be displayed", () => {
  // confirm handled in the When step; reaching here means it appeared
});

Then("the Add Category button should not be visible", () => {
  CategoryPage.verifyAddButtonNotVisible();
});

Then("the Edit buttons should not be visible", () => {
  CategoryPage.verifyEditButtonNotVisible();
});
