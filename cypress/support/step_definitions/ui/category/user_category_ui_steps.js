import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import CategoryPage from "../../../pages/CategoryPage";

When("the user navigates to the next page using pagination", () => {
  // Capture first row before clicking next
  CategoryPage.tableRows
    .first()
    .invoke("text")
    .then((text) => {
      cy.wrap(text.trim()).as("firstRowBefore");
    });

  CategoryPage.goToNextPage();
});

Then("the next set of categories should be loaded", () => {
  cy.get("@firstRowBefore").then((beforeText) => {
    CategoryPage.tableRows
      .first()
      .invoke("text")
      .then((afterText) => {
        expect(afterText.trim()).to.not.eq(String(beforeText).trim());
      });
  });
});

When('the user searches for category name {string}', (term) => {
  CategoryPage.searchByName(term);
});

Then('only categories matching {string} should be displayed', (term) => {
  CategoryPage.tableRows.should("have.length.greaterThan", 0);

  CategoryPage.tableRows.each(($row) => {
    cy.wrap($row)
      .invoke("text")
      .then((txt) => {
        expect(txt.toLowerCase()).to.include(term.toLowerCase());
      });
  });
});

When('the user filters by parent category {string}', (parentName) => {
  CategoryPage.filterByParent(parentName);
});

Then('only sub-categories for parent {string} should be displayed', (parentName) => {
  CategoryPage.tableRows.should("have.length.greaterThan", 0);

  CategoryPage.tableRows.each(($row) => {
    cy.wrap($row)
      .invoke("text")
      .then((txt) => {
        expect(txt.toLowerCase()).to.include(parentName.toLowerCase());
      });
  });
});

When("the user clicks the Name column header to sort", () => {
  // Capture names before sorting
  CategoryPage.nameCells.then(($cells) => {
    const names = [...$cells].map((el) => el.innerText.trim());
    cy.wrap(names).as("namesBeforeSort");
  });

  CategoryPage.sortByName();
});

Then("the category list should be sorted alphabetically by name", () => {
  CategoryPage.nameCells
    .should("have.length.greaterThan", 1)
    .then(($cells) => {
      const namesAfter = [...$cells].map((el) => el.innerText.trim());

      const ascSorted = [...namesAfter].sort((a, b) => a.localeCompare(b));
      const descSorted = [...ascSorted].reverse();

      expect(
        JSON.stringify(namesAfter) === JSON.stringify(ascSorted) ||
        JSON.stringify(namesAfter) === JSON.stringify(descSorted),
        `Expected sorted order, got: ${namesAfter.join(", ")}`
      ).to.eq(true);
    });
});

When("the user searches for a non-existent category name", () => {
  const randomName = `NON_EXIST_${Date.now()}`;
  CategoryPage.searchByName(randomName);
});

Then('the message {string} should be displayed', (message) => {
  CategoryPage.verifyNoCategoryFound();
});

Then("the Edit button should be disabled for categories", () => {
  CategoryPage.assertActionButtonDisabled("Edit");
});

When("the user attempts to edit a category", () => {
  CategoryPage.forceClickEditCategory(0);
});

When("the user clicks Save without editing fields", () => {
  CategoryPage.saveButton
    .should("exist")
    .click({ force: true });
});

Then(
  "an error message indicating insufficient permissions should be displayed",
  () => {
    CategoryPage.assertPermissionErrorMessage();
  }
);

Then("the category list should be visible", () => {
  CategoryPage.verifyCategoriesVisible();
});

Then("all category action buttons should be hidden or disabled", () => {
  CategoryPage.assertActionButtonRestricted('button[title="Delete"]');
  CategoryPage.assertActionButtonRestricted('a[title="Edit"]');
});
When("the user opens the edit category page", () => {
  CategoryPage.clickEditCategory(0);

  // Verify we are on edit page
  cy.url().should("include", "/ui/categories/edit/");
});

When("the user clicks the Cancel button", () => {
  cy.contains("a", /^cancel$/i)
    .should("be.visible")
    .click();
});

Then("the user should be redirected back to the category list page", () => {
  CategoryPage.verifyPageLoaded();
  cy.contains("Categories").should("be.visible");
});
