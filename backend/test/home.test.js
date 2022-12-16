const request = require('supertest');
const productBaseURL = 'http://localhost:5500/api/products/';

describe('Home Product Backend', () => {

    it('GET/home respond with 200', async () => {
        const respond = await request(productBaseURL).get('/');
        expect(respond.statusCode).toBe(200);
    });

    it('Not found product respond with 404', async () => {
        const respond = await request(productBaseURL).post('/').send({
            
        });
        expect(respond.statusCode).toBe(404);
    });

    // it('should deleteProduct', async () => {
    //         const db = {
    //             deleteProduct: jest.fn(() => true)
                
    //         };
    //         const result = await deleteProduct(db, productId);
    //         expect(db.deleteProduct).toHaveBeenCalledWith(productId);
    //         expect(result).toBe(true);

    // });

    // it('should update an existing product', () => {
    //     const product = {
    //         _id: 0,
    //         name: 'ขาไก่อบกรอบ',
    //         price: 15
    //     };
    //     const updatedProduct = updateProduct(product, { price: 25 });
    //     expect(updatedProduct).toEqual({
    //         _id: 0,
    //         name: 'ขาไก่อบกรอบ',
    //         price: 25
    //     });
    // });

});
  