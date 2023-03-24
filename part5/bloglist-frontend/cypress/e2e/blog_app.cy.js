describe('Blog App', () => {
  const user = {
    name:'Giao Ngo',
    username:'giao',
    password:'test123'
  };
  beforeEach(function() {
    cy.request('POST',`${Cypress.env('BACKEND')}/testing/reset`);
    cy.request('POST',`${Cypress.env('BACKEND')}/users`,user);
    cy.visit('');
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

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username:'giao', password:'test123' });
    });

    it('A blog can be created',() => {
      cy.contains('create new blog').click();
      cy.contains('create new');
      cy.get('#title-input').type('cypress blog');
      cy.get('#author-input').type('giao ngo');
      cy.get('#url-input').type('giaongo.com');
      cy.get('#createBlogBtn').click();
      cy.get('.notiBox').should('be.visible').and('have.css','border-color','rgb(0, 128, 0)');
      cy.contains('cypress blog - giao ngo');
    });

    describe('A blog exists', () => {
      beforeEach(() => {
        cy.createBlog({ title:'another cypress blog', author:'Eugine', url:'eugine.com' });
        cy.createBlog({ title:'second cypress blog', author:'Timo', url:'timo.com' });
      });
      it('user can like a blog', () => {
        cy.get('.detailBtn').contains('view').click();
        cy.get('#likeBtn').click();
        cy.get('.likeSection').contains('1');
      });
    });

  });

});