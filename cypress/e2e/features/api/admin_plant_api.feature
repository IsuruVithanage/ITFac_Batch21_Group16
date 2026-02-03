Feature: Admin Plant API

  Background:
    # Changed from "authenticated via API" to "logged in through the API"
    Given the admin is logged in through the API

  @TC_ADMIN_PLANT_01 @215104B
  Scenario: Verify system rejects plant edit when price is less than 0
    Given a plant exists
    When the admin updates the plant with price -10
    Then the response status code should be "400"
    And the response should indicate "Price must be greater than 0"


  @TC_ADMIN_PLANT_11 @215004T
  Scenario: Add plant with all valid fields
    When the admin creates a new plant with valid name "Rose"
    Then the response status code should be "201"
    And the plant should be successfully created

  @TC_ADMIN_PLANT_12 @215004T
  Scenario: Add plant name less than 3 characters
    When the admin creates a new plant with name "Ab"
    Then the response status code should be "400"

  @TC_ADMIN_PLANT_13 @215004T
  Scenario: Add plant name more than 25 characters
    When the admin creates a new plant with name "ThisPlantNameIsDefinitelyTooLong"
    Then the response status code should be "400"

  @TC_ADMIN_PLANT_14 @215004T
  Scenario: Duplicate plant name in same category
    Given a plant named "UniquePlant" already exists
    When the admin tries to create another plant with name "UniquePlant" in the same category
    Then the response status code should be "400"

  @TC_ADMIN_PLANT_15 @215004T
  Scenario: Duplicate plant name in different category
    Given a plant named "GlobalPlant" already exists
    When the admin creates a new plant with name "GlobalPlant" in a different category
    Then the response status code should be "201"