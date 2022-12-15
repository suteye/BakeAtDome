exports.config = {
    capabilties: {
        'browserName': 'chrome',
        'chromeOptions': {
            'args': [
                'no-sandbox',
                '--disable-dev-shm-usage'
            ],
        },
    },
    framework: 'jasmine',
    seleniumAddress: 'http://127.0.0.1/wd/hub',
    directConnect: true,
    specs: ['login_spec.js'],
    jasmineNodeOpts: {
        defaultTimeoutInterval: 20000
    },

};