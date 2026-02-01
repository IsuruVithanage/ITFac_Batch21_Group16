Feature: Admin Category UI

  @TC_ADMIN_CAT_15
  Scenario: Admin navigates to Add Category page
    Given the admin user is logged in
    And the admin is on the category list page
    When the admin clicks the Add Category button
    Then the admin should be redirected to the Add Category page

  @TC_ADMIN_CAT_16
  Scenario: Admin navigates to Edit Category page
    Given the admin user is logged in
    And the admin is on the category list page
    When the admin clicks the Edit button for a category
    Then the admin should be redirected to the Edit Category page
    And the category details should be loaded

  @TC_ADMIN_CAT_17
  Scenario: Admin sees confirmation before deleting a category
    Given the admin user is logged in
    And the admin is on the category list page
    When the admin clicks the Delete button for a category
    Then a delete confirmation dialog should be displayed

  @TC_ADMIN_CAT_18
  Scenario: Test user cannot see Add Category button
    Given the test user is logged in
    And the user is on the category list page
    Then the Add Category button should not be visible

  @TC_ADMIN_CAT_19
  Scenario: Test user cannot see Edit buttons in category list
    Given the test user is logged in
    And the user is on the category list page
    Then the Edit buttons should not be visible
