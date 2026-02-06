import { Given, When,Then } from "@badeball/cypress-cucumber-preprocessor";

Given("a plant exists", () => {
  const targetPlantName = "TestPlant_1";
  cy.ensurePlantExistsWithName(targetPlantName).then((plant) => {
    cy.wrap(plant.id).as("createdPlantId");
    cy.wrap(plant).as("originalPlantData");
  });
});

Given("a plant named {string} already exists", (plantName) => {
  cy.ensurePlantExistsWithName(plantName).then((plant) => {
    cy.wrap(plant.id).as("createdPlantId");
    cy.wrap(plant).as("originalPlantData");
  });
});

When("the admin updates the plant with price {int}", (invalidPrice) => {
  let token, plantId, originalData;

  // Fetch values linearly
  cy.get("@authToken").then((t) => { token = t; });
  cy.get("@createdPlantId").then((id) => { plantId = id; });
  cy.get("@originalPlantData").then((data) => { originalData = data; });

  // Execute action in a final block
  cy.then(() => {
    const updatePayload = {
      ...originalData,
      price: invalidPrice
    };

    cy.updatePlant(plantId, updatePayload, token).then((response) => {
      cy.wrap(response).as("apiResponse");
    });
  });
});

When("the admin updates the plant with quantity {int}", (invalidQuantity) => {
  let token, plantId, originalData;

  // Fetch values linearly from aliases
  cy.get("@authToken").then((t) => { token = t; });
  cy.get("@createdPlantId").then((id) => { plantId = id; });
  cy.get("@originalPlantData").then((data) => { originalData = data; });

  // Execute update
  cy.then(() => {
    const updatePayload = {
      ...originalData,
      quantity: invalidQuantity
    };

    cy.updatePlant(plantId, updatePayload, token).then((response) => {
      cy.wrap(response).as("apiResponse");
    });
  });
});

When("the admin attempts to update a non-existent plant with ID {int}", (invalidId) => {
  cy.get("@authToken").then((token) => {

    const dummyPayload = {
      name: "NonExistentPlant",
      price: 100.0,
      quantity: 10,
      category: { id: 1 }
    };

    cy.updatePlant(invalidId, dummyPayload, token).then((response) => {
      cy.wrap(response).as("apiResponse");
    });
  });
});

When("the user attempts to delete the plant", () => {
  let userToken, plantId;

  cy.get("@authToken").then((t) => { userToken = t; });
  cy.get("@createdPlantId").then((id) => { plantId = id; });

  cy.then(() => {
    cy.deletePlant(plantId, userToken).then((response) => {
      cy.wrap(response).as("apiResponse");
    });
  });
});

When("the admin attempts to delete a non-existent plant with ID {int}", (invalidId) => {
  cy.get("@authToken").then((token) => {
    cy.deletePlant(invalidId, token).then((response) => {
      cy.wrap(response).as("apiResponse");
    });
  });
});


Given("the admin is authenticated via API", () => {
  cy.apiLoginAs("admin").as("authToken");
});

When("the admin creates a new plant with valid fields", () => {
  let token;

  cy.get("@authToken").then((t) => { token = t; });

  cy.then(() => {
    cy.getAnyCategory(token).then((category) => {
      const plantName = "Healthy Fern";

      // 1. CLEANUP: Search for any existing plant with this name in this category
      cy.getPlantsPaged({token: token, name: plantName}).then((searchRes) => {
        const existingPlant = searchRes.body.content.find(
          (p) => p.name === plantName && p.category.id === category.id
        );

        // 2. DELETE: Remove it if it already exists to ensure a fresh 201 response
        if (existingPlant) {
          cy.log(`Cleaning up existing plant: ${plantName}`);
          cy.deletePlant(existingPlant.id, token);
        }
      });

      // 3. CREATE: Now perform the actual test action
      const payload = {
        name: plantName,
        price: 25.0,
        quantity: 10,
        category: category
      };

      cy.createPlant(payload, token).as("apiResponse");
    });
  });
});

When("the admin creates a new plant with name {string}", (plantName) => {
  cy.get("@authToken").then((token) => {
    cy.getAnyCategory(token).then((category) => {
      const payload = {
        name: plantName,
        price: 15.0,
        quantity: 5,
        category: category
      };
      cy.createPlant(payload, token).as("apiResponse");
    });
  });
});

When("the admin creates another plant with name {string} in the same category", (plantName) => {
  cy.get("@authToken").then((token) => {
    cy.get("@originalPlantData").then((originalData) => {
      const payload = {
        name: plantName,
        price: 10.0,
        quantity: 2,
        category: originalData.category
      };
      cy.createPlant(payload, token).as("apiResponse");
    });
  });
});

When("the admin creates a new plant with name {string} in a different category", (plantName) => {
  let token;
  let originalData;

  cy.get("@authToken").then((t) => { token = t; });
  cy.get("@originalPlantData").then((data) => { originalData = data; });

  cy.then(() => {
    // 1. Find a different sub-category
    cy.getDifferentCategory(token, originalData.category.id).then((otherCategory) => {
      
      // 2. SEARCH: See if "GlobalPlant" already exists in this second category
      cy.getPlantsPaged({token: token, name: plantName}).then((searchRes) => {
        // Find the specific plant that matches the name AND the new category ID
        const existingPlant = searchRes.body.content.find(
          (p) => p.name === plantName && p.category.id === otherCategory.id
        );

        // 3. DELETE: If it exists, remove it so the POST can be "clean"
        if (existingPlant) {
          cy.log(`Cleaning up existing plant ID: ${existingPlant.id}`);
          cy.deletePlant(existingPlant.id, token);
        }
      });

      // 4. CREATE: Now safely create the plant in the different category
      const payload = {
        name: plantName,
        price: 25.0,
        quantity: 10,
        category: otherCategory
      };

      cy.createPlant(payload, token).as("apiResponse");
    });
  });
});


Then("the plant should be successfully created", () => {
  cy.get("@apiResponse").its("body").should("have.property", "id");
});