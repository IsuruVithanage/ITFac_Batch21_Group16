import BasePage from "./BasePage";

class NavigationPage extends BasePage {

    // Locators
    get sidebar() { return cy.get(".sidebar.nav"); }

    // Actions
    clickLink(linkText) {
        this.sidebar.contains("a", linkText).click();
    }

    verifyActiveLink(linkText) {
        this.sidebar.contains("a", linkText).should("have.class", "active");
    }

    verifyDisabledLink(linkText) {
        this.sidebar.contains("a", linkText)
            .should("have.class", "disabled")
            .and("have.attr", "href", "javascript:void(0);");
    }

    verifyTooltip(linkText, tooltipText) {
        this.sidebar.contains("a", linkText).should("have.attr", "title", tooltipText);
    }
}

export default new NavigationPage();
