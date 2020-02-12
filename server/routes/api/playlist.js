import express from 'express'
import { PlayList, Track, PlaylistTracks } from '~/server/models'
import { playListView, trackViews } from '~/server/views'
import { paginateQuery } from '~/server/utils'
import { getSong } from '~/server/services/deezer'
import {
  validate,
  createPlaylistValidator,
  addTrackToPlayListValidator
} from './../validators'

const router = express.Router()

const createOrGetTrack = async ({ track }) => {
  const trackInstance = await Track.findOne({ where: { deezerId: track } })
  if (!trackInstance) {
    const deezerData = await getSong(track)
    return Track.create({ deezerData, deezerId: deezerData.id })
  }
  return trackInstance
}

const associateTrackToPlayList = async (palyListInstance, track) => {
  const trackInstance = await createOrGetTrack(track)
  await PlaylistTracks.findOrCreate({
    where: { playListId: palyListInstance.id, trackId: trackInstance.id }
  })
  return trackInstance
}

router.get('/', async (req, res, next) => {
  const paginated = await paginateQuery(req.query, PlayList, {
    where: { userId: req.user.id }
  })
  paginated.data = paginated.data.map(p => playListView.defaultView(p))
  return res.json(paginated)
})

router.post('/', createPlaylistValidator(), validate, async (req, res) => {
  try {
    const { name, song } = req.body
    const playList = await PlayList.create({ name, userId: req.user.id })
    if (song) {
      await associateTrackToPlayList(playList, song)
    }
    return res.status(201).json(playListView.defaultView(playList))
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const playList = await PlayList.findOne({
      where: { id: req.params.id, userId: req.user.id },
      include: [
        {
          model: Track,
          as: 'tracks'
        }
      ]
    })
    if (!playList) {
      return res.status(404).json({ error: 'not_found' })
    }

    return res.json(playListView.defaultView(playList))
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})
router.post(
  '/:id',
  addTrackToPlayListValidator(),
  validate,
  async (req, res) => {
    try {
      const playList = await PlayList.findOne({
        where: { id: req.params.id, userId: req.user.id }
      })
      if (!playList) {
        return res.status(404).json({ error: 'not_found' })
      }
      const { tracks } = req.body
      const trackInstances = await Promise.all(
        tracks.map(t => associateTrackToPlayList(playList, t))
      )
      return res.json(trackInstances.map(t => trackViews.defaultView(t)))
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
)

export default router
