Cypress.Commands.add("createPlant", (plantData, token) => {
  return cy.request({
    method: "POST",
    url: `/api/plants/category/${plantData.category.id}`,
    headers: { Authorization: `Bearer ${token}` },
    body: plantData,
    failOnStatusCode: false
  });
});

Cypress.Commands.add("updatePlant", (plantId, plantData, token) => {
  return cy.request({
    method: "PUT",
    url: `/api/plants/${plantId}`,
    headers: { Authorization: `Bearer ${token}` },
    body: plantData,
    failOnStatusCode: false
  });
});

Cypress.Commands.add("deletePlant", (plantId, token) => {
  return cy.request({
    method: "DELETE",
    url: `/api/plants/${plantId}`,
    headers: { Authorization: `Bearer ${token}` },
    failOnStatusCode: false
  });
});

Cypress.Commands.add("ensurePlantExistsWithName", (plantName) => {
  // Login as admin
  return cy.apiLoginAs("admin").then((token) => {
    // Try to find the plant
    return cy.request({
      method: "GET",
      url: "/api/plants/paged",
      qs: {name: plantName},
      headers: {Authorization: `Bearer ${token}`},
    }).then((searchRes) => {
      expect(searchRes.status).to.eq(200);
      const existingPlant = searchRes.body.content.find(
        (p) => p.name === plantName
      );
      if (existingPlant) {
        return existingPlant;
      }
      else {
        cy.log("Plant not found. Fetching sub-categories to create one.");
        return cy.getAllSubCategories(token).then((subCatRes) => {
          expect(subCatRes.status).to.eq(200);
          const subCategories = subCatRes.body;

          if (!subCategories || subCategories.length === 0) {
            throw new Error(
              "Precondition Failed: No sub-categories found. Cannot create plant."
            );
          }

          const targetSubCategory = subCategories[0];
          const newPlantData = {
            name: plantName,
            price: 50.0,
            quantity: 100,
            category: targetSubCategory,
          };

          cy.log("Creating new Plant");
          return cy.createPlant(newPlantData, token).then((createRes) => {
            expect(createRes.status).to.eq(201);
            return createRes.body;
          });
        });
      }
    });
  });
});
