/*
 **  Write a test that checks whether the register page has a visible link to the login page with the text "Have an account?"
 */

import { SIGNUP } from '../constants';

describe('login link on register page', () => {
  it('Check if to login link is visible on register page', () => {
    // Go to Sign Up page
    cy.visit(SIGNUP);

    // Check if we have a link with 'Have an account?' and click on link
    cy.contains('a[href]', 'Have an account?').should('be.visible');
  });
});
