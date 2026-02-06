Feature: User Sales API Management

Background:
  Given the user is authenticated as "testUser"

@TC_USER_SALE_01 @215054U
Scenario: Verify user cannot create sale via API
  When the user attempts to create a sale with valid data
  Then the system should reject the request with forbidden error

@TC_USER_SALE_02 @215054U
Scenario: Verify user cannot delete sale via API
  And a valid sale ID exists
  When the user attempts to delete the sale
  Then the system should reject the request with forbidden error

@TC_USER_SALE_03 @215054U
Scenario: Verify user can view existing sales data
  When the user sends a GET request to fetch sales data
  Then the system should return existing sales data successfully

@TC_USER_SALE_04 @215054U
Scenario: Verify user can view specific sale data by ID
And an admin has created a sale
  When the user fetches the sale by ID
  Then the system should return the sale details successfully

@TC_USER_SALE_05 @215054U
Scenario: Verify user can get paginated and sorted sales data
  When the user requests sales data with pagination and sorting
  Then the system should return paginated and sorted sales data
