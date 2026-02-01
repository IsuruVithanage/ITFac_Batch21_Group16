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

Cypress.Commands.add(
  "createSubCategory",
  (id, name, parentId, parentName, token) => {
    return cy.request({
      method: "POST",
      url: "/api/categories",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        id: id,
        name: name,
        parent: {
          id: parentId,
          name: parentName,
          parentName: "-",
        },
      },
      failOnStatusCode: false,
    });
  }
);

Cypress.Commands.add("getCategoryById", (categoryId, token) => {
  return cy.request({
    method: "GET",
    url: `/api/categories/${categoryId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("getAllCategories", (token) => {
  return cy.request({
    method: "GET",
    url: "/api/categories",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("getAllSubCategories", (token) => {
  return cy.request({
    method: "GET",
    url: "/api/categories/sub-categories",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add("getMainCategories", (token) => {
  return cy.request({
    method: "GET",
    url: "/api/categories/main",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    failOnStatusCode: false,
  });
});


