'use strict';
const server = require('../src/server');
const supertest = require('supertest');
const request = supertest(server.app);
const { db } = require('../src/models/index');
process.env.SECRET = "test";
let adminToken = null;

let users = {
    admin: { userName: 'admin', email: 'test', password: 'password' },
    teacher: { userName: 'teacher', email: 'test', password: 'password' },
    student: { userName: 'student', email: 'test', password: 'password' },
};

beforeAll(async () => {
    await db.sync();
});
afterAll(async () => {
    await db.drop();
});
Object.keys(users).forEach(element => {
    describe('classes route test', () => {

        it('classes route testing ', async () => {
            if (users[element].role === 'admin') {
                const response = await request.post('/signin').auth(users[element].userName, users[element].password);
                const userObject = response.body;
                expect(response.status).toBe(201);
                expect(userObject.token).toBeDefined();
                expect(userObject.id).toBeDefined();
                expect(userObject.userName).toEqual(users[element].username)
                adminToken = userObject.token;
            }
        });
            it(' add a new class', async () => {
                if (users[element].role === 'teacher' || users[element].role === 'admin') {

                let adminToken = userObject.token;
                const response = await request.post('/classes').send({
                    className: "test",
                    
                }).set('Authorization', `Bearer ${userToken}`);
                expect(response.status).toBe(201);
            }
            });
            it(' get all classes', async () => {
                if (users[element].role === 'student' || users[element].role === 'admin'|| users[element].role === 'teacher') {

                let userToken = adminToken;
                const response = await request.get('/classes').set('Authorization', `Bearer ${userToken}`);
                expect(response.status).toBe(200);
            }
            });
       
            it('get one class', async () => {
                if (users[element].role === 'student' || users[element].role === 'admin'|| users[element].role === 'teacher') {

                let userToken = adminToken;
                let classId = 1;
                const response = await request.get(`/classes/${classId}`).set('Authorization', `Bearer ${userToken}`);
                expect(response.status).toBe(200);
            }
            });
        
            it('update class', async () => {
                if ( users[element].role === 'admin'|| users[element].role === 'teacher') {

                let userToken = adminToken;
                let classId = 1;
                const response = await request.put(`/classes/${classId}`).send({
                    className: "test",


                }).set('Authorization', `Bearer ${userToken}`);
                expect(response.status).toBe(201);
            }
            });
        
            it('delete class', async () => {
                if( users[element].role === 'admin') {

                let userToken = adminToken;
                let classId = 1;
                const response = await request.delete(`/classes/${classId}`).set('Authorization', `Bearer ${userToken}`);
                expect(response.status).toBe(204);
            }
            });
      

    });

})
