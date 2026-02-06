import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let apiResponse;
let authToken;
let validSaleId;
let salesData;
let currentSaleType;

before(() => {
  cy.fixture("sales").then((data) => {
    salesData = data;
  });
});

/* ================= AUTH ================= */

Given("the admin is authenticated", () => {
  cy.apiLoginAs("admin").then((token) => {
    authToken = token;
    expect(authToken).to.exist;
  });
});

/* ================= PRECONDITIONS ================= */

Given("a valid plant code exists with sufficient stock", () => {
  currentSaleType = "valid";
});

Given("a valid plant code exists with limited stock", () => {
  currentSaleType = "exceedStock";
});

/* ================= CREATE SALE ================= */

When("the admin creates a sale with valid data", () => {
  currentSaleType = "valid";
  createSale();
});

When("the admin creates a sale with an invalid plant code", () => {
  currentSaleType = "invalidPlant";
  createSale();
});

When("the admin creates a sale with quantity exceeding stock", () => {
  currentSaleType = "exceedStock";
  createSale();
});

function createSale() {
  const sale = salesData[currentSaleType];
  expect(sale).to.exist;

  cy.request({
    method: "POST",
    url: `/api/sales/plant/${sale.plantId}`,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    qs: {
      quantity: sale.quantity,
    },
    failOnStatusCode: false,
  }).then((response) => {
    apiResponse = response;
    if ([200, 201].includes(response.status)) {
      validSaleId = response.body.id;
    }
  });
}

When("the admin sends a GET request to fetch sales data", () => {
  cy.request({
    method: "GET",
    url: "/api/sales",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    cy.wrap(response).as("apiResponse");
  });
});

Then("the system should successfully create the sale", () => {
  expect(apiResponse.status).to.be.oneOf([200, 201]);
  expect(apiResponse.body).to.have.property("id");
});

Then("the system should reject the request with plant not found error", () => {
  expect(apiResponse.status).to.eq(404);
  expect(apiResponse.body.message.toLowerCase()).to.include("not found");
});

Then(
  "the system should reject the request with insufficient stock error",
  () => {
    expect(apiResponse.status).to.eq(400);
  },
);

Given("a valid sale ID exists", () => {
  const sale = salesData.valid;

  cy.request({
    method: "POST",
    url: `/api/sales/plant/${sale.plantId}`,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    qs: {
      quantity: sale.quantity,
    },
  }).then((response) => {
    expect(response.status).to.be.oneOf([200, 201]);
    validSaleId = response.body.id;
  });
});

When("the admin deletes the sale", () => {
  expect(validSaleId).to.exist;

  cy.request({
    method: "DELETE",
    url: `/api/sales/${validSaleId}`,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    cy.wrap(response).as("apiResponse");
  });
});
