Feature: User Category API

  @TC_USER_CAT_11
  Scenario: User retrieves category by valid ID
    Given a category named "Fruits" exists in the system
    And the test user is authenticated via API
    When the user retrieves the category by the valid id of "Fruits"
    Then the response status code should be 200
    And the category details should match name "Fruits" and parentId null

  @TC_USER_CAT_12
  Scenario: User receives error when retrieving category by invalid ID
    Given the test user is authenticated via API
    When the user retrieves a category by invalid id 999999
    Then the response status code should be 404
    And the response should indicate the category does not exist

  @TC_USER_CAT_13
  Scenario: User retrieves all sub-categories
    Given the test user is authenticated via API
    When the user retrieves all sub-categories
    Then the response status code should be 200
    And the response should be a list of sub-categories

  @TC_USER_CAT_14
  Scenario: User retrieves all main categories
    Given the test user is authenticated via API
    When the user retrieves all main categories
    Then the response status code should be 200
    And the response should contain only main categories at top level

  @TC_USER_CAT_15
  Scenario: User retrieves all categories
    Given the test user is authenticated via API
    When the user retrieves all categories
    Then the response status code should be 200
    And the response should contain a list of categories with parentName
