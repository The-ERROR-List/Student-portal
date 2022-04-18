'use strict';

process.env.SECRET = "test";

const middleware = require('../src/middlewares/bearer');
const { db, user } = require('../src/models/index');
const jwt = require('jsonwebtoken')

let userInfo = {
  admin: { username: 'admin', password: 'password' },
};

beforeAll(async () => {
  await db.sync();
  
});
afterAll(async () => {
  await db.drop();

});

describe('Auth Middleware', () => {
  const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res)
  }
  const next = jest.fn();

  describe('user authentication', () => {

    it('fails a login for a user (admin) with an incorrect token', () => {

      req.headers = {
        authorization: 'Bearer thisisabadtoken',
      };

      return middleware(req, res, next)
        .then(() => {
          expect(next).not.toHaveBeenCalled();
          expect(res.status).toHaveBeenCalledWith(401);
        });

    });
})
});