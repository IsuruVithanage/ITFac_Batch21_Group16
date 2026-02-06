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

Cypress.Commands.add("getPlantsPaged", ({ token, page = 0, size = 10, name = null, categoryId = null }) => {
  return cy.request({
    method: "GET",
    url: "/api/plants/paged",
    qs: { page, size, name, categoryId },
    headers: { Authorization: `Bearer ${token}` },
    failOnStatusCode: false
  });
});

Cypress.Commands.add("getAllPlants", (token) => {
  return cy.request({
    method: "GET",
    url: "/api/plants", // The non-paged endpoint
    headers: { Authorization: `Bearer ${token}` },
    failOnStatusCode: false
  });
});

Cypress.Commands.add("getPlantSummary", (token) => {
  return cy.request({
    method: "GET",
    url: "/api/plants/summary",
    headers: { Authorization: `Bearer ${token}` },
    failOnStatusCode: false
  });
});

Cypress.Commands.add("getPlantById", (id, token) => {
  return cy.request({
    method: "GET",
    url: `/api/plants/${id}`,
    headers: { Authorization: `Bearer ${token}` },
    failOnStatusCode: false
  });
});

Cypress.Commands.add("ensurePlantExistsWithName", (plantName) => {
  // Login as admin
  return cy.apiLoginAs("admin").then((token) => {
    // Try to find the plant
    return cy.getPlantsPaged({token: token, name: plantName}).then((searchRes) => {
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

// Gets a valid category to use for plant creation
Cypress.Commands.add("getAnyCategory", (token) => {
  // We use the paged plants endpoint because it is more stable
  return cy.getPlantsPaged({token: token}).then((res) => {
    // If there are plants, take the category from the first one
    if (res.body.content && res.body.content.length > 0) {
      return res.body.content[0].category;
    }
    // Fallback: If no plants exist, use a hardcoded category object
    // Adjust the ID based on what you know exists in your DB (usually 1 or 2)
    return { id: 1, name: "General" }; 
  });
});

Cypress.Commands.add("getDifferentCategory", (token, currentCategoryId) => {
  // First, try to get all sub-categories from the categories endpoint
  return cy.getAllSubCategories(token).then((res) => {
    if (res.status === 200 && res.body.length > 1) {
      // Find the first category that isn't the one we are currently using
      const otherCat = res.body.find(cat => cat.id !== currentCategoryId);
      if (otherCat) return otherCat;
    }

    throw new Error(
      "Precondition Failed: No Different sub-category found. Cannot create plant."
    );
  });
});
