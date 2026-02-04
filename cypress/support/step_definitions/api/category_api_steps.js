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
        cy.get("@authToken").then((token) => {
            cy.getCategoriesWithPagination(token, page, size).as("apiResponse");
        });
    }
);

When(
    "the user searches categories with name {string} using pagination page {int} and size {int}",
    (name, page, size) => {
        cy.get("@authToken").then((token) => {
            cy.searchCategoriesWithPagination(token, name, page, size)
                .as("apiResponse");
        });
    }
);

Then("the response should contain a list of categories", () => {
    expect(apiResponse.body.content).to.be.an("array");
});