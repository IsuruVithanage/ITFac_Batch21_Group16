Feature: Admin Category UI

  @TC_ADMIN_CAT_15
  Scenario: Admin navigates to Add Category page
    Given the admin user is logged in
    And the admin is on the category list page
    When the admin clicks the Add Category button
    Then the admin should be redirected to the Add Category page
