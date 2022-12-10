exports.config = {
    capabilties: {
        'browserName': 'chrome'
    },
    framework: 'jasmine',
    // seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: true,
    specs: ['login_spec.js'],
    jasmineNodeOpts: {
        defaultTimeoutInterval: 20000
    }
};