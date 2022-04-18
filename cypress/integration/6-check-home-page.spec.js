/*
 **  Write a test that will visit the home page
 **  and find the 'A place to share your knowledge.' text to ensure that home page works properly.
 */

import { HOME } from '../constants';

describe('Visit homepage', () => {
  it('visit homepage and check for text', () => {
    cy.visit(HOME);
    cy.contains('A place to share your knowledge').should('be.visible');
  });
});
