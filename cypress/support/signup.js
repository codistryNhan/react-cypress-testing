Cypress.Commands.add('signup', ({ email, username, password } = {}) => {
  const random = Math.floor(Math.random() * 1000000);
  const user = {
    username: username || `Tester${random}`,
    email: email || `user+${random}@notrealemail.com`,
    password: password || 'Password123!@#',
  };

  // Go to Sign Up page
  cy.visit(SIGNUP);

  cy.intercept('POST', 'https://api.realworld.io/api/users/login').as(
    'signup-request'
  );

  // Get required inputs
  cy.get('input[placeholder=Username]').type(user.username);
  cy.get('input[placeholder=Email]').type(user.email);
  cy.get('input[placeholder=Password]').type(user.password);
  cy.contains('button', 'Sign up').click();

  // Check resposne status code
  cy.wait('@signup-request').then((xhr) => {
    expect(xhr.response.statusCode).to.equal(200);
    cy.log(xhr.response.body.user.token);
  });

  // Confirm logged in
  // User profile name should appear on dashboard page
  cy.contains(user.username).should('exist');

  cy.then(() => user);
});
