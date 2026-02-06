@user @ui @category
Feature: User Category UI

  @TC_USER_CAT_06 @215119B
  Scenario: Verify cancel button navigates user back to category list
    Given the user is logged in as "testUser"
    And the user is on the category list page
    When the user opens the edit category page
    And the user clicks the Cancel button
    Then the user should be redirected back to the category list page

  @TC_USER_CAT_07 @215119B
  Scenario: Verify delete button is disabled for test user
    Given the user is logged in as "testUser"
    And the user is on the category list page
    Then the Delete button should be disabled for categories

  @TC_USER_CAT_08 @215119B
  Scenario: Verify edit button is disabled for test user
    Given the user is logged in as "testUser"
    And the user is on the category list page
    Then the Edit button should be disabled for categories

  @TC_USER_CAT_09 @215119B
  Scenario: Verify error message is shown when test user attempts to edit a category
    Given the user is logged in as "testUser"
    And the user is on the category list page
    When the user attempts to edit a category
    And the user clicks Save without editing fields
    Then an error message indicating insufficient permissions should be displayed

  @TC_USER_CAT_10 @215119B
  Scenario: Verify category list is displayed in read-only mode for test user
    Given the user is logged in as "testUser"
    And the user is on the category list page
    Then the category list should be visible
    And all category action buttons should be hidden or disabled

    @TC_USER_CAT_16 @215035M
    Scenario: Test user paginates category list
      Given at least 12 categories exist in the system
      And the user is logged in as "testUser"
      And the user is on the category list page
      When the user navigates to the next page using pagination
      Then the next set of categories should be loaded

    @TC_USER_CAT_17 @215035M
    Scenario: Test user searches categories by name
      Given the user is logged in as "testUser"
      And the user is on the category list page
      When the user searches for category name "Fruits"
      Then only categories matching "Fruits" should be displayed

    @TC_USER_CAT_18 @215035M
    Scenario: Test user filters sub-categories by parent category
      Given the user is logged in as "testUser"
      And the user is on the category list page
      When the user filters by parent category "Fruits"
      Then only sub-categories for parent "Fruits" should be displayed

    @TC_USER_CAT_19 @215035M
    Scenario: Test user sorts categories by name
      Given the user is logged in as "testUser"
      And the user is on the category list page
      When the user clicks the Name column header to sort
      Then the category list should be sorted alphabetically by name

    @TC_USER_CAT_20 @215035M
    Scenario: Test user sees no category found message when search returns no results
      Given the user is logged in as "testUser"
      And the user is on the category list page
      When the user searches for a non-existent category name
      Then the message "No category found" should be displayed




