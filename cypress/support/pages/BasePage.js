class BasePage {
    constructor() {

    }

    verifyUrl(urlPart) {
        cy.url().should("include", urlPart);
    }

    verifyValidationMessage(messagePattern) {
        cy.contains(messagePattern).should("be.visible");
    }

    assertActionButtonDisabled(title) {
        cy.get(`[title='${title}']`)
            .should("exist")
            .each(($el) => {
                const isDisabled =
                    $el.is(":disabled") ||
                    $el.attr("disabled") !== undefined ||
                    $el.attr("aria-disabled") === "true" ||
                    $el.hasClass("disabled");

                expect(isDisabled, `${title} button should be disabled`).to.be.true;
            });
    }

    assertPermissionErrorMessage() {
        cy.contains(
            /permission|not allowed|unauthorized|forbidden|access denied/i
        ).should("be.visible");
    }

    assertActionButtonRestricted(selector) {
        cy.get("body").then(($body) => {
            if ($body.find(selector).length === 0) {
                cy.log(`${selector} is hidden`);
                return;
            }

            cy.get(selector).then(($el) => {
                const tagName = $el.prop("tagName").toLowerCase();

                if (tagName === "button") {
                    cy.wrap($el).should("be.disabled");
                    return;
                }

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

    clickOn(text) {
        cy.contains("button, a", text).should("be.visible").click();
    }
}

export default BasePage;
