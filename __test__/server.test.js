'use strict';
const server = require('../src/server');
const supertest = require('supertest');
const request = supertest(server.app);

describe ('Server', () => {
    it('should return a 200 response',async () => {
       const response= await request.get('/');
        expect(response.status).toBe(200);
    });
    it('should return a 404 response for bad route',async () => {
        const response= await request.get('/notfound');
        expect(response.status).toBe(404);
    });
    it ('should return a 200 response for bad method',async () => {
        const response= await request.post('/');
        expect(response.status).toBe(404);
    });
    
});

