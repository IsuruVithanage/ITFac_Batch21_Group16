import BasePage from "./BasePage";

class CategoryPage extends BasePage {

    // Locators
    get nameInput() { return cy.get('input[name="name"], #name'); }
    get parentSelect() { return cy.get('select[name="parentId"]'); }
    get searchButton() { return cy.contains('button[type="submit"]', /^search$/i); }
    get tableRows() { return cy.get("table tbody tr"); }
    get nameCells() { return cy.get("table tbody tr td:nth-child(2)"); }
    get nextButton() { return cy.contains("a,button", /next/i); }
    get sortHeader() { return cy.get('thead a[href*="sortField=name"]').first(); }
    get saveButton() { return cy.contains("button", /save/i); } // approximation
    get categoryTable() { return cy.get("table"); }

    verifyPageLoaded() {
        super.verifyUrl("/ui/categories");
    }

    goToAddCategoryPage() {
        cy.visit("/ui/categories/add");
    }

    // Actions
    searchByName(term) {
        cy.get('input[name="name"]').should("be.visible").clear().type(term);
        this.searchButton.click();
    }

    filterByParent(parentName) {
        this.parentSelect.should("be.visible").select(parentName);
        this.searchButton.click();
    }

    sortByName() {
        this.sortHeader.click();
    }

    goToNextPage() {
        cy.scrollTo("bottom");
        this.nextButton.should("be.visible").click();
    }

    // Verification
    verifyNoCategoryFound() {
        cy.get("table tbody")
            .contains("td", "No category found")
            .should("be.visible")
            .and("have.attr", "colspan", "4");

        this.tableRows.should("have.length", 1);
    }

    verifyCategoriesVisible() {
        this.categoryTable.should("be.visible");
        // Verify not empty state
        this.tableRows.not(":contains('No categories found')")
            .should("have.length.greaterThan", 0);
    }

    // Form interactions
    clearNameInput() {
        this.nameInput.clear();
    }

    enterName(name) {
        this.nameInput.clear().type(name);
    }

    clickAddCategoryButton() {
        cy.contains("button, a", /add\s*(a\s*)?category/i).click();
    }

    verifyAddButtonNotVisible() {
        cy.contains("button, a", /add\s*(a\s*)?category/i).should("not.exist");
        cy.get('a[href*="/ui/categories/add"], a[href*="/categories/add"]').should("not.exist");
    }

    verifyEditButtonNotVisible() {
        cy.get('a[title="Edit"]').should("not.exist");
        cy.get('a[href*="/ui/categories/edit"]').should("not.exist");
    }

    clickEditCategory(index = 0) {
        cy.get('a[title="Edit"]').eq(index).click();
    }

    forceClickEditCategory(index = 0) {
        cy.get('a[title="Edit"]').eq(index).should("exist").click({ force: true });
    }

    clickDeleteCategory(index = 0) {
        cy.get('button[title="Delete"]').eq(index).click();
    }

    verifyRedirectToEditPage() {
        cy.url().should("match", /edit/i);
    }

    verifyCategoryDetailsLoaded() {
        this.nameInput.should("be.visible").invoke("val").should("not.be.empty");
    }

}

export default new CategoryPage();
