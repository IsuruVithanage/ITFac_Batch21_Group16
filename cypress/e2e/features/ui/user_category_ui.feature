Feature: User Category UI

    @TC_USER_CAT_16
    Scenario: Test user paginates category list
      Given at least 12 categories exist in the system
      And the test user is logged in
      And the user is on the category list page
      When the user navigates to the next page using pagination
      Then the next set of categories should be loaded

    @TC_USER_CAT_17
    Scenario: Test user searches categories by name
      Given the test user is logged in
      And the user is on the category list page
      When the user searches for category name "Fruits"
      Then only categories matching "Fruits" should be displayed

    @TC_USER_CAT_18
    Scenario: Test user filters sub-categories by parent category
      Given the test user is logged in
      And the user is on the category list page
      When the user filters by parent category "Fruits"
      Then only sub-categories for parent "Fruits" should be displayed



