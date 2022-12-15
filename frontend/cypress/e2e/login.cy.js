describe('Login', () => {

  beforeEach(() => {

    cy.visit('http://localhost:3000')
  
  })

  it('Should see login page', () => {
    cy.url().should('include', '/login')
  })

  it('Should see popup invalid username', () => {
    cy.get('input[id="username"]').type('Bright')
    cy.get('input[name="password"]').type('demo12345')
    cy.get('button[type="submit"]').click();

    cy.get('[id=swal2-html-container]').should('have.text', 'Username หรือ Password ไม่ถูกต้อง');
  })
  
  it('Should see popup invalid password', () => {
    cy.get('input[id="username"]').type('sutima.phe@dome.tu.ac.th')
    cy.get('input[name="password"]').type('demo')
    cy.get('button[type="submit"]').click();

    cy.get('[id=swal2-html-container]').should('have.text', 'Username หรือ Password ไม่ถูกต้อง');
  })

  it('Should see popup invalid username and password', () => {
    cy.get('input[id="username"]').type('Bright')
    cy.get('input[name="password"]').type('demo')
    cy.get('button[type="submit"]').click();

    cy.get('[id=swal2-html-container]').should('have.text', 'Username หรือ Password ไม่ถูกต้อง');
  })

  it('Should see popup invalid empty username', () => {
    cy.get('input[name="password"]').type('demo12345')
    cy.get('button[type="submit"]').click();

    cy.get('[id=swal2-html-container]').should('have.text', 'กรุณากรอก Username และ Password ให้ครบถ้วน');
  })

  it('Should see popup invalid empty password', () => {
    cy.get('input[id="username"]').type('Bright')
    cy.get('button[type="submit"]').click();

    cy.get('[id=swal2-html-container]').should('have.text', 'กรุณากรอก Username และ Password ให้ครบถ้วน');
  })

  it('Should see popup invalid empty username and password', () => {
    cy.get('button[type="submit"]').click();

    cy.get('[id=swal2-html-container]').should('have.text', 'กรุณากรอก Username และ Password ให้ครบถ้วน');
  })

  it('Should login and logout success', () => {
    cy.get('input[id="username"]').type('sutima.phe@dome.tu.ac.th')
    cy.get('input[name="password"]').type('demo12345')
    cy.get('button[type="submit"]').click();

    cy.get('[id=swal2-html-container]').should('have.text', 'เข้าสู่ระบบสำเร็จ');

    cy.get('button[class="swal2-confirm swal2-styled"]').click();
    cy.get('[class="anticon anticon-logout ant-menu-item-icon"]').click();

    cy.url().should('include', 'login')
  })
})