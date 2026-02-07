import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import SalePage from "../../../pages/SalePage";
import NavigationPage from "../../../pages/NavigationPage";


Given("the admin is on the Add Sales page", () => {
  SalePage.goToAddSalePage();
  SalePage.verifyAddSalePageLoaded();
});

When("the admin navigates to the Sell page", () => {
  NavigationPage.clickLink("Sales");
  SalePage.verifyPageLoaded();
});



When("the admin clicks the Cancel button on Add Sales page", () => {
  cy.contains("a", /^cancel$/i).click();
});

Then("the admin should be redirected back to the sales list page", () => {
  SalePage.verifyPageLoaded();
  NavigationPage.verifyActiveLink("Sales");
});



Then("the page title should be {string}", (title) => {
  SalePage.verifyPageTitle(title);
});

Then(
  "all Sell Plant form elements should be visible and properly labeled",
  () => {
    // Navigate to Sell Plant form
    SalePage.clickSellPlantLink();
    SalePage.verifyAddSalePageLoaded();

    // Assert form elements
    SalePage.verifyFormElementsVisible();
  }
);




When('the admin clicks the "Sell Plant" button', () => {
  NavigationPage.clickLink("Sales");
  SalePage.clickSellPlantLink();
  SalePage.verifyAddSalePageLoaded();
});

Then("the Sell Plant form content should be visible", () => {
  SalePage.verifyFormVisible();
});



When("the admin opens the plant dropdown", () => {
  SalePage.goToAddSalePage();
  SalePage.plantSelect.should("be.visible");
});

Then("the plant dropdown should display available plant options", () => {
  SalePage.plantSelect.find("option").should("have.length.greaterThan", 1);
});

When("the admin selects a plant from the dropdown", () => {
  SalePage.selectPlant(1);
});

Then("the selected plant should appear in the dropdown", () => {
  SalePage.plantSelect.find(":selected").should("not.have.value", "");
});



When("the admin selects a plant", () => {
  SalePage.goToAddSalePage();
  SalePage.selectPlant(1);
});

When("enters quantity {string}", (qty) => {
  SalePage.enterQuantity(qty);
});

When("clicks the Sell button", () => {
  SalePage.submitForm();
});

Then("a success message should be displayed", () => {
  SalePage.verifySuccessMessage();
});

Then("the admin should be redirected to the Sales page", () => {
  SalePage.verifyRedirectToSalesList();
});



When("the admin clicks the Delete button", () => {
  NavigationPage.clickLink("Sales");
  SalePage.clickDeleteSale(0);
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
