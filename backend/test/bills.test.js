const request = require('supertest');
const productBaseURL = 'http://localhost:5500/api/bills/';

describe('Bills Backend', () => {

    it('GET/bills respond with 200', async () => {
        const respond = await request(productBaseURL).get('/');
        expect(respond.statusCode).toBe(200);
    });

    it('Bills Failed: data are empty: Return status 404', async () => {
        const respond = await request(productBaseURL).post('/').send({
            
        });
        expect(respond.statusCode).toBe(404);
    });
    
    it('Bills Failed: paymentMethod is empty: Return status 404', async () => {
        const respond = await request(productBaseURL).post('/').send({
        billId: "11292022-0001",
        name: "ขาไก่อบกรอบ",
        price: "15"
        });
        expect(respond.statusCode).toBe(404);
    });

    it('Bills success: Return status 201', async () => {
        
        const respond = await request(productBaseURL).get('/');
       
        let data = JSON.parse(respond.text);
          console.log(data[0].paymentMethod);
          expect(data[0].paymentMethod).toBe("เงินสด");
    });

});
  