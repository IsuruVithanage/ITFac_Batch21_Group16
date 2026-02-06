import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("the admin is on the Add Sales page", () => {
    cy.visit("/ui/sales/new");
    cy.url().should("include", "/ui/sales/new");
    cy.contains("a", /^cancel$/i).should("be.visible");
});

When("the admin clicks the Cancel button on Add Sales page", () => {
    cy.contains("a", /^cancel$/i).click();
});

Then("the admin should be redirected back to the sales list page", () => {
    cy.url().should("include", "/ui/sales");
    cy.contains(/sales/i).should("be.visible");
});