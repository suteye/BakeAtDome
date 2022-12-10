exports.config = {
  
    capabilities: {
      'browserName': 'chrome'
    },
    
    framework:'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['home.js']
    
  };