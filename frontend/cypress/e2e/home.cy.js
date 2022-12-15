describe('Home Page', () => {

      beforeEach(function() {
        cy.visit('http://localhost:3000/');
        cy.get('input[id="username"]').type('sutima.phe@dome.tu.ac.th')
        cy.get('input[name="password"]').type('demo12345')
        cy.get('button[type="submit"]').click();

        cy.get('button[class="swal2-confirm swal2-styled"]').click();
      });

    it('Should see Home page', () => {

        cy.url().should('include', '/')
    })
    
    it('Test Search Item', () => {  
        
        cy.get('input[class="ant-input ant-input-lg css-dev-only-do-not-override-1i536d8"]').type('คุ้กกี้')
        cy.log('Search Success')
    });


    it('Test Dropdown', () => { 

        cy.log('===== TEST Dropdown =====')
        cy.get('.ant-select-selection-item').click();
        cy.log('dropdown success')
    });

    it('Test add item to cart', () => { // add another

        cy.log('===== TEST add item to cart =====')
        cy.get('[class="ant-btn css-dev-only-do-not-override-1i536d8"]').first().click();
        //cy.get('.ant-btn').click();
        cy.log('Add item success')
        
    });

    it('Test add item with plus button in cart', () => {

        cy.log('===== TEST add item with plus button in cart =====')
        cy.get('[class="ant-btn css-dev-only-do-not-override-1i536d8"]').first().click();
        cy.get('[class="ant-btn css-dev-only-do-not-override-1i536d8 ant-btn-circle ant-btn-default ant-btn-icon-only btn-edit"]').first().click();
        cy.log('Add item with button success')
    });

    it('Test delete item with minus button in cart', () => {

        cy.log('===== TEST delete item with minus button in cart =====')
        cy.get('[class="ant-btn css-dev-only-do-not-override-1i536d8"]').first().click();
        cy.get('[class="ant-btn css-dev-only-do-not-override-1i536d8 ant-btn-circle ant-btn-default ant-btn-icon-only btn-edit"]').first().click();
        cy.get('[class="ant-btn css-dev-only-do-not-override-1i536d8 ant-btn-circle ant-btn-default ant-btn-icon-only btn-edit"]').eq(1).click();
        cy.log('Delete item with button success')
    });

    it('Test delete item from cart', () => {

        cy.log('===== TEST delete item from cart =====')
        cy.get('[class="ant-btn css-dev-only-do-not-override-1i536d8"]').first().click();
        cy.get('[class="ant-btn css-dev-only-do-not-override-1i536d8 ant-btn-round ant-btn-danger ant-btn-lg ant-btn-icon-only"]').click();
        cy.log('Delete item from cart success')
    });

  })