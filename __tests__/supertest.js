const request = require('supertest');

const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('/api/users/', () => {
    describe('GET', () => {
      it('responds with status code 200', () => {
        return request(server)
        .get('/api/users/')
        .query({userName : 'Bryan'})
        .expect(200)});
    })
  })
}) 