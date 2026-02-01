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