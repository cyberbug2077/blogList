const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../models/blog')

const api = supertest(app)

test('blogs are return as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 10000)

afterAll(async () =>{
  await mongoose.connection.close()
})