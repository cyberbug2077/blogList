const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const promiseArray = helper.initialBlogs.map(blog => {
    const blogObject = new Blog(blog)
    return blogObject.save()
  })
  await Promise.all(promiseArray)
})

test('blogs are return as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 10000)

afterAll(async () =>{
  await mongoose.connection.close()
})