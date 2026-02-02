Cypress.Commands.add("loginAs", (userType) => {
    cy.fixture("users").then((users) => {
        cy.visit("/ui/login");

        cy.get('input[name="username"]')
            .clear()
            .type(users[userType].username);

        cy.get('input[name="password"]')
            .clear()
            .type(users[userType].password);

        cy.get('button, input[type="submit"]')
            .contains("Login")
            .click();
    });
});

Cypress.Commands.add("clickOn", (text) => {
    cy.contains("button, a", text)
      .should("be.visible")
      .click();
});

Cypress.Commands.add("goToPage", (path) => {
    cy.visit(path);
    cy.currentUrlShouldIncludes(path);
});

Cypress.Commands.add("currentUrlShouldIncludes", (path) => {
    cy.url().should("include", path);
});
