import { defaultView as defaultViewTrack } from './tracks'
export const defaultView = playList => {
  const viewResponse = {
    name: playList.name,
    createdAt: playList.createdAt,
    id: playList.id
  }
  if (playList.tracks) {
    viewResponse.tracks = playList.tracks.map(t => defaultViewTrack(t))
  }
  return viewResponse
}
