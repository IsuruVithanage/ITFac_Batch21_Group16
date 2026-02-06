Cypress.Commands.add("getNonEmptyPlantTableRows", () => {
  return cy.get("table tbody tr")
    .not(":contains('No plants found')")
    .should("have.length.greaterThan", 0, "Plant table is empty!");
});

Cypress.Commands.add("clickOnTheButtonOfFirstPlantItem", (selector) => {
  cy.getNonEmptyPlantTableRows()
    .first()
    .find(selector)
    .click();
});

Cypress.Commands.add("typePlantSearchTerm", (name) => {
  cy.get('input[name="name"]').should("be.visible").clear().type(name);
});

Cypress.Commands.add("selectPlantCategoryFromFirstRow", () => {
  return cy.getNonEmptyPlantTableRows()
    .first()
    .find("td")
    .eq(1)
    .then(($column) => {
      const categoryName = $column.text().trim();
      cy.get('select[name="categoryId"]').should("be.visible").select(categoryName);
      return cy.wrap(categoryName);
    });
});

Cypress.Commands.add("validatePlantNameSearchResult", (searchName) => {
  cy.getNonEmptyPlantTableRows()
    .find("td:nth-child(1)")
    .each(($el) => {
      const actualName = $el.text().trim().toLowerCase();
      expect(actualName).to.include(searchName.toLowerCase());
    });
});

Cypress.Commands.add("validatePlantCategorySearchResult", (categoryName) => {
  cy.getNonEmptyPlantTableRows()
    .find("td:nth-child(2)")
    .each(($el) => {
      const actualCategory = $el.text().trim();
      expect(actualCategory).to.eq(categoryName);
    });
});

Cypress.Commands.add("assertNoPlantFound", () => {
  // Verify the specific message exists and is visible
  cy.get("table tbody")
    .contains("td", "No plants found")
    .should("be.visible")
    .and("have.attr", "colspan", "5");

  // Verify that ONLY this empty row exists (length should be 1)
  cy.get("table tbody tr").should("have.length", 1);
});

Cypress.Commands.add("assertSearchFormReset", () => {
  cy.get('input[name="name"]').should("have.value", "");
  cy.get('select[name="categoryId"]').should("have.value", "");
  cy.location("search").should("be.empty");   // No query parameters
});

Cypress.Commands.add("clickPlantNameSortHeader", () => {
  cy.get('thead a[href*="sortField=name"]')
    .should("be.visible")
    .first()
    .click();
});

Cypress.Commands.add("validatePlantListSortedByNameDesc", () => {
  cy.getNonEmptyPlantTableRows()
    .find("td:nth-child(1)") // 1st Column is Name
    .then(($cells) => {
      return Cypress._.map($cells, (cell) => cell.innerText.trim());
    })
    .then((names) => {
      // Create a copy and sort it DESCENDING
      const sortedNames = [...names].sort((a, b) => b.localeCompare(a));
      // Validate the UI list matches the sorted list
      expect(names).to.deep.equal(sortedNames);
    });
});


Cypress.Commands.add("verifyDeleteButtonNotVisible", () => {
  // Checks that the specific delete button icon/button does not exist in the table
  cy.get("table tbody").within(() => {
    cy.get("button[title='Delete']").should("not.exist");
  });
});

Cypress.Commands.add("verifyLowStockIndicator", () => {
  // Iterates through rows, checks if Qty < 5, and if so, ensures a warning badge exists
  // Assumption: Quantity is in column 4 (nth-child 4) based on typical layouts
  cy.getNonEmptyPlantTableRows().each(($row) => {
    const qtyText = $row.find("td:nth-child(4)").text().trim(); 
    const quantity = parseInt(qtyText, 10);

    if (quantity < 5) {
      // Checks for a badge or text indicating low stock inside that row
      cy.wrap($row).should("contain.text", "Low");
      // OR if it's a specific icon/class:
      // cy.wrap($row).find(".badge-warning, .low-stock-indicator").should("be.visible");
    }
  });
});

Cypress.Commands.add("fillPlantPrice", (price) => {
  cy.get('input[name="price"]').should("be.visible").clear().type(price);
});

Cypress.Commands.add("fillPlantQuantity", (quantity) => {
  cy.get('input[name="quantity"]').should("be.visible").clear().type(quantity);
});

Cypress.Commands.add("submitPlantForm", () => {
  // Looks for a button with type submit inside the form
  cy.clickOn("Save");
});

Cypress.Commands.add("verifyFieldValidationError", (fieldName, errorMessage) => {
  // 1. Get the specific input/select field
  cy.get(`input[name="${fieldName}"], select[name="${fieldName}"]`)
    // 2. Go to the IMMEDIATE parent container (the div with class="mb-3")
    .parent() 
    // 3. Find the error message strictly inside that container
    .find(".text-danger") 
    .should("be.visible")
    // 4. Verify the text matches what the app actually shows
    .and("contain.text", errorMessage);
});

// Specific command to ensure category is empty/unselected
Cypress.Commands.add("deselectPlantCategory", () => {
  // Assumes the 'Select' placeholder has an empty value or is the first disabled option
  cy.get('select[name="categoryId"]').select(""); 
  // If the select requires picking a specific "Choose..." option:
  // cy.get('select[name="categoryId"]').select("Choose Category...");
});
