import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let token;

Given("the admin is authenticated via API", () => {
  return cy.apiLoginAs("admin").then((authToken) => {
    token = authToken;
  });
});

Given('a category named {string} already exists', (categoryName) => {
  // Ensure precondition: try to create it; if it already exists that's okay.
  return cy.createCategory(categoryName, token).then((response) => {
    expect([201, 400, 409]).to.include(response.status);
  });
});

When("the admin creates a category with name {string}", (categoryName) => {
  return cy.createCategory(categoryName, token).then((response) => {
    cy.wrap(response).as("apiResponse");
  });
});

Then("the category should be created with name {string}", (categoryName) => {
  cy.get("@apiResponse").then((response) => {
    expect(response.status).to.eq(201);
    expect(response.body).to.have.property("id");
    expect(response.body.name).to.eq(categoryName);
  });
});

Then("the response status code should be {int} or {int}", (code1, code2) => {
  cy.get("@apiResponse").then((response) => {
    expect([code1, code2]).to.include(response.status);
  });
});

Then("the response should indicate the category name already exists", () => {
  cy.get("@apiResponse").then((response) => {
    const bodyText = JSON.stringify(response.body).toLowerCase();
    expect(bodyText).to.match(/exist|duplicate|already/);
  });
});
