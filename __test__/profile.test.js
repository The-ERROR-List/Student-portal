'use strict';
const server = require('../src/server');
const supertest = require('supertest');
const request = supertest(server.app);
const { db } = require('../src/models/index');
beforeAll(async () => {
    await db.sync();
});
afterAll(async () => {
    await db.drop();
});


describe ('reset password test', () => {
    it('reset password', async () => {
        const response = await request.get('/reset-password/newpassword').send({
            email: "test",
            password: "password",
        });
        expect(response.status).toBe(200);
    });
});
        