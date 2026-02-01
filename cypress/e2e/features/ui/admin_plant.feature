@admin @ui @plant
Feature: Admin Plant Management

  @TC_ADMIN_PLANT_06 @215104B
  Scenario: Verify admin can navigate to add plant page using Add button
    Given the user is logged in as "admin"
    When the "admin" navigates to the plant list page
    And the admin clicks on the Add Plant button
    Then the admin should be navigated to the Add Plant page

  @TC_ADMIN_PLANT_07 @215104B
  Scenario: Verify admin can navigate to edit plant page using Edit button
    Given the user is logged in as "admin"
    When the "admin" navigates to the plant list page
    And the admin clicks on the edit button for the first plant in the list
    Then the admin should be navigated to the Edit Plant page

  @TC_ADMIN_PLANT_08 @215104B
  Scenario: Verify delete confirmation alert opens on delete button click
    Given the user is logged in as "admin"
    When the "admin" navigates to the plant list page
    And the admin clicks on the delete button for the first plant in the list
    Then a delete confirmation alert should be displayed

  @TC_ADMIN_PLANT_09 @215104B
  Scenario: Verify Admin-only actions are hidden for non-admin users
    Given the user is logged in as "testUser"
    When the "user" navigates to the plant list page
    Then the Add Plant button should not be visible
