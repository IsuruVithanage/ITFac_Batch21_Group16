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

Cypress.Commands.add("searchPlantByName", (name) => {
  cy.get('input[name="name"]').should("be.visible").clear().type(name);
  cy.clickOn("Search");
});

Cypress.Commands.add("validatePlantNameSearchResult", (searchName) => {
  cy.getNonEmptyPlantTableRows()
    .find("td:nth-child(1)")
    .each(($el) => {
      const actualName = $el.text().trim().toLowerCase();
      expect(actualName).to.include(searchName.toLowerCase());
    });
});

Cypress.Commands.add("filterPlantsByCategory", (categoryName) => {
  cy.get('select[name="categoryId"]')
    .should("be.visible")
    .select(categoryName);

  cy.clickOn("Search");
});

Cypress.Commands.add("validatePlantCategorySearchResult", (categoryName) => {
  cy.getNonEmptyPlantTableRows()
    .find("td:nth-child(2)")
    .each(($el) => {
      const actualCategory = $el.text().trim();
      expect(actualCategory).to.eq(categoryName);
    });
});
