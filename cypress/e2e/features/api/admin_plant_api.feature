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
