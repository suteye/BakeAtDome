describe('Test', function() {

    it('Test Case #1', function() {
       browser.get('http://localhost:3000/'); 
    });

});


describe('Protractor Demo App', function() {
    it('should have a title', function() {
      browser.get('http://juliemr.github.io/protractor-demo/');
  
      expect(browser.getTitle()).toEqual('Super Calculator');
    });
  });