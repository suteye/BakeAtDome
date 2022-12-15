describe('Login', () => {
  it('Should see login page', () => {
    cy.visit('http://127.0.0.1')
    cy.url().should('include', '/login')
  })

  
})