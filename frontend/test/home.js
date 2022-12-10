const { element, browser } = require("protractor");
describe('Protractor Test', function() {
    var EC = protractor.ExpectedConditions;

    beforeAll(function() {
        // browser.ignoreSynchronization = true;
        browser.waitForAngularEnabled(false);
        browser.get('http://localhost:3000/login');
        
        elm_header = element(by.className('head'));
        browser.wait(EC.textToBePresentInElement(elm_header, 'BAKE@DOME'), 5000);
        element(by.id('username')).sendKeys('Bright');
        element(by.name('password')).sendKeys('demo12345');
        
        elm_button_click = element(by.className('ant-btn ant-btn-default ant-btn-lg ant-btn-block login-btn'));
        browser.wait(EC.elementToBeClickable(elm_button_click), 5000);
        elm_button_click.click();
        
      });
      beforeEach(function() {
        browser.get('http://localhost:3000/');
      });
    it('Test Search Item',function(){
        console.log("===== TEST Search Item =====")   
        browser.sleep(5000)
        element(by.className('ant-input ant-input-lg')).sendKeys("คุกกี้").then(function(){
            console.log("Search Success");  
        })
        browser.sleep(5000) 
    });

    it('Test Dropdown',function(){
        browser.sleep(5000)
        console.log("===== TEST Dropdown =====") // ลองทำแบบกดอันอื่น
        element(by.className('ant-select-selection-item')).click();
        console.log('dropdown success');
        browser.sleep(5000)
    });

    it('Test add item to cart',function(){ // add another
        
        browser.sleep(5000)
        console.log("===== TEST add item to cart =====")
        element(by.className('ant-btn')).click().then(function(){
            console.log('Add item success');
        })
        browser.sleep(5000)
    });

    it('Test add item with plus button in cart',function(){
        browser.sleep(5000)
        console.log("===== TEST add item with plus button in cart =====")
        element(by.className('anticon anticon-plus')).click().then(function(){
            console.log('Add item with button success');
        })
        browser.sleep(5000)
    });

    it('Test delete item with minus button in cart',function(){
        browser.sleep(5000)
        console.log("===== TEST delete item with minus button in cart =====")
        element(by.className('anticon anticon-minus')).click().then(function(){
            console.log('Delete item with button success');
        })
        browser.sleep(5000)
    });

    it('Test delete item from cart',function(){
        browser.sleep(5000)
       console.log("===== TEST delete item from cart =====")
        element(by.className('ant-btn ant-btn-round ant-btn-danger ant-btn-lg ant-btn-icon-only')).click().then(function(){
            console.log('Delete item from cart success');
        })
        browser.sleep(5000)
    });
    
    // it('Test Calculator Iten Value',function(){
    //     browser.sleep(5000)
    //     console.log("===== Test Calculator item value =====")
    //    //เพิ่มคุ้กกี้1 เพิ่มขนมอีก1 แล้วเอาจำนวนมาคูณกับราคา
    //    //situation -> get element then expect
        
    //     browser.sleep(5000)
    // });

});
