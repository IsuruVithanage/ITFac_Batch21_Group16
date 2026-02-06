import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let userToken;
let adminToken;
let apiResponse;
let validSaleId;
let salesData;

before(() => {
  cy.fixture("sales").then((data) => {
    salesData = data;
  });
});

Given("the user is authenticated as {string}", (role) => {
  cy.apiLoginAs(role).then((token) => {
    userToken = token;
    expect(userToken).to.exist;
  });
});

When("the user attempts to create a sale with valid data", () => {
  cy.apiCreateSale(userToken, salesData.valid, false).then((res) => {
    apiResponse = res;
  });
});

When("the user attempts to delete the sale", () => {
  cy.apiDeleteSale(userToken, validSaleId, false).then((res) => {
    apiResponse = res;
  });
});

Then("the system should reject the request with forbidden error", () => {
  expect(apiResponse.status).to.be.oneOf([401, 403]);
});

When("the user sends a GET request to fetch sales data", () => {
  cy.apiGetSales(userToken).then((res) => {
    apiResponse = res;
  });
});

Then("the system should return existing sales data successfully", () => {
  expect(apiResponse.status).to.eq(200);
  expect(apiResponse.body).to.be.an("array");
});

Given("an admin has created a sale", () => {
  cy.apiLoginAs("admin").then((token) => {
    adminToken = token;

    cy.apiCreateSale(adminToken, salesData.valid).then((res) => {
      validSaleId = res.body.id;
    });
  });
});

When("the user fetches the sale by ID", () => {
  cy.apiGetSaleById(userToken, validSaleId).then((res) => {
    apiResponse = res;
  });
});

Then("the system should return the sale details successfully", () => {
  expect(apiResponse.status).to.eq(200);
  expect(apiResponse.body.id).to.eq(validSaleId);
});

When("the user requests sales data with pagination and sorting", () => {
  cy.apiGetPaginatedSales(userToken, {
    page: 0,
    size: 5,
    sort: "id,desc",
  }).then((res) => {
    apiResponse = res;
  });
});

Then("the system should return paginated and sorted sales data", () => {
  expect(apiResponse.status).to.eq(200);
  expect(apiResponse.body.content).to.be.an("array");
});
