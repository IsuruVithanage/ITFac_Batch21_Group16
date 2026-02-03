Cypress.Commands.add("apiLoginAs", (role) => {
    return cy.fixture("users").then((users) => {
        return cy.request({
            method: "POST",
            url: "/api/auth/login",
            body: {
                username: users[role].username,
                password: users[role].password,
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            return response.body.token;
        });
    });
});
