/*
 **  Write a test that will log out the user after they register.
 **  Remember to assert the visibility of an element that only a logged-out user can see (ex: sign up).
 */

import { SIGNUP } from '../constants';

const randomInt = Math.floor(Math.random() * 1000000);

describe('register and then log out', () => {
  it('register and log out', () => {
    // Go to Sign Up page
    cy.visit(SIGNUP);

    // Create unique username everytime
    // Or we could reset database everytime
    const username = 'Tester' + randomInt;
    const email = 'tester+' + randomInt + '@notreal.com';
    const password = 'Password123!@#';

    // Get required inputs
    cy.get('input[placeholder=Username]').type(username);
    cy.get('input[placeholder=Email]').type(email);
    cy.get('input[placeholder=Password]').type(password);
    cy.contains('button', 'Sign up').click();

    // Confirm logged in
    // User profile name should appear on dashboard page
    cy.contains(username).should('exist');

    // Click on settings
    cy.contains('a[href]', 'Settings').click();

    // Click on logout
    cy.contains('button', 'logout').click();

    // Confirm logged out by seeing "Signup" or "Signin"
    cy.contains('Sign in').should('be.visible');
  });
});
