Feature: Admin Plant API

  Background:
    Given the "admin" is authenticated via API

  @TC_ADMIN_PLANT_01 @215104B
  Scenario: Verify system rejects plant edit when price is less than 0
    Given a plant exists
    When the admin updates the plant with price -10
    Then the response status code should be "400"
    And the response should indicate "Price must be greater than 0"

  @TC_ADMIN_PLANT_02 @215104B
  Scenario: Verify system rejects plant edit when quantity is less than 0
    Given a plant exists
    When the admin updates the plant with quantity -5
    Then the response status code should be "400"
    And the response should indicate "Quantity cannot be negative"

  @TC_ADMIN_PLANT_03 @215104B
  Scenario: Verify system rejects edit request for a non-existent plant
    When the admin attempts to update a non-existent plant with ID 999999
    Then the response status code should be "404"
    And the response should indicate "Plant not found"

  @TC_ADMIN_PLANT_04 @215104B
  Scenario: Verify user role cannot delete a plant
    Given a plant exists
    And the "testUser" is authenticated via API
    When the user attempts to delete the plant
    Then the response status code should be "403"

  @TC_ADMIN_PLANT_05 @215104B
  Scenario: Verify system handles delete request for a non-existent plant ID
    When the admin attempts to delete a non-existent plant with ID 999999
    Then the response status code should be "204"

  @TC_ADMIN_PLANT_11 @215004T
  Scenario: Add plant with all valid fields
    When the admin creates a new plant with valid fields
    Then the response status code should be "201"
    And the plant should be successfully created

  @TC_ADMIN_PLANT_12 @215004T
  Scenario: Add plant name less than 3 characters
    When the admin creates a new plant with name "Ab"
    Then the response status code should be "400"

  @TC_ADMIN_PLANT_13 @215004T
  Scenario: Add plant name more than 25 characters
    When the admin creates a new plant with name "ThisPlantNameIsDefinitelyTooLongToBeAccepted"
    Then the response status code should be "400"

  @TC_ADMIN_PLANT_14 @215004T
  Scenario: Duplicate plant name in same category
    Given a plant named "UniquePlant" already exists
    When the admin creates another plant with name "UniquePlant" in the same category
    Then the response status code should be "400"

  @TC_ADMIN_PLANT_15 @215004T
  Scenario: Duplicate plant name in different category
    Given a plant named "GlobalPlant" already exists
    When the admin creates a new plant with name "GlobalPlant" in a different category
    Then the response status code should be "201"  