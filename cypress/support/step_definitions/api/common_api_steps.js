import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("the {string} is authenticated via API", (role) => {
  cy.apiLoginAs(role).then((authToken) => {
    cy.wrap(authToken).as("authToken");
  });
});

Given("the user is logged out", () => {
  cy.wrap(null).as("authToken");
});

Then("the response status code should be {string}", (statusCodes) => {
  const allowedCodes = statusCodes
    .split(/[, ]+| or /i)
    .filter(Boolean) 
    .map(code => parseInt(code.trim()));

  cy.get("@apiResponse").then((response) => {
    expect(response).to.exist;
    expect(allowedCodes).to.include(response.status);
  });
});

Then("the response should indicate {string}", (errorMessage) => {
  cy.get("@apiResponse").then((response) => {
    const bodyString = JSON.stringify(response.body);
    expect(bodyString).to.include(errorMessage);
  });
});
