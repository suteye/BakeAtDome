exports.config = {
    capabilties: {
        'browserName': 'chrome'
    },
    framework: 'jasmine',
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    specs: ['login_spec.js'],
    jasmineNodeOpts: {
        defaultTimeoutInterval: 20000
    }
};