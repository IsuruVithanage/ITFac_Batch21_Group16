Cypress.Commands.add("loginAs", (role) => {
    cy.fixture("users").then((users) => {
        cy.visit("/ui/login");

        cy.get('input[name="username"]')
            .clear()
            .type(users[role].username);

        cy.get('input[name="password"]')
            .clear()
            .type(users[role].password);

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

Cypress.Commands.add("clearField", (selector) => {
    cy.get(selector)
        .should("be.visible")
        .clear();
});

Cypress.Commands.add("goToPage", (path) => {
    cy.visit(path);
    cy.currentUrlShouldIncludes(path);
});

Cypress.Commands.add("currentUrlShouldIncludes", (path) => {
    cy.url().should("include", path);
});

Cypress.Commands.add("shouldShowValidationMessage", (messagePattern) => {
    cy.contains(messagePattern)
        .should("be.visible");
});

Cypress.Commands.add("clearAndType", (selector, value) => {
    cy.get(selector)
        .should("be.visible")
        .clear()
        .type(value);
});


Cypress.Commands.add("assertActionButtonDisabled", (title) => {
    cy.get(`[title='${title}']`)
        .should("exist")
        .each(($el) => {
            const isDisabled =
                $el.is(":disabled") ||
                $el.attr("disabled") !== undefined ||
                $el.attr("aria-disabled") === "true" ||
                $el.hasClass("disabled");

            expect(
                isDisabled,
                `${title} button should be disabled`
            ).to.be.true;
        });
});


Cypress.Commands.add("assertPermissionErrorMessage", () => {
    cy.contains(
        /permission|not allowed|unauthorized|forbidden|access denied/i
    ).should("be.visible");
});

Cypress.Commands.add(
    "assertActionButtonRestricted",
    (selector) => {
        cy.get("body").then(($body) => {

            // Case 1: element completely hidden
            if ($body.find(selector).length === 0) {
                cy.log(`${selector} is hidden`);
                return;
            }

            cy.get(selector).then(($el) => {
                const tagName = $el.prop("tagName").toLowerCase();

                // Case 2: real button → must be disabled
                if (tagName === "button") {
                    cy.wrap($el).should("be.disabled");
                    return;
                }

                // Case 3: anchor tag → cannot be disabled in HTML
                if (tagName === "a") {
                    const hasDisabledClass = $el.hasClass("disabled");
                    const hasHref = $el.attr("href");

                    expect(
                        hasDisabledClass || !hasHref,
                        "Anchor should be disabled via class or missing href"
                    ).to.be.true;
                }
            });
        });
    }
);