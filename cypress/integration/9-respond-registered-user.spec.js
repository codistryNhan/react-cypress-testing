/*
 **  Write a test where an already registered user with 'Username=username' and 'Password=password'
 **  visits the login page and tries to login with registered credentials.
 **  The server should respond to the login request with a 200 status code.
 */
import { randomInt } from '../helpers';
import { SIGNIN, SIGNUP } from '../constants';

describe('Check status code when user logs in', () => {
  let num = randomInt();
  let username = 'Tester' + num;
  let email = 'tester+' + num + '@notreal.com';
  let password = 'Password123!@#';

  it('register the user', () => {
    // Go to Sign Up page
    cy.visit(SIGNUP);

    // Get required inputs
    cy.get('input[placeholder=Username]').type(username);
    cy.get('input[placeholder=Email]').type(email);
    cy.get('input[placeholder=Password]').type(password);
    cy.contains('button', 'Sign up').click();

    // Confirm logged in
    // User profile name should appear on dashboard page
    cy.contains(username).should('exist');
  });

  it('log the user out', () => {
    // Click on settings
    cy.contains('a[href]', 'Settings').click();

    // Click on logout
    cy.contains('button', 'logout').click();

    // Confirm logged out by seeing "Signup" or "Signin"
    cy.contains('Sign in').should('be.visible');
  });

  it('log the user on and check status code', () => {
    cy.intercept('POST', 'https://api.realworld.io/api/users/login').as(
      'signin-request'
    );

    // Go to Sign In page
    cy.visit(SIGNIN);

    // login
    cy.get('input[placeholder=Email]').type(email);
    cy.get('input[placeholder=Password]').type(password);
    cy.contains('button', 'Sign in').click();

    // intercept the request
    cy.wait('@signin-request').should(({ request, response }) => {
      expect(response.statusCode).to.equal(200);
    });
  });
});
