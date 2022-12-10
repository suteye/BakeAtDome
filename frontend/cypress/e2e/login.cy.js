describe('Login', () => {
  it('Should see login page', () => {
    cy.visit('http://localhost:3000')
    cy.url().should('include', '/login')
  })

  
})