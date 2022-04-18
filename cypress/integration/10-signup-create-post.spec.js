/*
 **  Write a custom command createPost that allows you to create
 **  a new post and write a test that leverages both the existing signup command.
 */

it('register then create a post', () => {
  // Commands are in ./support/index.js
  cy.signup();
  cy.createPost();
});
