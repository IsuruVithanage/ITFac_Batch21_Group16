// CREATE SALE
Cypress.Commands.add(
  "apiCreateSale",
  ({ plantId, quantity, token, fail = false }) => {
    return cy.request({
      method: "POST",
      url: `/api/sales/plant/${plantId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      qs: { quantity }, 
      failOnStatusCode: !fail,
    });
  },
);

// GET SALES
Cypress.Commands.add("apiGetSales", (token) => {
  return cy.request({
    method: "GET",
    url: "/api/sales",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
});

// DELETE SALE
Cypress.Commands.add("apiDeleteSale", ({ saleId, token }) => {
  return cy.request({
    method: "DELETE",
    url: `/api/sales/${saleId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    failOnStatusCode: false, 
  });
});
