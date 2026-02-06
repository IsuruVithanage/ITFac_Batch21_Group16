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

  @TC_USER_PLANT_03 @215104B
  Scenario: Verify system rejects retrieve all plants request without auth token
    Given the user is logged out
    When the user retrieves all plants
    Then the response status code should be "401"

  @TC_USER_PLANT_04 @215104B
  Scenario: Verify user can retrieve plant summary when authenticated
    Given at least 5 plants exist in the system
    When the user retrieves the plant summary
    Then the response status code should be "200"
    And the response should contain valid summary data

  @TC_USER_PLANT_05 @215104B
  Scenario: Verify system rejects plant summary request without auth token
    Given the user is logged out
    When the user retrieves the plant summary
    Then the response status code should be "401"


  @TC_USER_PLANT_11 @215004T
  Scenario: Get plant by valid plant ID
    Given a valid plant and category exists
    When the user retrieves plant details using a valid plant ID
    Then the response status code should be "200"
    And the response should contain correct plant details

  @TC_USER_PLANT_12 @215004T
  Scenario: Get plant by invalid plant ID
    When the user retrieves plant details using an invalid plant ID 999999
    Then the response status code should be "404"

  @TC_USER_PLANT_13 @215004T
  Scenario: Get plants by valid category ID
    Given a valid plant and category exists
    When the user retrieves plants using a valid category ID
    Then the response status code should be "200"
    And the response should contain a list of plants belonging to the category

  @TC_USER_PLANT_14 @215004T
  Scenario: Get plants by invalid category ID
    When the user retrieves plants using an invalid category ID 999999
    Then the response status code is "200" or "404"
    And the response should be an empty list

  @TC_USER_PLANT_15 @215004T
  Scenario: Search plants by name
    Given a plant named "TestPlant_1" already exists
    When the user searches for plants with name "TestPlant_1"
    Then the response status code should be "200"
    And the response list should contain the plant "TestPlant_1"
