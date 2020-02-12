import express from 'express'
import playlistRouter from './playlist'
import userRouter from './user'
import authMiddleware from '~/server/middleware/auth'
import { searchTracks } from '~/server/services/deezer'

const router = express.Router({ mergeParams: true })

router.use('/playlists', authMiddleware, playlistRouter)
router.use('/user', userRouter)
router.get('/search', authMiddleware, async (req, res) => {
  const data = await searchTracks(req.query.query, req.query.page)
  return res.json(data)
})
export default router
