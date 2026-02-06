import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let userToken;
let adminToken;
let apiResponse;
let validSaleId;
let salesData;

/* ================= FIXTURES ================= */

before(() => {
  cy.fixture("sales").then((data) => {
    salesData = data;
  });
});

/* ================= AUTH (FIXED) ================= */

Given("the user is authenticated as {string}", (role) => {
  cy.apiLoginAs(role).then((token) => {
    userToken = token;
    expect(userToken).to.exist;
  });
});

/* ================= CREATE SALE (FORBIDDEN) ================= */

When("the user attempts to create a sale with valid data", () => {
  const sale = salesData.valid;

  cy.request({
    method: "POST",
    url: `/api/sales/plant/${sale.plantId}`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    qs: {
      quantity: sale.quantity,
    },
    failOnStatusCode: false,
  }).then((res) => {
    apiResponse = res;
  });
});

/* ================= DELETE SALE (FORBIDDEN) ================= */

When("the user attempts to delete the sale", () => {
  cy.request({
    method: "DELETE",
    url: `/api/sales/${validSaleId}`,
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
    failOnStatusCode: false,
  }).then((res) => {
    apiResponse = res;
  });
});

/* ================= FORBIDDEN ASSERTION ================= */

Then("the system should reject the request with forbidden error", () => {
  expect(apiResponse.status).to.be.oneOf([401, 403]);
});

/* ================= GET ALL SALES ================= */

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
  expect(apiResponse.body).to.be.an("array");
});

Given("an admin has created a sale", () => {
  cy.apiLoginAs("admin").then((token) => {
    adminToken = token;
    expect(adminToken).to.exist;

    cy.fixture("sales").then((salesData) => {
      const sale = salesData.valid;

      cy.request({
        method: "POST",
        url: `/api/sales/plant/${sale.plantId}`,
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
        qs: {
          quantity: sale.quantity,
        },
      }).then((res) => {
        expect(res.status).to.be.oneOf([200, 201]);
        validSaleId = res.body.id;
        expect(validSaleId).to.exist;
      });
    });
  });
});

/* ================= GET SALE BY ID ================= */

When("the user fetches the sale by ID", () => {
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

/* ================= PAGINATION & SORTING ================= */

When("the user requests sales data with pagination and sorting", () => {
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
  expect(apiResponse.body).to.have.property("content");
  expect(apiResponse.body.content).to.be.an("array");
});
