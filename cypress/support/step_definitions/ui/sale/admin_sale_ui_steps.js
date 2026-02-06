import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


Given("the admin is on the Add Sales page", () => {
  cy.visit("/ui/sales/new");
  cy.url().should("include", "/ui/sales/new");
});

When("the admin navigates to the Sell page", () => {
  cy.get(".sidebar").contains("a", "Sales").should("be.visible").click();

  cy.url().should("include", "/ui/sales");
});



When("the admin clicks the Cancel button on Add Sales page", () => {
  cy.contains("a", /^cancel$/i)
    .should("be.visible")
    .click();
});

Then("the admin should be redirected back to the sales list page", () => {
  cy.url().should("include", "/ui/sales");

  cy.get(".sidebar").contains("a", "Sales").should("have.class", "active");
});



Then("the page title should be {string}", (title) => {
  cy.contains("h3", title).should("be.visible");
});

Then(
  "all Sell Plant form elements should be visible and properly labeled",
  () => {
    // Navigate to Sell Plant form
    cy.contains("a", /sell plant/i).click();
    cy.url().should("include", "/ui/sales/new");

    // Assert form elements
    cy.get("select#plantId").should("be.visible");
    cy.get('input[type="number"]').should("be.visible");
    cy.contains("button", /^sell$/i).should("be.visible");
  }
);




When('the admin clicks the "Sell Plant" button', () => {
  cy.get(".sidebar").contains("a", "Sales").click();

  cy.contains("a", /sell plant/i)
    .should("be.visible")
    .click();

  cy.url().should("include", "/ui/sales/new");
});

Then("the Sell Plant form content should be visible", () => {
  cy.get("form").should("be.visible");
});



When("the admin opens the plant dropdown", () => {
  cy.visit("/ui/sales/new");
  cy.get("select#plantId").should("be.visible");
});

Then("the plant dropdown should display available plant options", () => {
  cy.get("select#plantId").find("option").should("have.length.greaterThan", 1);
});

When("the admin selects a plant from the dropdown", () => {
  cy.get("select#plantId")
    .find("option")
    .eq(1)
    .then((option) => {
      cy.get("select#plantId").select(option.val());
    });
});

Then("the selected plant should appear in the dropdown", () => {
  cy.get("select#plantId").find(":selected").should("not.have.value", "");
});



When("the admin selects a plant", () => {
  cy.visit("/ui/sales/new");

  cy.get("select#plantId")
    .find("option")
    .eq(1)
    .then((option) => {
      cy.get("select#plantId").select(option.val());
    });
});

When("enters quantity {string}", (qty) => {
  cy.get('input[type="number"]').clear().type(qty);
});

When("clicks the Sell button", () => {
  cy.contains("button", /^sell$/i).click();
});

Then("a success message should be displayed", () => {
  cy.contains(/success|added|sold/i).should("be.visible");
});

Then("the admin should be redirected to the Sales page", () => {
  cy.url().should("include", "/ui/sales");
});



When("the admin clicks the Delete button", () => {
  cy.get(".sidebar").contains("a", "Sales").click();

  cy.get("table tbody tr").first().find("button.btn-outline-danger").click();
});

Then("a delete confirmation dialog should appear", () => {
  cy.on("window:confirm", (text) => {
    expect(text.toLowerCase()).to.include("are you sure");
    return true;
  });
});

When("the admin confirms deletion", () => {
  // handled by window:confirm
});

Then("the related sale record should be deleted successfully", () => {
  cy.contains(/deleted|success/i).should("be.visible");
});
