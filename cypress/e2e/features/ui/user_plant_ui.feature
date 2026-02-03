@user @ui @plant
Feature: User Plant UI

  Background:
    Given the user is logged in as "testUser"
    And the user is on the plant list page

  @TC_USER_PLANT_06 @215104B
  Scenario: Search plants by plant name
    Given a plant named "TestPlant_1" already exists
    And a plant named "TestPlant_2" already exists
    When the user searches for a plant with name "TestPlant_1"
    Then only plants matching "TestPlant_1" should be displayed in the list

  @TC_USER_PLANT_07 @215104B
  Scenario: Search plants by category
    Given a plant named "TestPlant_1" already exists
    When the user filters plants by category of the first plant in the table
    Then only plants belonging to the selected category should be displayed

  @TC_USER_PLANT_08 @215104B
  Scenario: Display no records message
    When the user searches for a plant with name "NonExistentPlant123"
    Then the message "No plants found" should be displayed in the plant list

  @TC_USER_PLANT_09 @215104B
  Scenario: Reset search form
    When the user enters "Rose" in the search field
    And the user selects the category of the first plant in the table
    And the user clicks the Reset button
    Then the search filters should be cleared

  @TC_USER_PLANT_10 @215104B
  Scenario: Sort plants by name
    Given a plant named "TestPlant_1" already exists
    And a plant named "TestPlant_2" already exists
    When the user clicks the sort by name option
    Then the plant list should be sorted by name in descending order
