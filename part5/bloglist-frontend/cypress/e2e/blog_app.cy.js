describe('Blog App', () => {
  beforeEach(function() {
    cy.request('POST','http://localhost:3003/api/testing/reset');
    cy.visit('http://localhost:3000');
  });
  it('front page can be opened', () => {
    cy.contains('blogs');
  });
  it('login form is shown', () => {
    cy.contains('blogs');
    cy.contains('username');
    cy.contains('password');
  });
  // it('user can login', () => {
  //   cy.get('#username').type('TestUser');
  //   cy.get('#password').type('test123');
  //   cy.get('#submitLogin').click();
  //   cy.contains('test logged in');
  // });
});