const request = require('supertest');

const server = 'http://localhost:3000';
describe('Route integration', () => {
  describe('/api/users/', () => {
    describe('POST', () => {
      it('responds with status code 200, application/json content type, and creates a new user in the database', () => {
        return request(server)
        .post('/api/users/')
        .query({userName: 'kobe'})
        .send({
          password: 'bryant',
          email: 'kobe@bryant.com',
          preferences: {
            Motivation: true,
            Milestones: true,
            Mindfulness: true,
          },
          zipCode: 824,
        })
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect((res) => {
          res.body.userName = 'kobe';
        })
      })
    })

    describe('GET', () => {
      it('responds with status code 200', () => {
        return request(server)
        .get('/api/users/')
        .query({userName : 'kobe'})
        .expect(200)});
      it('responds with user information in the response body', async () => {
        const response = await request(server)
          .get('/api/users/')
          .query({userName : 'kobe'});
        console.log('response body', response.body);
        expect(response.body.userName).toBe('kobe');
      })
    })

    describe('PATCH', () => {
      it('responds with status code 200 and updates the user\'s information', () => {
        return request(server)
        .patch('/api/users/')
        .query({ userName: 'kobe' })
        .send({ userName: 'frobe' })
        .expect(200)
        .expect((res) => {
          res.body.userName = 'frobe';
        })
      })
    })

    describe('DELETE', () => {
      it('responds with status code 200, application/json content type, response body has deleted username ', async() => {
        const response = await request(server)
        .delete('/api/users/')
        .query({userName : 'frobe'})
        .expect('Content-Type', /application\/json/)
        .expect(200);
        console.log('response body',response.body);
        expect(response.body.userName).toBe('frobe')
      })
    })
  })

  let postId;

  describe('/api/posts/', () => {
    

    describe('POST/DELETE', () => {
      it('creates a new post and responds with status code 200', async () => {
        const response = await request(server)
        .post('/api/posts')
        .send({
          userID: { _id: '64f7cc6070af1c6e0e841fb4' },
          preference: 'Motivation',
          image: null,
          description: 'DB Test new',
          hypes: 0,
          vibes: [],
        })
        expect(200)
        console.log('supertest create post body', response.body);
        expect(response.body.description).toBe('DB Test new');
        postId = response.body._id;
      })
      it('responds with status code 200 and response body returns deleted post', () => {
        console.log('postId', postId);
        return request(server)
          .delete(`/api/posts/${postId}`)
          .expect(200)
          .expect( res => {
            res.body.description = 'DB Test'
        })
      })
    })

    describe('GET', () => {
      it('should get all posts', async () => {
        const response = await request(server).get('/api/posts/')
        expect(200)
        expect(Array.isArray(response.body)).toBe(true);
        expect(typeof response.body[0]).toBe('object');
      })
    })
  })
}) 

