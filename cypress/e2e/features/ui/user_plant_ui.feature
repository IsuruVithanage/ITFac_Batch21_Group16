@user @ui @plant
Feature: User Plant UI

  @TC_USER_PLANT_06 @215104B
  Scenario: Search plants by plant name
    Given the user is logged in as "testUser"
    And the user is on the plant list page
    When the user searches for a plant with name "Plant1"
    Then only plants matching "Plant1" should be displayed in the list
