const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  console.log('initializing');
  await Blog.deleteMany({})
  const promiseArray = helper.initialBlogs.map(blog => {
    const blogObject = new Blog(blog)
    return blogObject.save()
  })
  await Promise.all(promiseArray)
  console.log('ready to test');
}, 100000)

describe('Ex 4.8: test GET', () => {
  test('blogs are return as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('returns the correct amount of blog', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('Ex 4.9', () => {
  test('identifier property is named id', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    expect(blog.id).toBeDefined()
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})