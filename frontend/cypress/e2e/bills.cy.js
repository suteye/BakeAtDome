describe('Login', () => {

    beforeEach(function() {
        cy.visit('http://localhost:3000/');
        cy.get('input[id="username"]').type('sutima.phe@dome.tu.ac.th')
        cy.get('input[name="password"]').type('demo12345')
        cy.get('button[type="submit"]').click();

        cy.get('button[class="swal2-confirm swal2-styled"]').click();
        cy.get('[class="ant-menu-item"]').eq(0).click();
      });

    it('Should see bills page', () => {
        cy.url().should('include', '/bills')
    })

    it('Test Search Bill',function(){
        cy.log("===== TEST Search Bill =====")  
        cy.get('input[class="ant-input ant-input-lg css-dev-only-do-not-override-1i536d8"]').type('aaaa')
        cy.log("Search Success");

    });

    it('Test Bill list',function(){
        cy.log("===== TEST Bill List =====")   

        cy.get('table').contains('td', '#11292022-0001');
        cy.get('table').contains('td', '15');
        cy.get('table').contains('td', 'เงินสด');

    });
    

    it('Test Bill',function(){
        cy.log("===== TEST Bill =====")   
        cy.get('[class="anticon anticon-eye cart-edit eye"]').eq(0).click();
        cy.get('[class="ant-btn css-dev-only-do-not-override-1i536d8 ant-btn-default add-new"]').click();
        
    });
    
  })