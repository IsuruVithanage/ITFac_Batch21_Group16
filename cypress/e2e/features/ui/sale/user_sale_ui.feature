@testuser @ui @sale
Feature: Test user Sale UI

  Background:
    Given the user is logged in as "testUser"
    And the user navigates to the Sales page

  @TC_USER_SALE_6 @215054U
  Scenario: Verify User cannot see Sell button
    Then the Sell button should not be visible for the user

  @TC_USER_SALE_7 @215054U
  Scenario: Verify User cannot see Delete button
    Then the Delete button should not be visible for the user

  @TC_USER_SALE_8 @215054U
  Scenario: Verify sales table has sorting icons on column headers
    Then sortable column headers should display sorting icons

  @TC_USER_SALE_9 @215054U
  Scenario: Verify table shows current sort mode
    When the user clicks on a sortable column header
    Then the active sort indicator should be visible on that column

  @TC_USER_SALE_10 @215054U
  Scenario: Verify sales table has pagination controls
    Then pagination controls should be visible when data exceeds page limit