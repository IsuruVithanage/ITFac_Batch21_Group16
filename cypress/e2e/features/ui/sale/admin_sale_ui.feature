@admin @ui @sale
Feature: Admin Sale UI

  Background:
    Given the user is logged in as "admin"

  @TC_ADMIN_SALE_11 @215119B
  Scenario: Verify admin is redirected to sales list when cancel button is clicked
    Given the admin is on the Add Sales page
    When the admin clicks the Cancel button on Add Sales page
    Then the admin should be redirected back to the sales list page

  @TC_ADMIN_SALE_06 @215054U
  Scenario: Verify Sell Plant form page structure
    When the admin navigates to the Sell page
    Then the page title should be "Sale"
    And all Sell Plant form elements should be visible and properly labeled

  @TC_ADMIN_SALE_07 @215054U
  Scenario: Verify navigation to Sell Plant page when clicking Sell Plant button
    When the admin clicks the "Sell Plant" button
    Then the page title should be "Sell Plant"
    And the Sell Plant form content should be visible

  @TC_ADMIN_SALE_08 @215054U
  Scenario: Verify Plant dropdown functionality
    When the admin opens the plant dropdown
    Then the plant dropdown should display available plant options
    When the admin selects a plant from the dropdown
    Then the selected plant should appear in the dropdown

  @TC_ADMIN_SALE_09 @215054U
  Scenario: Verify Sell button functionality with valid data
    When the admin selects a plant
    And enters quantity "2"
    And clicks the Sell button
    Then a success message should be displayed
    And the admin should be redirected to the Sales page

  @TC_ADMIN_SALE_10 @215054U
  Scenario: Open delete confirmation when clicking delete button
    When the admin clicks the Delete button
    Then a delete confirmation dialog should appear
    When the admin confirms deletion
    Then the related sale record should be deleted successfully
