
Cypress.Commands.add(
  "apiCreateSale",
  (token, sale, failOnStatusCode = true) => {
    expect(token, "Auth token").to.exist;
    expect(sale, "Sale data").to.exist;

    return cy.request({
      method: "POST",
      url: `/api/sales/plant/${sale.plantId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      qs: {
        quantity: sale.quantity,
      },
      failOnStatusCode,
    });
  },
);



Cypress.Commands.add("apiGetSales", (token) => {
  expect(token, "Auth token").to.exist;

  return cy.request({
    method: "GET",
    url: "/api/sales",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
});



Cypress.Commands.add(
  "apiGetSaleById",
  (token, saleId, failOnStatusCode = true) => {
    expect(token).to.exist;
    expect(saleId).to.exist;

    return cy.request({
      method: "GET",
      url: `/api/sales/${saleId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      failOnStatusCode,
    });
  },
);



Cypress.Commands.add(
  "apiDeleteSale",
  (token, saleId, failOnStatusCode = true) => {
    expect(token).to.exist;
    expect(saleId).to.exist;

    return cy.request({
      method: "DELETE",
      url: `/api/sales/${saleId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      failOnStatusCode,
    });
  },
);



Cypress.Commands.add(
  "apiGetPaginatedSales",
  (token, { page = 0, size = 10, sort = "id,desc" } = {}) => {
    expect(token).to.exist;

    return cy.request({
      method: "GET",
      url: "/api/sales/page",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      qs: { page, size, sort },
    });
  },
);
