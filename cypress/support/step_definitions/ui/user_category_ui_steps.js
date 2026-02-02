import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("the user navigates to the next page using pagination", () => {
  cy.scrollTo("bottom");

  // Capture first row before clicking next
  cy.get("table tbody tr")
    .first()
    .invoke("text")
    .then((text) => {
      cy.wrap(text.trim()).as("firstRowBefore");
    });

  // Click Next button
  cy.contains("a,button", /next/i).should("be.visible").click();
});

Then("the next set of categories should be loaded", () => {
  cy.get("@firstRowBefore").then((beforeText) => {
    cy.get("table tbody tr")
      .first()
      .invoke("text")
      .then((afterText) => {
        expect(afterText.trim()).to.not.eq(String(beforeText).trim());
      });
  });
});

When('the user searches for category name {string}', (term) => {
  // Type into search box
  cy.get('input[name="name"]').should("be.visible").clear().type(term);

  // Click Search button
  cy.contains('button[type="submit"]', /^search$/i).click();
});

Then('only categories matching {string} should be displayed', (term) => {
  // Assert at least one row exists and includes the term
  cy.get("table tbody tr").should("have.length.greaterThan", 0);

  // Every displayed row should match the search term (case-insensitive)
  cy.get("table tbody tr").each(($row) => {
    cy.wrap($row)
      .invoke("text")
      .then((txt) => {
        expect(txt.toLowerCase()).to.include(term.toLowerCase());
      });
  });
});

When('the user filters by parent category {string}', (parentName) => {
  // Select parent by visible text
  cy.get('select[name="parentId"]').should("be.visible").select(parentName);

  // Click Search
  cy.contains('button[type="submit"]', /^search$/i).click();
});

Then('only sub-categories for parent {string} should be displayed', (parentName) => {
  cy.get("table tbody tr").should("have.length.greaterThan", 0);

  // Each row should show the selected parent somewhere (commonly in Parent column)
  cy.get("table tbody tr").each(($row) => {
    cy.wrap($row)
      .invoke("text")
      .then((txt) => {
        expect(txt.toLowerCase()).to.include(parentName.toLowerCase());
      });
  });
});

When("the user clicks the Name column header to sort", () => {
  // Capture names before sorting
  cy.get("table tbody tr td:nth-child(2)")
    .then(($cells) => {
      const names = [...$cells].map((el) => el.innerText.trim());
      cy.wrap(names).as("namesBeforeSort");
    });

  // Click Name header sorting link (reliable)
  cy.get('thead a[href*="sortField=name"]').first().click();
});


Then("the category list should be sorted alphabetically by name", () => {
  cy.get("table tbody tr td:nth-child(2)")
    .should("have.length.greaterThan", 1)
    .then(($cells) => {
      const namesAfter = [...$cells].map((el) => el.innerText.trim());

      const ascSorted = [...namesAfter].sort((a, b) => a.localeCompare(b));
      const descSorted = [...ascSorted].reverse();

      // Should match either ASC or DESC
      expect(
        JSON.stringify(namesAfter) === JSON.stringify(ascSorted) ||
          JSON.stringify(namesAfter) === JSON.stringify(descSorted),
        `Expected sorted order, got: ${namesAfter.join(", ")}`
      ).to.eq(true);
    });
});

When("the user searches for a non-existent category name", () => {
  // Use a value that will never exist
  const randomName = `NON_EXIST_${Date.now()}`;

  cy.get('input[name="name"]')
    .should("be.visible")
    .clear()
    .type(randomName);

  cy.contains('button[type="submit"]', /^search$/i).click();
});

Then('the message {string} should be displayed', (message) => {
  // Assert empty-state row in the table
  cy.get("table tbody")
    .contains("td", message)
    .should("be.visible")
    .and("have.attr", "colspan", "4");

  // Ensure there are no real data rows (only the empty-state row)
  cy.get("table tbody tr").should("have.length", 1);
});


