import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I visit the Login page", () => {
    cy.visit("/ui/login", { failOnStatusCode: false });
});

When("I login as {string}", (userType) => {
    cy.loginAs(userType);
});

When("I click the login button", () => {
    cy.get('button, input[type="submit"]')
        .contains(/Login|Sign In|Submit/i)
        .click();
});

Then("I should be redirected to the dashboard", () => {
    cy.url().should("include", "/ui/dashboard");
});