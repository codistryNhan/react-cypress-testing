import { SIGNUP } from '../constants';

let username = 'Tester';
let email = 'user@gmail.com';
let password = 'Password123!@#';
let headers = { 'Access-Control-Allow-Origin': '*' };

it('Sign up with stubs', () => {
  cy.intercept('POST', '**/api/users', {
    headers,
    fixture: 'users/signup',
  }).as('signup-request');
  cy.intercept('GET', '**/api/tags', {
    fixture: 'tags/empty-tags',
    headers,
  }).as('tags');
  cy.intercept('GET', '**/api/articles/feed**', {
    fixture: 'articles/empty-articles',
    headers,
  }).as('feed');

  cy.visit(SIGNUP);

  // Get required inputs
  cy.get('input[placeholder=Username]').type(username);
  cy.get('input[placeholder=Email]').type(email);
  cy.get('input[placeholder=Password]').type(password);
  cy.contains('button', 'Sign up').click();
});
