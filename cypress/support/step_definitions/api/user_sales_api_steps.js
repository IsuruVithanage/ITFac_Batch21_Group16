import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let userToken;
let apiResponse;
let validSaleId;

Given('the user is authenticated as "testUser"', () => {
  cy.apiLoginAs("testUser").then((token) => {
    userToken = token;
    expect(userToken).to.exist;
  });
});

Given("a valid plant code exists with sufficient stock", () => {
  currentSaleType = "valid";
});

Given("a valid plant code exists with limited stock", () => {
  currentSaleType = "exceedStock";
});

When("the testuser creates a sale with valid data", () => {
  currentSaleType = "valid";
  createSale();
});

When("the testuser creates a sale with an invalid plant code", () => {
  currentSaleType = "invalidPlant";
  createSale();
});

When("the testuser creates a sale with quantity exceeding stock", () => {
  currentSaleType = "exceedStock";
  createSale();
});

//Sale creation helper

function createSale() {
  const sale = salesData[currentSaleType];

  if (!sale) {
    throw new Error(`No fixture data for sale type: ${currentSaleType}`);
  }

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

    if (response.status === 200 || response.status === 201) {
      validSaleId = response.body.id;
    }
  });
}

When("the testuser deletes the sale", () => {
  expect(validSaleId, "Valid sale ID should exist").to.exist;

  cy.request({
    method: "DELETE",
    url: `/api/sales/${validSaleId}`,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    apiResponse = response;
  });
});

Then("the system should successfully delete the sale", () => {
  expect(apiResponse.status).to.be.oneOf([200, 204]);
});

/* ======================================================
   GET ALL SALES
====================================================== */

When("the user sends a GET request to fetch sales data", () => {
  cy.request({
    method: "GET",
    url: "/api/sales",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  }).then((res) => {
    apiResponse = res;
  });
});

Then("the system should return existing sales data successfully", () => {
  expect(apiResponse.status).to.eq(200);
  expect(apiResponse.body).to.exist;
});

/* ======================================================
   GET SALE BY ID
====================================================== */

When("the testuser fetches the sale by ID", () => {
  cy.request({
    method: "GET",
    url: `/api/sales/${validSaleId}`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  }).then((res) => {
    apiResponse = res;
  });
});

Then("the system should return the sale details successfully", () => {
  expect(apiResponse.status).to.eq(200);
  expect(apiResponse.body.id).to.eq(validSaleId);
});

/* ======================================================
   PAGINATION & SORTING
====================================================== */

When("the testuser requests sales data with pagination and sorting", () => {
  cy.request({
    method: "GET",
    url: "/api/sales/page",
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    qs: {
      page: 0,
      size: 5,
      sort: "id,desc",
    },
  }).then((res) => {
    apiResponse = res;
  });
});

Then("the system should return paginated and sorted sales data", () => {
  expect(apiResponse.status).to.eq(200);
  expect(apiResponse.body.content).to.be.an("array");
});
