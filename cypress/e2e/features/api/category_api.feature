Feature: Category API - User access

  As a user
  I want to retrieve categories
  So that I can view category information

  Scenario: User retrieves categories with pagination
    Given the user is authenticated
    When the user sends a request to get categories with page 0 and size 10
    Then the response status code should be 200
    And the response should contain a list of categories