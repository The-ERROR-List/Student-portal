'use strict';
const server = require('../src/server');
const supertest = require('supertest');
const request = supertest(server.app);
const { db } = require('../src/models/index');
process.env.SECRET = "test";
let adminToken = null;

beforeAll(async () => {
    await db.sync();
});
afterAll(async () => {
    await db.drop();
});

describe('signup/admin', () => {

    it('should return a 201 response', async () => {
        const response = await request.post('/signup/admin').send({
            userName: 'admin',
            email: 'test',
            password: 'password',
            role: 'admin'
        });
        expect(response.status).toBe(201);
    });
});

let users = {
    admin: { userName: 'admin', email: 'test', password: 'password' },
    teacher: { userName: 'teacher', email: 'test', password: 'password' },
    student: { userName: 'student', email: 'test', password: 'password' },
};
Object.keys(users).forEach(element => {
    describe('sign up teacher or student after the admin signin ', () => {

        it('admin signs in', async () => {
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
        if (users[element].role === 'teacher') {
            it('should return a 201 response with creating a teacher using admin token', async () => {

                let userToken = adminToken;
                const response = await request.post('/signup/std-teacher').send({

                    userName: "ibrahimo",
                    email: "ibrafhiooom@gmail.com",
                    password: "12345678",
                    role: "teacher",
                    firstName: "ibr",
                    lastName: "lastName",
                    gender: "male",
                    nationality: "ionality",
                    department: "it"

                }).set('Authorization', `Bearer ${userToken}`);
                expect(response.status).toBe(201);
            })

        }
        if (users[element].role === 'student') {
            it('should return a 201 response with creating a student using admin token', async () => {
        // let Auth = await request.post('/signin').send(users.admin.userName, users.admin.password);

        console.log(adminToken);
        let userToken = adminToken;
        const response = await request.post('/signup/std-teacher').send({
            
                userName: "ibrahimo",
                email: "ibrafhiooom@gmail.com",
                password: "12345678",
                role: "student",
                firstName: "ibr",
                lastName: "lastName",
                gender: "male",
                nationality: "ionality",
                major: "it"
               
        }).set('Authorization', `Bearer ${userToken}`);
        expect(response.status).toBe(201);
    })
   
        }
        }); 
    });


