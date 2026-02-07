import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import NavigationPage from "../../pages/NavigationPage";
import DashboardPage from "../../pages/DashboardPage";
import CategoryPage from "../../pages/CategoryPage";
import PlantPage from "../../pages/PlantPage";
import SalePage from "../../pages/SalePage";

// When Steps
When("the user clicks on {string} in the navbar", (linkText) => {
  NavigationPage.clickLink(linkText);
});

// Then Steps - Page Loading
Then("the Dashboard page should load", () => {
  DashboardPage.verifyPageLoaded();
});

Then("the Categories page should load", () => {
  CategoryPage.verifyPageLoaded();
});

Then("the Plants page should load", () => {
  PlantPage.verifyPageLoaded();
});

Then("the Sales page should load", () => {
  SalePage.verifyPageLoaded();
});

// Then Steps - Highlighting
Then("the {string} tab should be highlighted", (linkText) => {
  NavigationPage.verifyActiveLink(linkText);
});

// Special Step for TC_USER_NAV_05 (Disabled Link)
Then("the {string} link should be disabled", (linkText) => {
  NavigationPage.verifyDisabledLink(linkText);
});

Then("it should show a tooltip {string}", (tooltipText) => {
  NavigationPage.verifyTooltip("Inventory", tooltipText);
});