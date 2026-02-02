import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("the user navigates to the next page using pagination", () => {
  cy.scrollTo("bottom");

  // Capture first row before clicking next
  cy.get("table tbody tr")
    .first()
    .invoke("text")
    .then((text) => {
      cy.wrap(text.trim()).as("firstRowBefore");
    });

  // Click Next button
  cy.contains("a,button", /next/i).should("be.visible").click();
});

Then("the next set of categories should be loaded", () => {
  cy.get("@firstRowBefore").then((beforeText) => {
    cy.get("table tbody tr")
      .first()
      .invoke("text")
      .then((afterText) => {
        expect(afterText.trim()).to.not.eq(String(beforeText).trim());
      });
  });
});
