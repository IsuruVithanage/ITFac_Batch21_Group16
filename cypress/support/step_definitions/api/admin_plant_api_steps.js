import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

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


Given("the admin is logged in through the API", () => {
  cy.apiLoginAs("admin");
});

When("the admin creates a new plant with valid name {string}", (name) => {
  cy.get("@authToken").then((token) => {
    cy.getFirstCategory(token).then((category) => {
      const payload = { name, price: 50, quantity: 10, category };
      cy.createPlant(payload, token).as("apiResponse");
    });
  });
});

When("the admin creates a new plant with name {string}", (name) => {
  cy.get("@authToken").then((token) => {
    cy.getFirstCategory(token).then((category) => {
      const payload = { name, price: 50, quantity: 10, category };
      cy.createPlant(payload, token).as("apiResponse");
    });
  });
});

When("the admin tries to create another plant with name {string} in the same category", (name) => {
  cy.get("@authToken").then((token) => {
    cy.get("@originalPlantData").then((data) => {
      const payload = { name, price: 50, quantity: 10, category: data.category };
      cy.createPlant(payload, token).as("apiResponse");
    });
  });
});

When("the admin creates a new plant with name {string} in a different category", (name) => {
  cy.get("@authToken").then((token) => {
    // For simplicity, we create it in category ID 2 or similar if available
    cy.getFirstCategory(token).then((cat) => {
      const differentCategory = { ...cat, id: cat.id + 1 }; 
      const payload = { name, price: 50, quantity: 10, category: differentCategory };
      cy.createPlant(payload, token).as("apiResponse");
    });
  });
});

Then("the response status code should be {string}", (status) => {
  cy.get("@apiResponse").its("status").should("eq", parseInt(status));
});

Then("the plant should be successfully created", () => {
  cy.get("@apiResponse").its("body").should("have.property", "id");
});