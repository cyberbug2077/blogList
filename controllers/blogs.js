const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const [firstUser] = await User.find({})
  const blog = new Blog({
    ...request.body,
    user: firstUser.id
  })
  const createdBlog = await (await blog.save()).populate('user')

  response.status(201).json(createdBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const result = await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })

  response.json(updatedBlog)
})

module.exports = blogsRouter