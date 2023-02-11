const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
    const allUsers = await User.find({}).populate('blogs')

    response.json(allUsers)
})

usersRouter.post('/', async (request, response) => {
    console.log(request.body);
    const { username, name, password } = request.body
    console.log(password);

    if (password === undefined || password.length < 3) {
        response.status(401).json({ error: 'invalid password' })
    } else {
        const saltRound = 10
        const passwordHash = await bcrypt.hash(password, saltRound)
        const newUser = new User({ username, name, passwordHash })

        const createdUser = await newUser.save()

        response.status(201).json(createdUser)
    }
})

module.exports = usersRouter