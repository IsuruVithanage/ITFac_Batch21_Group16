import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import NavigationPage from "../../../pages/NavigationPage";
import SalePage from "../../../pages/SalePage";

Given("the user navigates to the Sales page", () => {
  NavigationPage.clickLink("Sales");
  SalePage.verifyPageLoaded();
});

Then("the Sell button should not be visible for the user", () => {
  SalePage.verifySellLinkNotVisible();
});

Then("the Delete button should not be visible for the user", () => {
  SalePage.verifyDeleteButtonNotVisible();
});

Then("sortable column headers should display sorting icons", () => {
  SalePage.verifySortableHeaders();
});

When("the user clicks on a sortable column header", () => {
  SalePage.clickSortHeader(0);
});

Then("the active sort indicator should be visible on that column", () => {
  SalePage.verifySortIndicator();
});

Then(
  "pagination controls should be visible when data exceeds page limit",
  () => {
    SalePage.verifyPagination();
  },
);
