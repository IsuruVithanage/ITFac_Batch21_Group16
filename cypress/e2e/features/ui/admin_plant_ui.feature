@admin @ui @plant
Feature: Admin Plant Management

  @TC_ADMIN_PLANT_06 @215104B
  Scenario: Verify admin can navigate to Add Plant page
    Given the user is logged in as "admin"
    And the "admin" is on the plant list page
    When the admin clicks on the Add Plant button
    Then the admin should be redirected to the Add Plant page

  @TC_ADMIN_PLANT_07 @215104B
  Scenario: Verify admin can navigate to Edit Plant page
    Given the user is logged in as "admin"
    And the "admin" is on the plant list page
    When the admin clicks on the edit button for the first plant in the list
    Then the admin should be redirected to the Edit Plant page

  @TC_ADMIN_PLANT_08 @215104B
  Scenario: Verify delete confirmation alert opens on delete button click
    Given the user is logged in as "admin"
    And the "admin" is on the plant list page
    When the admin clicks on the delete button for the first plant in the list
    Then a delete confirmation alert should be displayed

  @TC_ADMIN_PLANT_09 @215104B
  Scenario: Verify Add Plant button is hidden for non-admin users
    Given the user is logged in as "testUser"
    And the "admin" is on the plant list page
    Then the Add Plant button should not be visible

  @TC_ADMIN_PLANT_10 @215104B
  Scenario: Verify Edit Plant button is hidden for non-admin users
    Given the user is logged in as "testUser"
    And the "admin" is on the plant list page
    Then the Edit Plant button should not be visible
