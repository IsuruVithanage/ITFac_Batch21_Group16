import { Given, When } from "@badeball/cypress-cucumber-preprocessor";

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
