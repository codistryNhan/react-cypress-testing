/*
 **  Write two tests. In the first test, go to the register page and register the user.
 **  Then, write the second test that logs in with the credentials created in the first test.
 */

import { SIGNUP, SIGNIN } from '../constants';

const randomInt = Math.floor(Math.random() * 1000000);

describe('register then login', () => {
  const username = 'Tester' + randomInt;
  const email = 'tester+' + randomInt + '@notreal.com';
  const password = 'Password123!@#';

  it('register', () => {
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

  it('logout', () => {
    // Click on settings
    cy.contains('a[href]', 'Settings').click();

    // Click on logout
    cy.contains('button', 'logout').click();

    // Confirm logged out by seeing "Signup" or "Signin"
    cy.contains('Sign in').should('be.visible');
  });

  it('login', () => {
    // Go to Sign Up page
    cy.visit(SIGNIN);

    // login
    cy.get('input[placeholder=Email]').type(email);
    cy.get('input[placeholder=Password]').type(password);
    cy.contains('button', 'Sign in').click();

    // if page contains user's name, means we've logged in
    cy.contains(username).should('be.visible');
  });
});
