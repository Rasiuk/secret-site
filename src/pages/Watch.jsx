import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../supabase'
import VideoPlayer from '../components/VideoPlayer'

// Сторінка перегляду однієї серії
export default function Watch() {
  const { id } = useParams()
  const [episode, setEpisode] = useState(null)

  useEffect(() => {
    supabase.from('episodes').select('*').eq('id', id).single().then(({ data }) => setEpisode(data))
  }, [id])

  if (!episode) return <p className="empty">Завантаження...</p>

  return (
    <main className="section">
      <VideoPlayer url={episode.video_url} />
      <h1>Серія {episode.number}{episode.title ? `. ${episode.title}` : ''}</h1>
      <Link to={`/cartoon/${episode.cartoon_id}`}>Усі серії</Link>
    </main>
  )
}
