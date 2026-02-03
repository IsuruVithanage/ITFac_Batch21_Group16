import { Given } from "@badeball/cypress-cucumber-preprocessor";

Given("the {string} is authenticated via API", (role) => {
  cy.apiLoginAs(role).then((authToken) => {
    cy.wrap(authToken).as("authToken");
  });
});
