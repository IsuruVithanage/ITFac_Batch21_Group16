@user @ui @plant
Feature: User Plant UI

  Background:
    Given the user is logged in as "testUser"
    And the user is on the plant list page

  @TC_USER_PLANT_06 @215104B
  Scenario: Search plants by plant name
    When the user searches for a plant with name "Plant1"
    Then only plants matching "Plant1" should be displayed in the list

  @TC_USER_PLANT_07 @215104B
  Scenario: Search plants by category
    When the user filters plants by category "Apple"
    Then only plants belonging to category "Apple" should be displayed
