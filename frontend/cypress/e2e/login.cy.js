const baseUrl = process.env.FRONTEND_URL || 'http://127.0.0.1:3000';

describe('Login', () => {
  it('Should see login page', () => {
    cy.visit(baseUrl)
    cy.url().should('include', '/login')
  })

  
})