import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I visit the Login page", () => {
    cy.visit("http://localhost:8080/ui/login", { failOnStatusCode: false });
});

When("I enter the username {string}", (username) => {
    // Finds the input field with id="username" or name="username"
    // If your app uses a different ID, change '#username' below.
    cy.get('input[name="username"], #username').clear().type(username);
});

When("I enter the password {string}", (password) => {
    // Finds the input field with id="password" or name="password"
    cy.get('input[name="password"], #password').clear().type(password);
});

When("I click the login button", () => {
    // Looks for a button that contains the text "Login" or "Sign In"
    // You might need to change 'button' to 'input[type="submit"]' if it fails
    cy.get('button, input[type="submit"]').contains(/Login|Sign In|Submit/i).click();
});

Then("I should be redirected to the dashboard", () => {
    // verifies the URL changes to /dashboard
    cy.url().should("include", "/ui/dashboard");
});