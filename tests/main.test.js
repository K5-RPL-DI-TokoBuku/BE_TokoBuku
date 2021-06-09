const request = require('supertest');
const app = require('../app')

describe("Post /auth",() =>{
    test('Login User with email and password!', (done)=>{
        request(app)
            .post('/auth/login')
            .send({
                email: 'ichlasul0899@gmail.com',
                password: 'adadeh12345'
            })
            .end(function(err, res) {
                if (err) throw err;
                expect(res.status).toBe(200)
                expect(res.body).toBeInstanceOf(Object)
                expect(res.body).toHaveProperty("message")
                expect(res.body).toHaveProperty("user")
                expect(res.body).toHaveProperty("ID")
                expect(res.body).toHaveProperty("token")
                done();
            });
    })
    test('Register User with email,name,nik and password!', (done)=>{
        request(app)
            .post('/auth/register')
            .send({
                email: 'nabilaPutri@gmail.com',
                password: 'adadeh12345',
                name: 'Nabila Putri',
                nik: '1301170769'
            })
            .end(function(err, res) {
                if (err) throw err;
                expect(res.status).toBe(201)
                expect(res.body).toBeInstanceOf(Object)
                expect(res.body).toHaveProperty("message", "Register User Success")
                expect(res.body).toHaveProperty("regis_user")
                expect(res.body['regis_user']).toHaveProperty("_id")
                expect(res.body['regis_user']).toHaveProperty("email")
                expect(res.body['regis_user']).toHaveProperty("password")
                expect(res.body['regis_user']).toHaveProperty("name")
                expect(res.body['regis_user']).toHaveProperty("nik")
                done();
            });
    })
})