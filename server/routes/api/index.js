import express from 'express'
import playlistRouter from './playlist'
import userRouter from './user'
import authMiddlewarwe from '~/server/middleware/auth'

const router = express.Router({ mergeParams: true })

router.use('/playlists', authMiddlewarwe, playlistRouter)
router.use('/user', userRouter)

export default router
