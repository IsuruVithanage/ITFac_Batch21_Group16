Cypress.Commands.add(
    "getCategoriesWithPagination",
    (token, page, size) => {
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

Cypress.Commands.add("getCategoriesEnsuringMultiple", (token) => {
    return cy.getAllCategories(token).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.length).to.be.greaterThan(1);
        return response.body;
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

Cypress.Commands.add(
    "updateCategoryName",
    (token, categoryId, newName) => {
        return cy.request({
            method: "PUT",
            url: `/api/categories/${categoryId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false,
            body: {
                name: newName,
            },
        });
    }
);


Cypress.Commands.add("splitCategoriesByType", (categories) => {
    return {
        mainCategories: categories.filter(cat => cat.parentId === null),
        subCategories: categories.filter(cat => cat.parentId !== null),
    };
});

Cypress.Commands.add("deleteCategory", (categoryId, token, options = {}) => {
    return cy.request({
        method: "DELETE",
        url: `/api/categories/${categoryId}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        failOnStatusCode: options.failOnStatusCode ?? false,
    });
});

Cypress.Commands.add(
    "updateCategory",
    (categoryId, payload, token, options = {}) => {
        return cy.request({
            method: "PUT",
            url: `/api/categories/${categoryId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: payload,
            failOnStatusCode: options.failOnStatusCode ?? false,
        });
    }
);

Cypress.Commands.add("getCategorySummary", (token) => {
    return cy.request({
        method: "GET",
        url: "/api/categories/summary",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        failOnStatusCode: false,
    });
});

Cypress.Commands.add(
    "searchCategoriesWithPagination",
    (token, name, page, size) => {
        return cy.request({
            method: "GET",
            url: "/api/categories/page",
            qs: {
                name,
                page,
                size,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
            failOnStatusCode: false,
        });
    }
);