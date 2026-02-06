import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let authToken;
let validSaleId;
let salesData;
let currentSaleType;

before(() => {
  cy.fixture("sales").then((data) => {
    salesData = data;
  });
});

Given("the admin is authenticated", () => {
  cy.apiLoginAs("admin").then((token) => {
    authToken = token;
    expect(authToken, "Auth token").to.exist;
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
  createSale(false);
});

When("the admin creates a sale with an invalid plant code", () => {
  currentSaleType = "invalidPlant";
  createSale(false);
});

When("the admin creates a sale with quantity exceeding stock", () => {
  currentSaleType = "exceedStock";
  createSale(false);
});

function createSale(failOnStatusCode = true) {
  const sale = salesData[currentSaleType];
  expect(sale, "Sale data").to.exist;

  cy.apiCreateSale(authToken, sale, failOnStatusCode).then((res) => {
    if ([200, 201].includes(res.status)) {
      validSaleId = res.body.id;
    }
    cy.wrap(res).as("apiResponse");
  });
}

When("the admin sends a GET request to fetch sales data", () => {
  cy.apiGetSales(authToken).then((res) => {
    cy.wrap(res).as("apiResponse");
  });
});

Then("the system should successfully create the sale", () => {
  cy.get("@apiResponse").then((res) => {
    expect(res.status).to.be.oneOf([200, 201]);
    expect(res.body).to.have.property("id");
  });
});

Then("the system should reject the request with plant not found error", () => {
  cy.get("@apiResponse").then((res) => {
    expect(res.status).to.eq(404);
  });
});

Then(
  "the system should reject the request with insufficient stock error",
  () => {
    cy.get("@apiResponse").then((res) => {
      expect(res.status).to.eq(400);
    });
  },
);

Given("a valid sale ID exists", () => {
  cy.apiCreateSale(authToken, salesData.valid).then((res) => {
    expect(res.status).to.be.oneOf([200, 201]);
    validSaleId = res.body.id;
  });
});

When("the admin deletes the sale", () => {
  expect(validSaleId, "Sale ID").to.exist;

  cy.apiDeleteSale(authToken, validSaleId).then((res) => {
    cy.wrap(res).as("apiResponse");
  });
});
