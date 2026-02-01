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
