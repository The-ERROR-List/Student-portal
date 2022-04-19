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
    describe('student route test', () => {

        it('student route testing ', async () => {
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
            it(' get all students', async () => {
                if (users[element].role === 'student' || users[element].role === 'admin'|| users[element].role === 'teacher') {

                let userToken = adminToken;
                const response = await request.get('/allstudents').set('Authorization', `Bearer ${userToken}`);
                expect(response.status).toBe(200);
            }
            });
       
            it('get one student', async () => {
                if (users[element].role === 'student' || users[element].role === 'admin'|| users[element].role === 'teacher') {

                let userToken = adminToken;
                let studentId = 1;
                const response = await request.get(`/student/${studentId}`).set('Authorization', `Bearer ${userToken}`);
                expect(response.status).toBe(200);
            }
            });
        
            it('update student', async () => {
                if ( users[element].role === 'admin'|| users[element].role === 'teacher') {

                let userToken = adminToken;
                let studentId = 1;
                const response = await request.put(`/student/${studentId}`).send({
                    className: "test",


                }).set('Authorization', `Bearer ${userToken}`);
                expect(response.status).toBe(201);
            }
            });
        
            it('delete student', async () => {
                if( users[element].role === 'admin') {

                let userToken = adminToken;
                let studentId = 1;
                const response = await request.delete(`/student/${studentId}`).set('Authorization', `Bearer ${userToken}`);
                expect(response.status).toBe(204);
            }
            });
      

    });

})
