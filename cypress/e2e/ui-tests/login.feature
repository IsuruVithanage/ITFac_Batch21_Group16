Feature: Login Page
  I want to log in to the application

  Scenario: User can log in with valid admin credentials
    Given I visit the Login page
    When I enter the username "admin"
    And I enter the password "admin123"
    And I click the login button
    Then I should be redirected to the dashboard