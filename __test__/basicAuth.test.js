'use strict';
const basicAuth = require('../src/middlewares/basic');
const { db, userModel } = require('../src/models/index');

let userInfo = {
    admin: { userName: 'admin-basic', email: 'expamle@gmail.com', password: 'password', role: 'admin' },
};
beforeAll(async () => {
    await db.sync();
});
afterAll(async () => {
    await db.close();
}
);

describe('Basic Auth', () => {
    const req = {};
  const res = {
    status: jest.fn(() => res),
    send: jest.fn(() => res)
  }
  const next = jest.fn();
  describe('basic authentication', () => {

    it('fails a login for a user (admin) with the incorrect basic credentials', () => {
      req.headers = {
        authorization: 'Basic YWRtaW46Zm9v',
      };

      return basicAuth(req, res, next)
        .then(() => {
          expect(res.status).toHaveBeenCalledWith(403);
        });

    }); 
    it('logs in an admin user with the right credentials', () => {
        // Change the request to match this test case
        req.headers = {
          authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',
        };
  
        return basicAuth(req, res, next).then(() => {
  
            expect(next).not.toHaveBeenCalledWith();
          });
  
      }); 
    });

});

