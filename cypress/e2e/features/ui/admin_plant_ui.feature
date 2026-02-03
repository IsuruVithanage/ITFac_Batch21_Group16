@admin @ui @plant
Feature: Admin Plant UI

  @TC_ADMIN_PLANT_06 @215104B
  Scenario: Verify admin can navigate to Add Plant page
    Given the user is logged in as "admin"
    And the "admin" is on the plant list page
    When the admin clicks on the Add Plant button
    Then the admin should be redirected to the Add Plant page

  @TC_ADMIN_PLANT_07 @215104B
  Scenario: Verify admin can navigate to Edit Plant page
    Given a plant exists
    And the user is logged in as "admin"
    And the "admin" is on the plant list page
    When the admin clicks on the edit button for the first plant in the list
    Then the admin should be redirected to the Edit Plant page

  @TC_ADMIN_PLANT_08 @215104B
  Scenario: Verify delete confirmation alert opens on delete button click
    Given a plant exists
    And the user is logged in as "admin"
    And the "admin" is on the plant list page
    When the admin clicks on the delete button for the first plant in the list
    Then a delete confirmation alert should be displayed

  @TC_ADMIN_PLANT_09 @215104B
  Scenario: Verify Add Plant button is hidden for non-admin users
    Given the user is logged in as "testUser"
    And the "user" is on the plant list page
    Then the Add Plant button should not be visible

  @TC_ADMIN_PLANT_10 @215104B
  Scenario: Verify Edit Plant button is hidden for non-admin users
    Given the user is logged in as "testUser"
    And the "user" is on the plant list page
    Then the Edit Plant button should not be visible

  @TC_ADMIN_PLANT_16 @215004T
  Scenario: Verify delete button is hidden for test user
    Given the user is logged in as "testUser"
    And the "testUser" is on the plant list page
    Then the delete button should not be visible for any plant item

  @TC_ADMIN_PLANT_17 @215004T
  Scenario: Verify low stock indicator appears when quantity is low
    Given the user is logged in as "admin"
    And the "admin" is on the plant list page
    Then the low stock indicator should be displayed for plants with quantity less than 5

  @TC_ADMIN_PLANT_18 @215004T
  Scenario: Validation error for negative price input
    Given the user is logged in as "admin"
    And the admin is on the Add Plant page
    When the admin enters a negative value for price
    And the admin submits the plant form
    Then a validation error message for price should be displayed

  @TC_ADMIN_PLANT_19 @215004T
  Scenario: Validation error for negative quantity input
    Given the user is logged in as "admin"
    And the admin is on the Add Plant page
    When the admin enters a negative value for quantity
    And the admin submits the plant form
    Then a validation error message for quantity should be displayed

  @TC_ADMIN_PLANT_20 @215004T
  Scenario: Validation error when category is not selected
    Given the user is logged in as "admin"
    And the admin is on the Add Plant page
    When the admin leaves the category unselected
    And the admin submits the plant form
    Then a validation error message for category should be displayed