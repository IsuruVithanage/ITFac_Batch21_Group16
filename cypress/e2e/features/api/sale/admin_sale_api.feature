Feature: Admin Sales API Management

  Background:
    Given the admin is authenticated

@TC_ADMIN_SALE_01 @215054U
  Scenario: Verify admin can view existing sales data
    When the admin sends a GET request to fetch sales data
  Then the response status code should be "200"

@TC_ADMIN_SALE_02 @215054U
  Scenario: Verify admin can create sale with valid plant code
    Given a valid plant code exists with sufficient stock
    When the admin creates a sale with valid data
    Then the system should successfully create the sale

@TC_ADMIN_SALE_03 @215054U
  Scenario: Verify admin cannot create sale with non-existing plant code
    When the admin creates a sale with an invalid plant code
    Then the system should reject the request with plant not found error

@TC_ADMIN_SALE_04 @215054U
  Scenario: Verify admin cannot create sale when billed quantity exceeds stock
    Given a valid plant code exists with limited stock
    When the admin creates a sale with quantity exceeding stock
    Then the system should reject the request with insufficient stock error

@TC_ADMIN_SALE_05 @215054U
  Scenario: Verify admin can delete existing sale
    Given a valid sale ID exists
    When the admin deletes the sale
    Then the response status code should be "204"
