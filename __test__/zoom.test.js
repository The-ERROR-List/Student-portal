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
};

beforeAll(async () => {
    await db.sync();
});
afterAll(async () => {
    await db.drop();
});
Object.keys(users).forEach(element => {
    describe('classes route test', () => {

        it('generating a token ', async () => {
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
                const response = await request.get('/createMeeting')
            .set('Authorization', `Bearer ${userToken}`);
                expect(response.status).toBe(200);
            }
            });
        });

    });