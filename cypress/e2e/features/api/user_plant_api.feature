@user @api @plant
Feature: User Plant API

  Background:
    Given the "testUser" is authenticated via API

  @TC_USER_PLANT_01 @215104B
  Scenario: Verify user can retrieve plants with pagination parameters
    Given at least 15 plants exist in the system
    When the user retrieves plants with page 0 and size 10
    Then the response status code should be "200"
    And the response should contain valid pagination metadata
    And the response should contain 10 plant items

  @TC_USER_PLANT_02 @215104B
  Scenario: Verify user can retrieve all plants when authenticated
    Given at least 5 plants exist in the system
    When the user retrieves all plants
    Then the response status code should be "200"
    And the response should be a list of plants
