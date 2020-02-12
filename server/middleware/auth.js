import { User } from '~/server/models'
import jwt from 'jsonwebtoken'

export default async (req, res, next) => {
  const authorization = req.get('Authorization')
  if (!authorization) {
    return res.status(401).json({ error: 'no_authorization' })
  }

  try {
    const { id } = jwt.verify(authorization, process.env.SECRET)
    const user = await User.findByPk(id)
    if (!user) {
      return res.status(404).json({ error: 'not_found' })
    }
    req.user = user
    next()
  } catch (error) {
    return res.status(403).json({ error: 'wrong_authorization' })
  }
}
