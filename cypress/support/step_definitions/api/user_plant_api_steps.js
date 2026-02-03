import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("at least {int} plants exist in the system", (minCount) => {
  cy.apiLoginAs("admin").then((adminToken) => {
    // Check current count
    cy.request({
      method: "GET",
      url: "/api/plants/paged",
      qs: { page: 0, size: 1 },
      headers: { Authorization: `Bearer ${adminToken}` },
    }).then((response) => {
      const totalPlants = response.body.totalElements;

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
    cy.getPlantsPaged(page, size, token).then((response) => {
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
