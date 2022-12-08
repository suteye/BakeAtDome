const request = require('supertest');
const productBaseURL = 'http://localhost:5500/api/products/';

describe('Home Product Backend', () => {

    it('GET/home respond with 200', async () => {
        const respond = await request(productBaseURL).get('/');
        expect(respond.statusCode).toBe(200);
    });

    it("should create a product", async () => {
        const res = await request(productBaseURL).post("/create").send({
            _id: 32,
            name: "ขาไก่อบกรอบ",
            "price": "25",
            quantity: 100,
            productStatus: "1"
        });
        expect(res.statusCode).toBe(200);
      });

    it('GET/getProducts respond with 200', async () => {
        const respond = await request(productBaseURL).post('/').send({
            name: "ขาไก่อบกรอบ"
        });
        expect(respond.statusCode).toBe(200);
    });

    it('GET/deleteProduct respond with 200', async () => {
        const res = await request(productBaseURL).get('/:id').delete(
            "/api/products/:id=32"
          );
          expect(res.statusCode).toBe(200);
    });

    it('GET/updateProduct respond with 200', async () => {
        const res = await request(productBaseURL)
        .patch("/api/products/:id=32")
        .send({
            _id: 32,
            name: "ขาไก่อบกรอบ",
            "price": "25",
            quantity: 100,
            productStatus: "1"
        });
      expect(res.statusCode).toBe(200);
    });

});
  
