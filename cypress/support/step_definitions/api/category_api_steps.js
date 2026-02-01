import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let apiResponse;
let authToken;

Given("the user is authenticated", () => {
    cy.apiLoginAs("testUser").then((token) => {
        authToken = token;
    });
});

When(
    "the user sends a request to get categories with page {int} and size {int}",
    (page, size) => {
        cy.getCategoriesWithPagination(page, size, authToken)
            .then((response) => {
                apiResponse = response;
            });
    }
);

//Then("the response status code should be {int}", (statusCode) => {
//    expect(apiResponse.status).to.eq(statusCode);
//});

Then("the response status code should be {int}", (statusCode) => {
  cy.get("@apiResponse").then((response) => {
    expect(response).to.exist;
    expect(response.status).to.eq(statusCode);
  });
});


Then("the response should contain a list of categories", () => {
    expect(apiResponse.body.content).to.be.an("array");
});