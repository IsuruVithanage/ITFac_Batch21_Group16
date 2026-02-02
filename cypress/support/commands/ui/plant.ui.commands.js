Cypress.Commands.add("clickOnTheButtonOfFirstPlantItem", (selector) => {
  cy.get("tbody tr")
    .should("have.length.gt", 0, `Plant table is empty! Cannot click on ${selector}.`)
    .first()
    .find(selector)
    .click();
});
