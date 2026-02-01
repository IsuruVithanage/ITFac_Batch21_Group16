@admin @ui @plant
Feature: Admin Plant Management

  Background:
    Given the user is logged in as "admin"

  @TC_ADMIN_PLANT_06 @215104B
  Scenario: Verify admin can navigate to add plant page using Add button
    When the "admin" navigates to the plant list page
    And the admin clicks on the Add Plant button
    Then the admin should be navigated to the Add Plant page

  @TC_ADMIN_PLANT_07 @215104B
  Scenario: Verify admin can navigate to edit plant page using Edit button
    When the "admin" navigates to the plant list page
    And the admin clicks on the edit button for the first plant in the list
    Then the admin should be navigated to the Edit Plant page

  @TC_ADMIN_PLANT_08 @215104B
  Scenario: Verify delete confirmation alert opens on delete button click
    When the "admin" navigates to the plant list page
    And the admin clicks on the delete button for the first plant in the list
    Then a delete confirmation alert should be displayed
