const supertest = require('supertest');

const server = require('../src/server/server');

describe('Testing server code', () => {
  test('GET / , Server should send a response', async () => {
    const res = await supertest(server).get('/');
    expect(res.statusCode).toBe(200);
  });
});
