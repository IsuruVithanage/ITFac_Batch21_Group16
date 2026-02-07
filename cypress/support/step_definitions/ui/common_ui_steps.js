import { Given } from "@badeball/cypress-cucumber-preprocessor";
import DashboardPage from "../../pages/DashboardPage";
import CategoryPage from "../../pages/CategoryPage";

Given("the user is logged in as {string}", (role) => {
  cy.loginAs(role); 
  DashboardPage.verifyPageLoaded();
});

Given("the admin is on the category list page", () => {
  cy.visit("/ui/categories");
  CategoryPage.verifyPageLoaded();
});

Given("the user is on the category list page", () => {
  cy.visit("/ui/categories");
  CategoryPage.verifyPageLoaded();
});
