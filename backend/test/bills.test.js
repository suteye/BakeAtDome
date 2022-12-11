const request = require('supertest');
const productBaseURL = 'http://localhost:5500/api/bills/';//???

describe('Home Product Backend', () => {

    it('GET/home respond with 200', async () => {
        const respond = await request(productBaseURL).get('/');
        expect(respond.statusCode).toBe(200);
    });

    it('GET/home respond with 200', async () => {
        const respond = await request(productBaseURL).get('/summary');
        expect(respond.statusCode).toBe(200);
    });
    //post
});
  
