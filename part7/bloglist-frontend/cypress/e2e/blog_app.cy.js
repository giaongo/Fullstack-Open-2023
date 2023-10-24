describe('Blog App', () => {
  const user = {
    name: 'Giao Ngo',
    username: 'giao',
    password: 'test123',
  };
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
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
        .and('have.css', 'border-color', 'rgb(0, 128, 0)');
      cy.contains(user.name + ' logged in');
    });
    it('fails with wrong credentials', () => {
      cy.get('#username').type('giao12');
      cy.get('#password').type('giao12');
      cy.get('#submitLogin').click();
      cy.get('.notiBox')
        .should('be.visible')
        .and('have.css', 'border-color', 'rgb(255, 0, 0)');
      cy.get('.messageNoti').contains('invalid username and password');
    });
  });

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'giao', password: 'test123' });
    });

    it('A blog can be created', () => {
      cy.contains('create new blog').click();
      cy.contains('create new');
      cy.get('#title-input').type('cypress blog');
      cy.get('#author-input').type('giao ngo');
      cy.get('#url-input').type('giaongo.com');
      cy.get('#createBlogBtn').click();
      cy.get('.notiBox')
        .should('be.visible')
        .and('have.css', 'border-color', 'rgb(0, 128, 0)');
      cy.contains('cypress blog - giao ngo');
    });

    describe('A blog exists', () => {
      beforeEach(() => {
        cy.createBlog({
          title: 'another cypress blog',
          author: 'Eugine',
          url: 'eugine.com',
        });
        cy.createBlog({
          title: 'second cypress blog',
          author: 'Timo',
          url: 'timo.com',
        });
      });
      it('user can like a blog', () => {
        cy.contains('another cypress blog').parent().find('button').click();
        cy.contains('another cypress blog')
          .parents('.blog')
          .get('#likeBtn')
          .click();
        cy.contains('another cypress blog')
          .parents('.blog')
          .get('.likeSection')
          .contains('1');
      });
      it('user can delete a blog', () => {
        cy.contains('another cypress blog').parent().find('button').click();
        cy.contains('another cypress blog')
          .parents('.blog')
          .find('button')
          .last()
          .as('Delete');
        cy.get('@Delete').click();
        cy.contains('another cypress blog').should('not.exist');
      });
      it('Non-blog creators cannot see delete button', () => {
        cy.get('#logoutBtn').click();
        cy.createUser({
          name: 'Helena',
          username: 'helena',
          password: 'test456',
        });
        cy.login({ username: 'helena', password: 'test456' });
        cy.contains('another cypress blog').parent().find('button').click();
        cy.contains('another cypress blog')
          .parents('.blog')
          .get('#deleteBtn')
          .should('not.exist');
      });
      it('blog has most like stays at first', () => {
        cy.get('.blog').eq(0).should('contain', 'another cypress blog');
        cy.get('.blog').eq(1).should('contain', 'second cypress blog');
        cy.get('.blog').eq(1).find('.detailBtn').first().click();
        for (let i = 0; i < 2; i++) {
          cy.get('.blog').eq(1).find('#likeBtn').click();
        }
        cy.wait(2000);
        cy.get('.blog').eq(0).should('contain', 'second cypress blog');
      });
    });
  });
});
