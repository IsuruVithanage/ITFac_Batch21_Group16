Cypress.Commands.add(
    "getCategoriesWithPagination",
    (page, size, token) => {
        const pageNumber = Number(page);
        const pageSize = Number(size);

        return cy.request({
            method: "GET",
            url: `/api/categories/page?page=${pageNumber}&size=${pageSize}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
);

Cypress.Commands.add("createCategory", (name, token) => {
  return cy.request({
    method: "POST",
    url: "/api/categories",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: {
      name: name,
    },
    failOnStatusCode: false,
  });
});
