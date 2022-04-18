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
    describe('courses route test', () => {

        it('courses route testing ', async () => {
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
            it(' add a new course', async () => {
                if (users[element].role === 'teacher' || users[element].role === 'admin') {

                let adminToken = userObject.token;
                const response = await request.post('/courses').send({
                    courseName: "courseName",
                    courseGrade: 222,
                }).set('Authorization', `Bearer ${userToken}`);
                expect(response.status).toBe(201);
            }
            });
            it(' get all courses', async () => {
                if (users[element].role === 'student' || users[element].role === 'admin'|| users[element].role === 'teacher') {

                let userToken = adminToken;
                const response = await request.get('/courses').set('Authorization', `Bearer ${userToken}`);
                expect(response.status).toBe(200);
            }
            });
       
            it('get one course', async () => {
                if (users[element].role === 'student' || users[element].role === 'admin'|| users[element].role === 'teacher') {

                let userToken = adminToken;
                let courseId = 1;
                const response = await request.get(`/courses/${courseId}`).set('Authorization', `Bearer ${userToken}`);
                expect(response.status).toBe(200);
            }
            });
        
            it('update course', async () => {
                if ( users[element].role === 'admin'|| users[element].role === 'teacher') {

                let userToken = adminToken;
                let courseId = 1;
                const response = await request.put(`/courses/${courseId}`).send({
                    courseName: "newCourseName",
                    courseGrade: 11,

                }).set('Authorization', `Bearer ${userToken}`);
                expect(response.status).toBe(201);
            }
            });
        
            it('delete course', async () => {
                if( users[element].role === 'admin') {

                let userToken = adminToken;
                let courseId = 1;
                const response = await request.delete(`/courses/${courseId}`).set('Authorization', `Bearer ${userToken}`);
                expect(response.status).toBe(204);
            }
            });
      

    });

})
