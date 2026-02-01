@admin @ui @plant
Feature: Admin Plant Management

  Background:
    Given the user is logged in as "admin"

  @TC_ADMIN_PLANT_06 @215104B
  Scenario: Verify admin can navigate to add plant page using Add button
    When the "admin" navigates to the plant list page
    And the admin clicks on the Add Plant button
    Then the admin should be navigated to the Add Plant page
