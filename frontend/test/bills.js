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
        browser.get('http://localhost:3000/bills');
    });

    it('Test Search Bill',function(){
        console.log("===== TEST Search Bill =====")   

        browser.sleep(5000)
        element(by.className('ant-input ant-input-lg')).sendKeys("aaaa").then(function(){
            console.log("Search Success");
        })
        browser.sleep(5000)
    });

    it('Test Bill list',function(){
        console.log("===== TEST Search Bill =====")   

        browser.sleep(5000)
        element(by.className('ant-input ant-input-lg')).sendKeys("aaaa").then(function(){
            console.log("Search Success");
        })
        browser.sleep(5000)
    });
    //compare other list with detail topic
});