// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

import { SIGNUP, SIGNIN } from '../constants';

// Alternatively you can use CommonJS syntax:
// require('./commands')
Cypress.Commands.add('signup', ({ email, username, password } = {}) => {
  const random = Math.floor(Math.random() * 1000000);
  const user = {
    username: username || `Tester${random}`,
    email: email || `user+${random}@notrealemail.com`,
    password: password || 'Password123!@#',
  };

  // Go to Sign Up page
  cy.visit(SIGNUP);

  // intercept xhr signup request
  cy.intercept('POST', 'https://api.realworld.io/api/users').as(
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
  });

  cy.then(() => user);
});

Cypress.Commands.add('createPost', () => {
  // intercept create-post request
  cy.intercept('POST', 'https://api.realworld.io/api/articles').as(
    'create-post'
  );

  // Create new post
  cy.contains('a[href]', 'New Post').click();
  cy.get('input[placeholder="Article Title"]').type('Test Title');
  cy.get('input[placeholder="What\'s this article about?"]').type(
    'Test article'
  );
  cy.get('textarea[placeholder="Write your article (in markdown)"]').type(
    'Test article content'
  );
  cy.get('input[placeholder="Enter tags"]').type('Test tags');
  cy.contains('button', 'Publish Article').click();

  // Check response
  cy.wait('@create-post').should(({ request, response }) => {
    expect(response.statusCode).to.equal(200);
  });

  // Check if page contains new post
  cy.contains('Test article content').should('be.visible');
});

Cypress.Commands.add('authenticateIntegration', () => {
  cy.fixture('users/signup')
    .its('user')
    .should(
      (user) =>
        expect(user).to.have.property('token').and.to.be.a('string').and.not.to
          .be.empty
    )
    .then((user) => localStorage.setItem('jwt', user.token));
});
