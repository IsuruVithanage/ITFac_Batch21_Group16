import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I navigate to the dashboard application", () => {
    cy.visit("/ui/dashboard", { failOnStatusCode: false });
});

Then("the page should load successfully", () => {
    cy.url().should("include", "/ui/dashboard");

    cy.get("body").should("exist");
});