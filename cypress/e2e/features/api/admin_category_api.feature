Feature: Admin Category API

  @TC_ADMIN_CAT_10
  Scenario: Admin creates a category with valid name length
    Given the admin is authenticated via API
    When the admin creates a category with name "Fruits"
    Then the response status code should be 201
    And the category should be created with name "Fruits"

  @TC_ADMIN_CAT_11
  Scenario: Admin cannot create a category with a duplicate name
    Given the admin is authenticated via API
    And a category named "Fruits" already exists
    When the admin creates a category with name "Fruits"
    Then the response status code should be 400 or 409
    And the response should indicate the category name already exists

