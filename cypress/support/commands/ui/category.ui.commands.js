// Navigate
Cypress.Commands.add("goToCategoryList", () => {
  cy.visit("/ui/categories");
  cy.url().should("include", "/categories");
});


// Search (uses your existing selectors)
Cypress.Commands.add("searchCategoryByName", (term) => {
  cy.get('input[name="name"]').should("be.visible").clear().type(term);
  cy.contains('button[type="submit"]', /^search$/i).click();
});

// Filter by parent dropdown
Cypress.Commands.add("filterCategoriesByParent", (parentName) => {
  cy.get('select[name="parentId"]').should("be.visible").select(parentName);
  cy.contains('button[type="submit"]', /^search$/i).click();
});

// Click sort by Name header
Cypress.Commands.add("sortCategoriesByName", () => {
  cy.get('thead a[href*="sortField=name"]').first().click();
});

// Pagination next page
Cypress.Commands.add("goToNextCategoryPage", () => {
  cy.scrollTo("bottom");
  cy.contains("a,button", /next/i).should("be.visible").click();
});

// Table getters
Cypress.Commands.add("getCategoryTableRows", () => {
  return cy.get("table tbody tr");
});

Cypress.Commands.add("getCategoryNameCells", () => {
  return cy.get("table tbody tr td:nth-child(2)");
});

// Empty state assert
Cypress.Commands.add("assertNoCategoryFound", () => {
  cy.get("table tbody")
    .contains("td", "No category found")
    .should("be.visible")
    .and("have.attr", "colspan", "4");

  cy.get("table tbody tr").should("have.length", 1);
});
