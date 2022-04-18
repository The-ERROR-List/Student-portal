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
    describe('teacher route test', () => {

        it('teacher route testing ', async () => {
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
            it(' get all teacher', async () => {
                if (users[element].role === 'student' || users[element].role === 'admin'|| users[element].role === 'teacher') {

                let userToken = adminToken;
                const response = await request.get('/allteachers').set('Authorization', `Bearer ${userToken}`);
                expect(response.status).toBe(200);
            }
            });
       
            it('get one teacher', async () => {
                if (users[element].role === 'student' || users[element].role === 'admin'|| users[element].role === 'teacher') {

                let userToken = adminToken;
                let teacherId = 1;
                const response = await request.get(`/teacher/${teacherId}`).set('Authorization', `Bearer ${userToken}`);
                expect(response.status).toBe(200);
            }
            });
        
            it('update teacher', async () => {
                if ( users[element].role === 'admin'|| users[element].role === 'teacher') {

                let userToken = adminToken;
                let teacherId = 1;
                const response = await request.put(`/teacher/${teacherId}`).send({
                    className: "test",


                }).set('Authorization', `Bearer ${userToken}`);
                expect(response.status).toBe(201);
            }
            });
        
            it('delete teacher', async () => {
                if( users[element].role === 'admin') {

                let userToken = adminToken;
                let teacherId = 1;
                const response = await request.delete(`/teacher/${teacherId}`).set('Authorization', `Bearer ${userToken}`);
                expect(response.status).toBe(204);
            }
            });
      

    });

})
