const { browser } = require("protractor");

describe('Login & Logout Frontend', function() {

  var EC = protractor.ExpectedConditions;

  beforeEach(function() {
    browser.ignoreSynchronization = true;
    browser.get('http://127.0.0.1/login');
  });

  it('Login Failed: Invalid Username', function() {
    elm_header = element(by.className('head'));
    browser.wait(EC.textToBePresentInElement(elm_header, 'BAKE@DOME'), 5000);

    element(by.id('username')).sendKeys('Bright');
    element(by.name('password')).sendKeys('demo12345');

    elm_button_click = element(by.className('ant-btn ant-btn-default ant-btn-lg ant-btn-block login-btn'));
    browser.wait(EC.elementToBeClickable(elm_button_click), 5000);
    elm_button_click.click();

    elm_popup_login = element(by.id('swal2-title'));
    browser.wait(EC.textToBePresentInElement(elm_popup_login, 'ผิดพลาด'), 5000);
    
    expect(element(by.id('swal2-html-container')).getText()).toEqual('Username หรือ Password ไม่ถูกต้อง');
  });

  it('Login Failed: Invalid Password', function() {
    elm_header = element(by.className('head'));
    browser.wait(EC.textToBePresentInElement(elm_header, 'BAKE@DOME'), 5000);

    element(by.id('username')).sendKeys('sutima.phe@dome.tu.ac.th');
    element(by.name('password')).sendKeys('demo');

    elm_button_click = element(by.className('ant-btn ant-btn-default ant-btn-lg ant-btn-block login-btn'));
    browser.wait(EC.elementToBeClickable(elm_button_click), 5000);
    elm_button_click.click();

    elm_popup_login = element(by.id('swal2-title'));
    browser.wait(EC.textToBePresentInElement(elm_popup_login, 'ผิดพลาด'), 5000);
    
    expect(element(by.id('swal2-html-container')).getText()).toEqual('Username หรือ Password ไม่ถูกต้อง');
  });

  it('Login Failed: Invalid Username and Password', function() {
    elm_header = element(by.className('head'));
    browser.wait(EC.textToBePresentInElement(elm_header, 'BAKE@DOME'), 5000);

    element(by.id('username')).sendKeys('Bright');
    element(by.name('password')).sendKeys('demo');

    elm_button_click = element(by.className('ant-btn ant-btn-default ant-btn-lg ant-btn-block login-btn'));
    browser.wait(EC.elementToBeClickable(elm_button_click), 5000);
    elm_button_click.click();

    elm_popup_login = element(by.id('swal2-title'));
    browser.wait(EC.textToBePresentInElement(elm_popup_login, 'ผิดพลาด'), 5000);
    
    expect(element(by.id('swal2-html-container')).getText()).toEqual('Username หรือ Password ไม่ถูกต้อง');
  });

  it('Login Failed: Username is empty', function() {
    elm_header = element(by.className('head'));
    browser.wait(EC.textToBePresentInElement(elm_header, 'BAKE@DOME'), 5000);

    element(by.name('password')).sendKeys('demo');

    elm_button_click = element(by.className('ant-btn ant-btn-default ant-btn-lg ant-btn-block login-btn'));
    browser.wait(EC.elementToBeClickable(elm_button_click), 5000);
    elm_button_click.click();

    elm_popup_login = element(by.id('swal2-title'));
    browser.wait(EC.textToBePresentInElement(elm_popup_login, 'ผิดพลาด'), 5000);
    
    expect(element(by.id('swal2-html-container')).getText()).toEqual('กรุณากรอก Username และ Password ให้ครบถ้วน');
  });

  it('Login Failed: Password is empty', function() {
    elm_header = element(by.className('head'));
    browser.wait(EC.textToBePresentInElement(elm_header, 'BAKE@DOME'), 5000);

    element(by.id('username')).sendKeys('Bright');

    elm_button_click = element(by.className('ant-btn ant-btn-default ant-btn-lg ant-btn-block login-btn'));
    browser.wait(EC.elementToBeClickable(elm_button_click), 5000);
    elm_button_click.click();

    elm_popup_login = element(by.id('swal2-title'));
    browser.wait(EC.textToBePresentInElement(elm_popup_login, 'ผิดพลาด'), 5000);
    
    expect(element(by.id('swal2-html-container')).getText()).toEqual('กรุณากรอก Username และ Password ให้ครบถ้วน');
  });

  it('Login Failed: Username and Password are empty', function() {
    elm_header = element(by.className('head'));
    browser.wait(EC.textToBePresentInElement(elm_header, 'BAKE@DOME'), 5000);

    elm_button_click = element(by.className('ant-btn ant-btn-default ant-btn-lg ant-btn-block login-btn'));
    browser.wait(EC.elementToBeClickable(elm_button_click), 5000);
    elm_button_click.click();

    elm_popup_login = element(by.id('swal2-title'));
    browser.wait(EC.textToBePresentInElement(elm_popup_login, 'ผิดพลาด'), 5000);
    
    expect(element(by.id('swal2-html-container')).getText()).toEqual('กรุณากรอก Username และ Password ให้ครบถ้วน');
  });

  it('Logout Success', function() {
    elm_header = element(by.className('head'));
    browser.wait(EC.textToBePresentInElement(elm_header, 'BAKE@DOME'), 5000);

    element(by.id('username')).sendKeys('sutima.phe@dome.tu.ac.th');
    element(by.name('password')).sendKeys('demo12345');

    elm_button_click = element(by.className('ant-btn ant-btn-default ant-btn-lg ant-btn-block login-btn'));
    browser.wait(EC.elementToBeClickable(elm_button_click), 5000);
    elm_button_click.click();

    elm_popup_click = element(by.className('swal2-confirm swal2-styled'));
    browser.wait(EC.elementToBeClickable(elm_popup_click), 5000);
    elm_popup_click.click()

    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1/');

    elm_logout_click = element(by.className('anticon anticon-logout ant-menu-item-icon'));
    browser.wait(EC.elementToBeClickable(elm_logout_click), 5000);
    elm_logout_click.click();

    elm_header = element(by.className('head'));
    browser.wait(EC.textToBePresentInElement(elm_header, 'BAKE@DOME'), 5000);

    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1/login');

  });

  it('Login Success', function() {
    elm_header = element(by.className('head'));
    browser.wait(EC.textToBePresentInElement(elm_header, 'BAKE@DOME'), 5000);

    element(by.id('username')).sendKeys('sutima.phe@dome.tu.ac.th');
    element(by.name('password')).sendKeys('demo12345');

    elm_button_click = element(by.className('ant-btn ant-btn-default ant-btn-lg ant-btn-block login-btn'));
    browser.wait(EC.elementToBeClickable(elm_button_click), 5000);
    elm_button_click.click();

    elm_popup_click = element(by.className('swal2-confirm swal2-styled'));
    browser.wait(EC.elementToBeClickable(elm_popup_click), 5000);
    elm_popup_click.click()

    expect(browser.getCurrentUrl()).toEqual('http://127.0.0.1/');

  });

});
