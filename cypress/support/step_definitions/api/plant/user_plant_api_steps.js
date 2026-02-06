import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("at least {int} plants exist in the system", (minCount) => {
  cy.apiLoginAs("admin").then((adminToken) => {
    // Check current count
    cy.getPlantSummary(adminToken).then((response) => {
      const totalPlants = response.body.totalPlants;

      if (totalPlants >= minCount) {
        return;
      }

      // Ensure a category exists first
      cy.ensurePlantExistsWithName("TestPlant_1").then((plant1) => {

        // Seed loop
        let chain = cy.wrap(null);
        for (let i = totalPlants + 1; i <= minCount; i++) {
          const plantData = {
            name: `TestPlant_${i}`,
            price: 50.0,
            quantity: 100,
            category: plant1.category
          };

          chain = chain.then(() =>
            cy.createPlant(plantData, adminToken).then(res => expect(res.status).to.eq(201))
          );
        }
        return chain;
      });
    });
  });
});

// ----------------------------------------------------------------------
// Test Steps
// ----------------------------------------------------------------------

When("the user retrieves plants with page {int} and size {int}", (page, size) => {
  cy.get("@authToken").then((token) => {
    cy.getPlantsPaged({token, page, size}).then((response) => {
      cy.wrap(response).as("apiResponse");
    });
  });
});

Then("the response should contain valid pagination metadata", () => {
  cy.get("@apiResponse").then((response) => {
    const body = response.body;
    expect(body).to.have.property("content");
    expect(body).to.have.property("totalElements");
    expect(body).to.have.property("totalPages");
    expect(body).to.have.property("size");

    expect(body.content).to.be.an("array");
    expect(body.totalElements).to.be.a("number");
    expect(body.totalPages).to.be.a("number");
    expect(body.size).to.be.a("number");
  });
});

Then("the response should contain {int} plant items", (expectedCount) => {
  cy.get("@apiResponse").then((response) => {
    expect(response.body.content).to.have.length(expectedCount);
  });
});

When("the user retrieves all plants", () => {
  cy.get("@authToken").then((token) => {
    cy.getAllPlants(token).then((response) => {
      cy.wrap(response).as("apiResponse");
    });
  });
});

Then("the response should be a list of plants", () => {
  cy.get("@apiResponse").then((response) => {
    expect(response.body).to.be.an("array");
    expect(response.body.length).to.be.at.least(1);

    const firstPlant = response.body[0];
    expect(firstPlant).to.have.property("id");
    expect(firstPlant).to.have.property("name");
    expect(firstPlant).to.have.property("price");
  });
});

When("the user retrieves the plant summary", () => {
  cy.get("@authToken").then((token) => {
    cy.getPlantSummary(token).then((response) => {
      cy.wrap(response).as("apiResponse");
    });
  });
});

Then("the response should contain valid summary data", () => {
  cy.get("@apiResponse").then((response) => {
    const body = response.body;
    expect(body).to.exist;
    expect(body).to.be.an("object");
    expect(body).to.have.property("totalPlants");
    expect(body.totalPlants).to.be.a("number");
  });
});

When("the user attempts to retrieve the plant summary without an auth token", () => {
  cy.request({
    method: "GET",
    url: "/api/plants/summary",
    failOnStatusCode: false // Prevent Cypress from failing the test on 4xx/5xx
  }).then((response) => {
    cy.wrap(response).as("apiResponse");
  });
});



// Logic for Index 215004T
Given("a valid plant and category exists", () => {
  cy.get("@authToken").then((token) => {
    cy.request({
      method: "GET",
      url: "/api/plants/paged",
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      const plant = res.body.content[0];
      cy.wrap(plant.id).as("validPlantId");
      cy.wrap(plant.category.id).as("validCategoryId");
    });
  });
});


// --- WHEN STEPS ---

When("the user retrieves plant details using a valid plant ID", () => {
  cy.get("@authToken").then((token) => {
    cy.get("@validPlantId").then((id) => cy.getPlantById(id, token).as("apiResponse"));
  });
});

When("the user retrieves plant details using an invalid plant ID {int}", (invalidId) => {
  cy.get("@authToken").then((token) => cy.getPlantById(invalidId, token).as("apiResponse"));
});

When("the user retrieves plants using a valid category ID", () => {
  cy.get("@authToken").then((token) => {
    cy.get("@validCategoryId").then((categoryId) => cy.getPlantsPaged({token, categoryId}).as("apiResponse"));
  });
});

When("the user retrieves plants using an invalid category ID {int}", (categoryId) => {
  cy.get("@authToken").then((token) => cy.getPlantsPaged({token, categoryId}).as("apiResponse"));
});

When("the user searches for plants with name {string}", (name) => {
  cy.get("@authToken").then((token) => cy.getPlantsPaged({token, name}).as("apiResponse"));
});

// --- THEN STEPS ---



Then("the response should contain correct plant details", () => {
  cy.get("@apiResponse").then((res) => {
    expect(res.body).to.have.property("id");
    expect(res.body).to.have.property("name");
  });
});

Then("the response should contain a list of plants belonging to the category", () => {
  cy.get("@apiResponse").then((response) => {
    cy.get("@validCategoryId").then(expectedId => {
      const plants = response.body.content;
      expect(plants).to.be.an('array');
      const allMatch = plants.every(plant => plant.category.id === expectedId);
      expect(allMatch, "All plants should belong to the correct category").to.be.true;
    });
  });
});

Then("the response should be an empty list", () => {
  cy.get("@apiResponse").then((res) => {
    if (res.status === 200) {
        expect(res.body.content).to.be.an("array").and.have.length(0);
    }
  });
});

Then("the response list should contain the plant {string}", (name) => {
  cy.get("@apiResponse").then((res) => {
    const names = res.body.content.map(p => p.name);
    expect(names).to.include(name);
  });
});

Then("the response status code is {string} or {string}", (code1, code2) => {
  cy.get("@apiResponse").then((res) => {
    const status = res.status;
    const expected1 = parseInt(code1);
    const expected2 = parseInt(code2);
    
    // Pass if the status matches either of the two expected codes
    expect([expected1, expected2]).to.include(
      status, 
      `Expected status to be either ${expected1} or ${expected2}, but got ${status}`
    );
  });
});
