import BasePage from "./BasePage";

class DashboardPage extends BasePage {

    verifyPageLoaded() {
        super.verifyUrl("/ui/dashboard");
        cy.get("h3").should("contain", "Dashboard");
    }
}

export default new DashboardPage();
