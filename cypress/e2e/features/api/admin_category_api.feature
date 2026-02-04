@admin @api @category
Feature: Admin Category API

  @TC_ADMIN_CAT_01 @215119B
  Scenario: Verify admin cannot update category using duplicate category name
    Given the "admin" is authenticated via API
    And multiple categories exist
    When the admin updates a category using an existing category name
    Then the response status code should be "400"
    And the response should indicate the category name already exists

  @TC_ADMIN_CAT_02 @215119B
  Scenario: Verify admin cannot update category without category name
    Given the "admin" is authenticated via API
    And multiple categories exist
    When the admin updates a category without a category name
    Then the response status code should be "400"
    And the response should indicate category name is required

  @TC_ADMIN_CAT_03 @215119B
  Scenario: Verify admin can update the parent category of an existing sub-category
    Given the "admin" is authenticated via API
    And multiple categories exist
    And at least one sub-category exists
    When the admin updates the parent category of the sub-category
    Then the response status code should be "200"
    And the sub-category should be updated with the new parent category

  @TC_ADMIN_CAT_10
  Scenario: Admin creates a category with valid name length
    Given the "admin" is authenticated via API
    When the admin creates a category with name "Fruits"
    Then the response status code should be "201"
    And the category should be created with name "Fruits"

  @TC_ADMIN_CAT_11
  Scenario: Admin cannot create a category with a duplicate name
    Given the "admin" is authenticated via API
    And a category named "Fruits" already exists
    When the admin creates a category with name "Fruits"
    Then the response status code should be "400 or 409"
    And the response should indicate the category name already exists

  @TC_ADMIN_CAT_12
  Scenario: Admin cannot create a category with name shorter than minimum length
    Given the "admin" is authenticated via API
    When the admin creates a category with name "Ab"
    Then the response status code should be "400"
    And the response should indicate the category name is too short

  @TC_ADMIN_CAT_13
  Scenario: Admin cannot create a category with name exceeding maximum length
    Given the "admin" is authenticated via API
    When the admin creates a category with name "GreenVegetables"
    Then the response status code should be "400"
    And the response should indicate the category name is too long

  @TC_ADMIN_CAT_14
  Scenario: Admin can create a sub-category linked to a parent category
    Given the "admin" is authenticated via API
    And a parent category named "Fruits" exists
    When the admin creates a sub-category with name "Apple" under that parent category
    Then the response status code should be "201"
    And the sub-category should be created with name "Apple" linked to the parent
