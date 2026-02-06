@user @api @category
Feature: User Category API


  @TC_USER_CAT_01 @215119B
  Scenario: Verify user can retrieve category summary
    Given the "testUser" is authenticated via API
    When the user retrieves the category summary
    Then the response status code should be "200"

  @TC_USER_CAT_02 @215119B
  Scenario: Verify user can retrieve categories using pagination
    Given the "testUser" is authenticated via API
    And at least one category exists
    When the user sends a request to get categories with page 0 and size 10
    Then the response status code should be "200"

  @TC_USER_CAT_03 @215119B
  Scenario: Verify user can search categories using sub-category name
    Given the "testUser" is authenticated via API
    And multiple categories exist
    When the user searches categories with name "Roses" using pagination page 0 and size 10
    Then the response status code should be "200"
    And the response should contain categories matching name "Roses"

  @TC_USER_CAT_04 @215119B
  Scenario: Verify user can search categories using parent category name
    Given the "testUser" is authenticated via API
    And multiple categories exist
    When the user searches categories with parent name "Flowers" using pagination page 0 and size 10
    Then the response status code should be "200"
    And the response should contain categories related to parent name "Flowers"

  @TC_USER_CAT_05 @215119B
  Scenario: Verify user can retrieve sorted category list
    Given the "testUser" is authenticated via API
    And multiple categories exist
    When the user retrieves categories sorted by "name" in "asc" order
    Then the response status code should be "200"
    And the categories should be sorted by "name" in ascending order

  @TC_USER_CAT_11 @215035M
  Scenario: User retrieves category by valid ID
    Given a category named "Fruits" exists in the system
    And the "testUser" is authenticated via API
    When the user retrieves the category by the valid id of "Fruits"
    Then the response status code should be "200"
    And the category details should match name "Fruits" and parentId null

  @TC_USER_CAT_12 @215035M
  Scenario: User receives error when retrieving category by invalid ID
    Given the "testUser" is authenticated via API
    When the user retrieves a category by invalid id 999999
    Then the response status code should be "404"
    And the response should indicate the category does not exist

  @TC_USER_CAT_13 @215035M
  Scenario: User retrieves all sub-categories
    Given the "testUser" is authenticated via API
    When the user retrieves all sub-categories
    Then the response status code should be "200"
    And the response should be a list of sub-categories

  @TC_USER_CAT_14 @215035M
  Scenario: User retrieves all main categories
    Given the "testUser" is authenticated via API
    When the user retrieves all main categories
    Then the response status code should be "200"
    And the response should contain only main categories at top level

  @TC_USER_CAT_15 @215035M
  Scenario: User retrieves all categories
    Given the "testUser" is authenticated via API
    When the user retrieves all categories
    Then the response status code should be "200"
    And the response should contain a list of categories with parentName
