exports.config = {
    capabilties: {
        'browserName': 'chrome'
    },
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['login_spec.js','home.js','bill.js'],
    jasmineNodeOpts: {
        defaultTimeoutInterval: 20000
    }
};