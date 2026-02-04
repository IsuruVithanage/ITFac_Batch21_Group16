// cypress/support/commands/ui/navigation.commands.js

Cypress.Commands.add("clickSidebarMenu", (menuItem) => {
  // We target the sidebar specifically to avoid clicking links in the main content
  cy.get(".sidebar")
    .contains(".nav-link", menuItem)
    .should("be.visible")
    .click();
});

Cypress.Commands.add("verifyActiveTab", (menuItem) => {
  // Based on your HTML, active links likely lose the 'text-white' class 
  // or gain a specific active style
  cy.get(".sidebar")
    .contains(".nav-link", menuItem)
    .should("not.have.class", "text-white"); 
});