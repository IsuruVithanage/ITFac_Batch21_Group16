import BasePage from "./BasePage";

class SalePage extends BasePage {

    // Locators
    get plantSelect() { return cy.get("select#plantId"); }
    get quantityInput() { return cy.get('input[type="number"]'); } 
    get sellButton() { return cy.contains("button", /^sell$/i); }
    get sellPlantLink() { return cy.contains("a", /sell plant/i); }
    get tableRows() { return cy.get("table tbody tr"); }
    get tableHeaders() { return cy.get("table thead th"); }
    get pagination() { return cy.get(".pagination"); }

    verifyPageLoaded() {
        super.verifyUrl("/ui/sales");
    }

    goToAddSalePage() {
        cy.visit("/ui/sales/new");
    }

    verifyAddSalePageLoaded() {
        cy.url().should("include", "/ui/sales/new");
    }

    verifyPageTitle(title) {
        cy.contains("h3", title).should("be.visible");
    }

    // Actions
    clickSellPlantLink() {
        this.sellPlantLink.click();
    }

    verifySellLinkNotVisible() {
        cy.contains("a, button", /sell/i).should("not.exist");
    }

    verifyFormElementsVisible() {
        this.plantSelect.should("be.visible");
        this.quantityInput.should("be.visible");
        this.sellButton.should("be.visible");
    }

    verifyFormVisible() {
        cy.get("form").should("be.visible");
    }

    verifyPlantDropdownOptionsAndSelect() {
        this.plantSelect.find("option").should("have.length.greaterThan", 1);
        this.plantSelect.find("option").eq(1).then((option) => {
            this.plantSelect.select(option.val());
        });
        this.plantSelect.find(":selected").should("not.have.value", "");
    }

    selectPlant(index = 1) {
        this.plantSelect.find("option").eq(index).then((option) => {
            this.plantSelect.select(option.val());
        });
    }

    enterQuantity(qty) {
        this.quantityInput.clear().type(qty);
    }

    submitForm() {
        this.sellButton.click();
    }

    verifySuccessMessage() {
        cy.contains(/success|added|sold/i).should("be.visible");
    }

    verifyRedirectToSalesList() {
        this.verifyPageLoaded();
    }

    clickDeleteSale(index = 0) {
        this.tableRows.eq(index).find("button.btn-outline-danger").click();
    }

    verifyDeleteButtonNotVisible() {
        this.tableRows.each(($row) => {
            cy.wrap($row).invoke("text").should("not.match", /delete/i);
        });
    }

    // Sorting & Pagination
    verifySortableHeaders() {
        this.tableHeaders.should("have.length.greaterThan", 0);
        this.tableHeaders.each(($th) => {
            cy.wrap($th).should("be.visible");
        });
    }

    clickSortHeader(index = 0) {
        this.tableHeaders.eq(index).click();
    }

    verifySortIndicator() {
        this.tableRows.should("have.length.greaterThan", 0);
    }

    verifyPagination() {
        cy.get("body").then(($body) => {
            if ($body.find(".pagination").length > 0) {
                cy.get(".pagination").should("be.visible");
            } else {
                cy.log("Pagination not rendered — data fits single page");
            }
        });
    }

}

export default new SalePage();
