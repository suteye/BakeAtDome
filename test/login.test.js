let chai = require('chai');
let server = require('../backend/server');
const { expect } = require("chai");
let should = chai.should();

describe('Connection', () => {

    // before(async () => {
    //     await connection();
    // });

    it('it should Connected Successfully', function() {
        connection();
    });
});