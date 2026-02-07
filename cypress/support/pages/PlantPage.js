import BasePage from "./BasePage";

class PlantPage extends BasePage {

    get nameInput() { return cy.get('input[name="name"]'); }
    get priceInput() { return cy.get('input[name="price"]'); }
    get quantityInput() { return cy.get('input[name="quantity"]'); }
    get categorySelect() { return cy.get('select[name="categoryId"]'); }
    get saveButton() { return cy.contains("button", /save/i); } 
    get searchButton() { return cy.contains("button", /search/i); }
    get resetButton() { return cy.contains("button, a", /reset/i); }
    get sortHeader() { return cy.get('thead a[href*="sortField=name"]'); }
    get tableRows() { return cy.get("table tbody tr"); }
    get nonEmptyTableRows() { return this.tableRows.not(":contains('No plants found')"); }
    get addPlantLink() { return cy.contains("a", "Add a Plant"); }

    verifyPageLoaded() {
        super.verifyUrl("/ui/plants");
    }

    goToAddPlantPage() {
        cy.visit("/ui/plants/add");
    }

    // Actions
    clickAddPlantButton() {
        this.addPlantLink.click();
    }

    verifyRedirectToAddPage() {
        cy.url().should("include", "/ui/plants/add");
    }

    verifyAddButtonNotVisible() {
        this.addPlantLink.should("not.exist");
    }

    clickEditPlant(index = 0) {
        this.nonEmptyTableRows.eq(index).find("a[title='Edit']").click();
    }

    verifyRedirectToEditPage() {
        cy.url().should("include", "/ui/plants/edit");
    }

    verifyEditButtonNotVisible() {
        cy.get("a[title='Edit']").should("not.exist");
    }

    clickDeletePlant(index = 0) {
        this.nonEmptyTableRows.eq(index).find("button[title='Delete']").click();
    }

    verifyDeleteButtonNotVisible() {
        cy.get("table tbody").within(() => {
            cy.get("button[title='Delete']").should("not.exist");
        });
    }

    verifyLowStockIndicator() {
        this.nonEmptyTableRows.each(($row) => {
            const qtyText = $row.find("td:nth-child(4)").text().trim();
            const quantity = parseInt(qtyText, 10);

            if (quantity < 5) {
                
                cy.wrap($row).should("contain.text", "Low");
            }
        });
    }

    fillPrice(price) {
        this.priceInput.should("be.visible").clear().type(price);
    }

    fillQuantity(quantity) {
        this.quantityInput.should("be.visible").clear().type(quantity);
    }

    deselectCategory() {
        this.categorySelect.select("");
    }

    verifyFieldValidationError(fieldName, errorMessage) {
        cy.get(`input[name="${fieldName}"], select[name="${fieldName}"]`)
            .parent()
            .find(".text-danger")
            .should("be.visible")
            .and("contain.text", errorMessage);
    }

    submitForm() {
        this.saveButton.click();
    }

    // Search & Filter
    searchByName(term) {
        this.nameInput.should("be.visible").clear().type(term);
        this.searchButton.click();
    }

    validateNameSearchResult(term) {
        this.nonEmptyTableRows.find("td:nth-child(1)").each(($el) => {
            const actualName = $el.text().trim().toLowerCase();
            expect(actualName).to.include(term.toLowerCase());
        });
    }

    selectCategoryFromFirstRow() {
        return this.nonEmptyTableRows.first().find("td").eq(1).then(($column) => {
            const categoryName = $column.text().trim();
            this.categorySelect.should("be.visible").select(categoryName);
            return cy.wrap(categoryName);
        });
    }

    validateCategorySearchResult(categoryName) {
        this.nonEmptyTableRows.find("td:nth-child(2)").each(($el) => {
            const actualCategory = $el.text().trim();
            expect(actualCategory).to.eq(categoryName);
        });
    }

    verifyNoPlantFound(message) {
        cy.get("table tbody")
            .contains("td", "No plants found")
            .should("be.visible")
            .and("have.attr", "colspan", "5");

        this.tableRows.should("have.length", 1);
        if (message) {
            this.tableRows.should("contain.text", message);
        }
    }

    clickResetButton() {
        this.resetButton.click();
    }

    verifySearchFormReset() {
        this.nameInput.should("have.value", "");
        this.categorySelect.should("have.value", "");
        cy.location("search").should("be.empty");
    }

    // Sorting
    clickSortByNameHeader() {
        this.sortHeader.should("be.visible").click();
    }

    verifySortedByNameDesc() {
        this.nonEmptyTableRows.find("td:nth-child(1)").then(($cells) => {
            const names = Cypress._.map($cells, (cell) => cell.innerText.trim());
            const sortedNames = [...names].sort((a, b) => b.localeCompare(a));
            expect(names).to.deep.equal(sortedNames);
        });
    }
}

export default new PlantPage();
