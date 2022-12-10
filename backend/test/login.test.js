const request = require('supertest');
const loginBaseURL = 'http://localhost:5500/api/auth/';

describe('Login & Logout Backend', () => {

    it('Login Failed: Invalid Username: Return status 404', async () => {
        const respond = await request(loginBaseURL).post('/login').send({
            username: "Bright", password: "demo12345"
        });
        expect(respond.statusCode).toBe(404);
    });

    it('Login Failed: Invalid Password: Return status 401', async () => {
        const respond = await request(loginBaseURL).post('/login').send({
            username: "sutima.phe@dome.tu.ac.th", password: "demo"
        });
        expect(respond.statusCode).toBe(401);
    });

    it('Login Failed: Invalid Username and Password: Return status 404', async () => {
        const respond = await request(loginBaseURL).post('/login').send({
            username: "Bright", password: "demo"
        });
        expect(respond.statusCode).toBe(404);
    });

    it('Login Failed: Username is empty: Return status 400', async () => {
        const respond = await request(loginBaseURL).post('/login').send({
            password: "demo12345"
        });
        expect(respond.statusCode).toBe(400);
    });

    it('Login Failed: Password is empty: Return status 400', async () => {
        const respond = await request(loginBaseURL).post('/login').send({
            username: "sutima.phe@dome.tu.ac.th"
        });
        expect(respond.statusCode).toBe(400);
    });

    it('Login Failed: Username and Password are empty: Return status 400', async () => {
        const respond = await request(loginBaseURL).post('/login').send({
            
        });
        expect(respond.statusCode).toBe(400);
    });

    // it('Logout Success: return status 200', async () => {     
    //     respond = await request(loginBaseURL).post('/login').send({
    //         username: "sutima.phe@dome.tu.ac.th", password: "demo12345"
    //     });
    //     // console.log(respond);
        
    //     let data = JSON.parse(respond.text);
    //     expect(data.message).toBe('เข้าสู่ระบบสำเร็จ');
    // });

    it('Login Success: return status 200', async () => {
        const respond = await request(loginBaseURL).post('/login').send({
            username: "sutima.phe@dome.tu.ac.th", password: "demo12345"
        });
        let data = JSON.parse(respond.text);
        expect(data.message).toBe('เข้าสู่ระบบสำเร็จ');
    });
});