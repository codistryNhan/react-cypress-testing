/*
 **  Write a test where a user will visit the login page and try to login with unregistered credentials.
 **  The server should respond with a 4403 status code to the login request.
 */
import { SIGNIN } from '../constants';

it('login', () => {
  // Setup for ajax request intercept
  cy.intercept('POST', 'https://api.realworld.io/api/users/login').as(
    'signup-request'
  );

  cy.visit(SIGNIN);
  cy.get('input[placeholder=Email]').type('test12345678@notreal.com');
  cy.get('input[placeholder=Password]').type('password');
  cy.contains('button', 'Sign in').click();

  // Intercept AJAX request
  cy.wait('@signup-request').should(({ request, response }) => {
    expect(response.statusCode).to.equal(403);
  });
});
