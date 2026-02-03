import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let apiResponse;
let authToken;
let validSaleId;
let salesData;
let currentSaleType;

beforeEach(() => {
  cy.fixture("sales").then((data) => {
    salesData = data;
  });
});


//Auth 

Given("the admin is authenticated", () => {
  cy.apiLoginAs("testUser").then((token) => {
    authToken = token;
    expect(token).to.exist;
  });
});

Given("a valid plant code exists with sufficient stock", () => {
  currentSaleType = "valid";
});

Given("a valid plant code exists with limited stock", () => {
  currentSaleType = "exceedStock";
});

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

//Fetch sales data

When("the admin sends a GET request to fetch sales data", () => {
  cy.request({
    method: "GET",
    url: "/api/sales",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  }).then((response) => {
    apiResponse = response;
  });
});

Then("the system should return existing sales data successfully", () => {
  expect(apiResponse.status).to.eq(200);
  expect(apiResponse.body).to.be.an("array");
});

//Sale creation validations

Then("the system should successfully create the sale", () => {
  // Backend returns 200 instead of 201
  expect(apiResponse.status).to.be.oneOf([200, 201]);
  expect(apiResponse.body).to.have.property("id");
});

Then("the system should reject the request with plant not found error", () => {
  expect(apiResponse.status).to.eq(404);
  expect(apiResponse.body.message.toLowerCase()).to.contain("not found");
});

Then(
  "the system should reject the request with insufficient stock error",
  () => {
    expect(apiResponse.status).to.eq(400);
    expect(apiResponse.body.message).to.match(
      /has only \d+ items available in stock/i,
    );
  },
);

//Sale deletion steps

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
