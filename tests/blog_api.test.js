const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
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

describe('Ex 4.10', () => {
  test('POST make increase blogs number by one', async () => {
    const response1 = await api.get('/api/blogs')
    const beforePost = response1.body.length
    const response3 = await api.post('/api/blogs').send( {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  }).expect(201)
    console.log(JSON.stringify(response3));
    const response2 = await api.get('/api/blogs')
    const afterPost = response2.body.length
    expect(afterPost-beforePost).toBe(1)
  })
})

describe('Ex 4.13: DELETE API', () => {
  test('delete can remove a blog', async () => {
    const response1 = await api.get('/api/blogs')
    const beforePost = response1.body.length

    const id = helper.initialBlogs[0]._id
    await api.delete(`/api/blogs/${id}`).expect(204)

    const response2 = await api.get('/api/blogs')
    const afterPost = response2.body.length

    expect(afterPost-beforePost).toBe(-1)
  })
})

describe('Ex 4.14: PUT API', () => {
  test('delete can remove a blog', async () => {
    const id = helper.initialBlogs[0]._id
    const response = await api.put(`/api/blogs/${id}`).send({
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,})

    expect(response.body.likes).toBe(5)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})