@user @ui @navigation
Feature: User Navigation

  Background:
    Given the user is logged in as "testUser"

  @TC_USER_NAV_01 @215004T
  Scenario: Navigate to Dashboard
    When the user clicks on "Dashboard" in the navbar
    Then the Dashboard page should load
    And the "Dashboard" tab should be highlighted

  @TC_USER_NAV_02 @215004T
  Scenario: Navigate to Categories
    When the user clicks on "Categories" in the navbar
    Then the Categories page should load
    And the "Categories" tab should be highlighted

  @TC_USER_NAV_03 @215004T
  Scenario: Navigate to Plants
    When the user clicks on "Plants" in the navbar
    Then the Plants page should load
    And the "Plants" tab should be highlighted

  @TC_USER_NAV_04 @215004T
  Scenario: Navigate to Sales
    When the user clicks on "Sales" in the navbar
    Then the Sales page should load
    And the "Sales" tab should be highlighted

  @TC_USER_NAV_05 @215004T
  Scenario: Navigate to Inventory
    Then the "Inventory" link should be disabled
    And it should show a tooltip "Inventory page coming soon"