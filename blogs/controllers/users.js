const bcrypt = require('bcrypt')
const User = require('../models/user')
const usersRouter = require('express').Router()

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body
  console.log(username, password, name)

  if (password.length < 3) {
    return response
      .status(401)
      .json({ error: 'invalid length, credentials should be a minimum of three letters'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  response.json(savedUser)
})

module.exports = usersRouter