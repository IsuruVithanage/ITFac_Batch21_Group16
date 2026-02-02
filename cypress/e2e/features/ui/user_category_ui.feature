Feature: User Category UI

    @TC_USER_CAT_16
    Scenario: Test user paginates category list
      Given at least 12 categories exist in the system
      And the test user is logged in
      And the user is on the category list page
      When the user navigates to the next page using pagination
      Then the next set of categories should be loaded

