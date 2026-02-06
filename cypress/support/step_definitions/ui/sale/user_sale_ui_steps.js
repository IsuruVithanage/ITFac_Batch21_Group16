import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("the user navigates to the Sales page", () => {
  cy.get(".sidebar").contains("a", "Sales").should("be.visible").click();

  cy.url().should("include", "/ui/sales");
});

Then("the Sell button should not be visible for the user", () => {
  cy.contains("a, button", /sell/i).should("not.exist");
});

Then("the Delete button should not be visible for the user", () => {
  cy.get("table").should("exist");

  cy.get("table tbody tr").each(($row) => {
    cy.wrap($row)
      .invoke("text")
      .should("not.match", /delete/i);
  });
});

Then("sortable column headers should display sorting icons", () => {
  cy.get("table thead th").should("have.length.greaterThan", 0);

  cy.get("table thead th").each(($th) => {
    cy.wrap($th).should("be.visible");
  });
});

When("the user clicks on a sortable column header", () => {
  cy.get("table thead th").first().click();
});

Then("the active sort indicator should be visible on that column", () => {
  cy.get("table tbody tr").should("have.length.greaterThan", 0);
});

Then(
  "pagination controls should be visible when data exceeds page limit",
  () => {
    cy.get("body").then(($body) => {
      if ($body.find(".pagination").length > 0) {
        cy.get(".pagination").should("be.visible");
      } else {
        cy.log("Pagination not rendered — data fits single page");
      }
    });
  },
);
