import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("the user navigates to the next page using pagination", () => {
  // Capture first row before clicking next
  cy.getCategoryTableRows()
    .first()
    .invoke("text")
    .then((text) => {
      cy.wrap(text.trim()).as("firstRowBefore");
    });

  cy.goToNextCategoryPage();
});

Then("the next set of categories should be loaded", () => {
  cy.get("@firstRowBefore").then((beforeText) => {
    cy.getCategoryTableRows()
      .first()
      .invoke("text")
      .then((afterText) => {
        expect(afterText.trim()).to.not.eq(String(beforeText).trim());
      });
  });
});

When('the user searches for category name {string}', (term) => {
  cy.searchCategoryByName(term);
});

Then('only categories matching {string} should be displayed', (term) => {
  cy.getCategoryTableRows().should("have.length.greaterThan", 0);

  cy.getCategoryTableRows().each(($row) => {
    cy.wrap($row)
      .invoke("text")
      .then((txt) => {
        expect(txt.toLowerCase()).to.include(term.toLowerCase());
      });
  });
});

When('the user filters by parent category {string}', (parentName) => {
  cy.filterCategoriesByParent(parentName);
});

Then('only sub-categories for parent {string} should be displayed', (parentName) => {
  cy.getCategoryTableRows().should("have.length.greaterThan", 0);

  cy.getCategoryTableRows().each(($row) => {
    cy.wrap($row)
      .invoke("text")
      .then((txt) => {
        expect(txt.toLowerCase()).to.include(parentName.toLowerCase());
      });
  });
});

When("the user clicks the Name column header to sort", () => {
  // Capture names before sorting
  cy.getCategoryNameCells().then(($cells) => {
    const names = [...$cells].map((el) => el.innerText.trim());
    cy.wrap(names).as("namesBeforeSort");
  });

  cy.sortCategoriesByName();
});

Then("the category list should be sorted alphabetically by name", () => {
  cy.getCategoryNameCells()
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
  cy.searchCategoryByName(randomName);
});

Then('the message {string} should be displayed', (message) => {
  // Your UI empty state is a table row with colspan=4
  cy.get("table tbody")
    .contains("td", message)
    .should("be.visible")
    .and("have.attr", "colspan", "4");

  cy.getCategoryTableRows().should("have.length", 1);
});
