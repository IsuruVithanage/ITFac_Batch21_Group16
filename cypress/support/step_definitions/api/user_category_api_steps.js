import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let categoryIdByName = {};

Given('a category named {string} exists in the system', (categoryName) => {
  // Use admin token to ensure access to listing
  return cy.apiLoginAs("admin").then((token) => {
    return cy.getAllCategories(token).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");

      const found = response.body.find(
        (c) => String(c.name).toLowerCase() === String(categoryName).toLowerCase()
      );

      expect(
        found,
        `Category "${categoryName}" not found in GET /api/categories. Ensure Admin tests created it first.`
      ).to.exist;

      categoryIdByName[categoryName] = found.id;
      expect(categoryIdByName[categoryName], "found category id").to.exist;
    });
  });
});

When('the user retrieves the category by the valid id of {string}', (categoryName) => {
  const id = categoryIdByName[categoryName];
  expect(id, `No stored id for category "${categoryName}"`).to.exist;

  // Retrieve the User Token (set in Background)
  cy.get("@authToken").then((token) => {
    cy.getCategoryById(id, token).then((response) => {
      cy.wrap(response).as("apiResponse");
    });
  });
});

Then('the category details should match name {string} and parentId null', (categoryName) => {
  const expectedId = categoryIdByName[categoryName];

  cy.get("@apiResponse").then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property("id", expectedId);
    expect(response.body).to.have.property("name", categoryName);

    // For main category like "Fruits"
    expect(response.body).to.have.property("parentId");
    expect(response.body.parentId).to.eq(null);
  });
});

When("the user retrieves a category by invalid id {int}", (invalidId) => {
  cy.get("@authToken").then((token) => {
    cy.getCategoryById(invalidId, token).then((response) => {
      cy.wrap(response).as("apiResponse");
    });
  });
});

Then("the response should indicate the category does not exist", () => {
  cy.get("@apiResponse").then((response) => {
    expect(response.status).to.eq(404);

    const bodyText = JSON.stringify(response.body).toLowerCase();

    // Flexible assertion for not-found errors
    expect(bodyText).to.match(/not found|does not exist|no category/);
  });
});

When("the user retrieves all sub-categories", () => {
  cy.get("@authToken").then((token) => {
    cy.getAllSubCategories(token).then((response) => {
      cy.wrap(response).as("apiResponse");
    });
  });
});

Then("the response should be a list of sub-categories", () => {
  cy.get("@apiResponse").then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.be.an("array");

    // If the system has sub-categories, list may be non-empty.
    // We'll validate shape for each element if present.
    response.body.forEach((item) => {
      expect(item).to.have.property("id");
      expect(item).to.have.property("name");

      // Based on your sample: subCategories exists and is an array (often empty)
      expect(item).to.have.property("subCategories");
      expect(item.subCategories).to.be.an("array");
    });
  });
});

When("the user retrieves all main categories", () => {
  cy.get("@authToken").then((token) => {
    cy.getMainCategories(token).then((response) => {
      cy.wrap(response).as("apiResponse");
    });
  });
});

Then("the response should contain only main categories at top level", () => {
  cy.get("@apiResponse").then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.be.an("array");

    // Validate ONLY the top-level items are main categories
    response.body.forEach((mainCat) => {
      expect(mainCat).to.have.property("id");
      expect(mainCat).to.have.property("name");

      // Main categories include subCategories array (may be empty)
      expect(mainCat).to.have.property("subCategories");
      expect(mainCat.subCategories).to.be.an("array");

      // If subCategories exist, validate their structure too
      mainCat.subCategories.forEach((subCat) => {
        expect(subCat).to.have.property("id");
        expect(subCat).to.have.property("name");
        expect(subCat).to.have.property("subCategories");
        expect(subCat.subCategories).to.be.an("array");
      });
    });
  });
});

When("the user retrieves all categories", () => {
  cy.get("@authToken").then((token) => {
    cy.getAllCategories(token).then((response) => {
      cy.wrap(response).as("apiResponse");
    });
  });
});

When("the user retrieves the category summary", () => {
  cy.get("@authToken").then((token) => {
    cy.getCategorySummary(token).as("apiResponse");
  });
});

When(
    "the user searches categories with parent name {string} using pagination page {int} and size {int}",
    (parentName, page, size) => {
      cy.get("@authToken").then((token) => {
        cy.searchCategoriesWithPagination(token, parentName, page, size)
            .as("apiResponse");
      });
    }
);

When(
    "the user retrieves categories sorted by {string} in {string} order",
    (field, order) => {
      cy.get("@authToken").then((token) => {
        cy.getSortedCategories(token, field, order)
            .as("apiResponse");
      });
    }
);

Then(
    "the categories should be sorted by {string} in ascending order",
    (field) => {
      cy.get("@apiResponse").then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("content");
        expect(response.body.content).to.be.an("array");

        const names = response.body.content.map(
            (cat) => cat[field]?.toLowerCase()
        );

        const sortedNames = [...names].sort((a, b) =>
            a.localeCompare(b)
        );

        expect(names).to.deep.equal(sortedNames);
      });
    }
);

Then(
    "the response should contain categories related to parent name {string}",
    (parentName) => {
      cy.get("@apiResponse").then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("content");
        expect(response.body.content).to.be.an("array");

        response.body.content.forEach((category) => {
          const isParentCategory =
              category.name.toLowerCase() === parentName.toLowerCase();

          const isChildOfParent =
              category.parentName &&
              category.parentName.toLowerCase() === parentName.toLowerCase();

          expect(
              isParentCategory || isChildOfParent,
              `Category ${category.name} should be related to parent ${parentName}`
          ).to.be.true;
        });
      });
    }
);

Then(
    "the response should contain categories matching name {string}",
    (searchName) => {
      cy.get("@apiResponse").then((response) => {
        expect(response.status).to.eq(200);

        expect(response.body).to.have.property("content");
        expect(response.body.content).to.be.an("array");

        response.body.content.forEach((category) => {
          expect(
              category.name.toLowerCase(),
              "Category name should match search term"
          ).to.include(searchName.toLowerCase());
        });
      });
    }
);

Then("the response should contain a list of categories with parentName", () => {
  cy.get("@apiResponse").then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.be.an("array");

    // Should not be empty if categories exist
    expect(response.body.length).to.be.greaterThan(0);

    response.body.forEach((cat) => {
      expect(cat).to.have.property("id");
      expect(cat).to.have.property("name");
      expect(cat).to.have.property("parentName");

      // parentName could be "-" for main categories or actual parent name for sub categories
      expect(cat.parentName).to.be.a("string");
      expect(cat.parentName.length).to.be.greaterThan(0);
    });
  });
});
