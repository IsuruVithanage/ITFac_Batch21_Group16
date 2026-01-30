Cypress.Commands.add("loginAs", (userType) => {
    cy.fixture("users").then((users) => {
        cy.visit("/ui/login");

        cy.get('input[name="username"], #username')
            .clear()
            .type(users[userType].username);

        cy.get('input[name="password"], #password')
            .clear()
            .type(users[userType].password);
    });
});