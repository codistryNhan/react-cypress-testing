import { SIGNUP } from '../constants';

const randomInt = Math.floor(Math.random() * 1000000);

it('sign-up flow', () => {
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
});
