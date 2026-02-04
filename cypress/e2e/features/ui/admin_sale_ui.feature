@admin @ui @sale
Feature: Admin Sale UI

  @TC_ADMIN_SALE_11 @215119B
  Scenario: Verify admin is redirected to sales list when cancel button is clicked
    Given the user is logged in as "admin"
    And the admin is on the Add Sales page
    When the admin clicks the Cancel button on Add Sales page
    Then the admin should be redirected back to the sales list page