import express from 'express'
import {
  validate,
  userSignInValidator,
  userSignUpValidator
} from './../validators'
import { userViews } from '~/server/views'
import authMiddleware from '~/server/middleware/auth'

import { User } from '~/server/models'
import jwt from 'jsonwebtoken'

const router = express.Router()

const generateAuthToken = user => {
  return jwt.sign({ id: user.id }, process.env.SECRET)
}

router.get('/profile', authMiddleware, async (req, res) => {
  return res.json(userViews.defaultView(req.user))
})

router.post('/signup', userSignInValidator(), validate, async (req, res) => {
  try {
    const { username, password } = req.body
    const user = User.build({ username })
    await user.setPassword(password)
    await user.save()
    const auth = generateAuthToken(user)
    return res.json({ ...userViews.defaultView(user), auth })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
})

router.post('/signin', userSignUpValidator(), validate, async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ where: { username: username } })
    if (!user) {
      throw new Error('invalid_credentials')
    }
    const passwordCorrect = await user.validatePassword(password)
    if (!passwordCorrect) {
      throw new Error('invalid_credentials')
    }
    const auth = generateAuthToken(user)
    return res.json({ ...userViews.defaultView(user), auth })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
})
export default router
