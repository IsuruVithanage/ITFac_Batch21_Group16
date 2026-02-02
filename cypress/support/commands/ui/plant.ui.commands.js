Cypress.Commands.add("getNonEmptyPlantTableRows", () => {
  return cy.get("table tbody tr")
    .not(":contains('No plants found')")
    .should("have.length.greaterThan", 0, "Plant table is empty!");
});

Cypress.Commands.add("clickOnTheButtonOfFirstPlantItem", (selector) => {
  cy.getNonEmptyPlantTableRows()
    .first()
    .find(selector)
    .click();
});

Cypress.Commands.add("typePlantSearchTerm", (name) => {
  cy.get('input[name="name"]').should("be.visible").clear().type(name);
});

Cypress.Commands.add("selectPlantCategory", (categoryName) => {
  cy.get('select[name="categoryId"]').should("be.visible").select(categoryName);
});

Cypress.Commands.add("validatePlantNameSearchResult", (searchName) => {
  cy.getNonEmptyPlantTableRows()
    .find("td:nth-child(1)")
    .each(($el) => {
      const actualName = $el.text().trim().toLowerCase();
      expect(actualName).to.include(searchName.toLowerCase());
    });
});

Cypress.Commands.add("validatePlantCategorySearchResult", (categoryName) => {
  cy.getNonEmptyPlantTableRows()
    .find("td:nth-child(2)")
    .each(($el) => {
      const actualCategory = $el.text().trim();
      expect(actualCategory).to.eq(categoryName);
    });
});

Cypress.Commands.add("assertNoPlantFound", () => {
  // Verify the specific message exists and is visible
  cy.get("table tbody")
    .contains("td", "No plants found")
    .should("be.visible")
    .and("have.attr", "colspan", "5");

  // Verify that ONLY this empty row exists (length should be 1)
  cy.get("table tbody tr").should("have.length", 1);
});

Cypress.Commands.add("assertSearchFormReset", () => {
  cy.get('input[name="name"]').should("have.value", "");
  cy.get('select[name="categoryId"]').should("have.value", "");
  cy.location("search").should("be.empty");   // No query parameters
});
