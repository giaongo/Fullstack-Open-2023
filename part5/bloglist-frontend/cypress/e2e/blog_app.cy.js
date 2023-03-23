describe('Blog App', () => {
  const user = {
    name:'Giao Ngo',
    username:'giao',
    password:'test123'
  };
  beforeEach(function() {
    cy.request('POST','http://localhost:3003/api/testing/reset');
    cy.request('POST','http://localhost:3003/api/users',user);
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

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#username').type('giao');
      cy.get('#password').type('test123');
      cy.get('#submitLogin').click();
      cy.get('.notiBox')
        .should('be.visible')
        .and('have.css','border-color','rgb(0, 128, 0)');
      cy.contains(user.name + ' logged in');

    });
    it('fails with wrong credentials', () => {
      cy.get('#username').type('giao12');
      cy.get('#password').type('giao12');
      cy.get('#submitLogin').click();
      cy.get('.notiBox')
        .should('be.visible')
        .and('have.css','border-color','rgb(255, 0, 0)');
      cy.get('.messageNoti').contains('invalid username and password');
    });
  });


});