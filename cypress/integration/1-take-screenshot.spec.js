import { HOME } from '../constants';

describe('Screen shot of homepage', () => {
  it('Must visit the site and take a screenshot', () => {
    cy.visit(HOME);
    cy.screenshot();
  });
});
