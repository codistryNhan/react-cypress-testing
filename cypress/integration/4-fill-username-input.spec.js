/*
 **  Write a test that fills the username input field with the word Admin.
 */

import { SIGNUP } from '../constants';

describe('fill username input', () => {
  it('fill username input with "ADMIN"', () => {
    cy.visit(SIGNUP);

    // Get input with attr placeholder="Username"
    cy.get('input[placeholder=Username]').type('ADMIN');
  });
});
