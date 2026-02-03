Feature: Admin Plant API

  Background:
    Given the "admin" is authenticated via API

  @TC_ADMIN_PLANT_01 @215104B
  Scenario: Verify system rejects plant edit when price is less than 0
    Given a plant exists
    When the admin updates the plant with price -10
    Then the response status code should be "400"
    And the response should indicate "Price must be greater than 0"
