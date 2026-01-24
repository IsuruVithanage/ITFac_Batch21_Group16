import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I navigate to the dashboard application", () => {
    // Visits the specific URL you provided
    cy.visit("http://localhost:8080/ui/dashboard");
});

Then("the page should load successfully", () => {
    // Checks that the URL is correct (ensures we didn't crash or get a 404)
    cy.url().should("include", "/ui/dashboard");

    // Optional: Check if the 'body' exists to ensure content rendered
    cy.get("body").should("exist");
});