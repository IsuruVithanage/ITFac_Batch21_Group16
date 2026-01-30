Feature: Login functionality
  As a registered user
  I want to log in to the application
  So that I can access the dashboard

  Scenario: Admin logs in with valid credentials
    Given I visit the Login page
    When I login as "admin"
    And I click the login button
    Then I should be redirected to the dashboard