import { Given } from "@badeball/cypress-cucumber-preprocessor";

Given("the user is logged in as {string}", (userType) => {
    cy.loginAs(userType);
    cy.url().should("include", "/ui/dashboard");
});
