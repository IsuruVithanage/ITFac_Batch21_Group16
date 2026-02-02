import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

let token;

Given("the admin is authenticated via API", () => {
  return cy.apiLoginAs("admin").then((authToken) => {
    token = authToken;
  });
});

Given('a category named {string} already exists', (categoryName) => {
  // Ensure precondition: try to create it; if it already exists that's okay.
  return cy.createCategory(categoryName, token).then((response) => {
    expect([201, 400, 409]).to.include(response.status);
  });
});

When("the admin creates a category with name {string}", (categoryName) => {
  return cy.createCategory(categoryName, token).then((response) => {
    cy.wrap(response).as("apiResponse");
  });
});

Then("the category should be created with name {string}", (categoryName) => {
  cy.get("@apiResponse").then((response) => {
    expect(response.status).to.eq(201);
    expect(response.body).to.have.property("id");
    expect(response.body.name).to.eq(categoryName);
  });
});

Then("the response status code should be {int} or {int}", (code1, code2) => {
  cy.get("@apiResponse").then((response) => {
    expect([code1, code2]).to.include(response.status);
  });
});

Then("the response should indicate the category name already exists", () => {
  cy.get("@apiResponse").then((response) => {
    const bodyText = JSON.stringify(response.body).toLowerCase();
    expect(bodyText).to.match(/exist|duplicate|already/);
  });
});

Then("the response should indicate the category name is too short", () => {
  cy.get("@apiResponse").then((response) => {
    expect(response.status).to.eq(400);

    // Assert structured fields (best practice)
    expect(response.body).to.have.property("message");
    expect(String(response.body.message).toLowerCase()).to.include("validation");

    expect(response.body).to.have.property("details");
    expect(response.body.details).to.have.property("name");

    const nameError = String(response.body.details.name).toLowerCase();

    // Matches: "Category name must be between 3 and 10 characters"
    expect(nameError).to.match(/between\s*3\s*and\s*10/);
    expect(nameError).to.include("character");
  });
});

Then("the response should indicate the category name is too long", () => {
  cy.get("@apiResponse").then((response) => {
    expect(response.status).to.eq(400);

    expect(response.body).to.have.property("message");
    expect(String(response.body.message).toLowerCase()).to.include("validation");

    expect(response.body).to.have.property("details");
    expect(response.body.details).to.have.property("name");

    const nameError = String(response.body.details.name).toLowerCase();

    // Same rule, opposite boundary
    expect(nameError).to.match(/between\s*3\s*and\s*10/);
    expect(nameError).to.include("character");
  });
});

let parentCategory = {};

Given('a parent category named {string} exists', (parentName) => {
  // fixed parent id = 1 as per your request body
  parentCategory = { id: 1, name: parentName, parentName: "-" };
});

When(
  'the admin creates a sub-category with name {string} under that parent category',
  (subName) => {
    return cy
      .createSubCategory(2, subName, parentCategory.id, parentCategory.name, token)
      .then((response) => {
        cy.wrap(response).as("apiResponse");
      });
  }
);

Then(
  "the sub-category should be created with name {string} linked to the parent",
  (subName) => {
    cy.get("@apiResponse").then((response) => {
      expect(response.status).to.eq(201);

      // Response only contains id, name, subCategories (no parent info)
      expect(response.body).to.have.property("id");
      expect(response.body.name).to.eq(subName);

      // subCategories is null in your response
      expect(response.body).to.have.property("subCategories");
      expect(response.body.subCategories).to.eq(null);
    });
  }
);

Given("at least {int} categories exist in the system", (minCount) => {
  let adminToken;

  return cy.apiLoginAs("admin").then((token) => {
    adminToken = token;

    return cy.getAllCategories(adminToken).then((response) => {
      expect(response.status).to.eq(200);

      const categories = response.body;
      const existingCount = categories.length;

      if (existingCount >= minCount) {
        cy.log(`Already have ${existingCount} categories. No seeding needed.`);
        return;
      }

      // Find max CAT### already in the system to avoid duplicates
      const catNums = categories
        .map((c) => String(c.name || ""))
        .map((name) => {
          const m = name.match(/^CAT(\d{3})$/);
          return m ? parseInt(m[1], 10) : null;
        })
        .filter((n) => n !== null);

      const start = catNums.length ? Math.max(...catNums) + 1 : 1;
      const toCreate = minCount - existingCount;

      cy.log(`Seeding ${toCreate} categories for pagination test (starting CAT${String(start).padStart(3, "0")})`);

      // Chain creations to keep Cypress command queue clean
      let chain = cy.wrap(null);

      for (let i = 0; i < toCreate; i++) {
        const categoryName = `CAT${String(start + i).padStart(3, "0")}`; // CAT001..CAT999

        chain = chain.then(() =>
          cy.createCategory(categoryName, adminToken)
            .its("status")
            .should("eq", 201)
        );
      }

      return chain;
    });
  });
});





