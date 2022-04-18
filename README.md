###

### Notes

#### What is an E2E test?

- Runs the whole web app in a headless browser.
- Requires a back-end and database.

#### What flows should be tested in E2E?

- Happy Path Flows: users must be able to complete basic operations.
- Everything valuble for your business, whatever your business prioritizes.
- Everything that breaks often, weak areas of the system.

### Cheatsheat

- cy.visit('www.google.com'), to go to webpages.
- cy.screenshot(), to take screenshots.
- cy.get(), find elements on page, like jquery.
- cy.contains(), find DOM containing the text on the page.
- cy.intercept("POST", "/api/users"), intercept AJAX requests.
