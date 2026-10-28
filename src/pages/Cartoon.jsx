import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../supabase'

// Сторінка мульта: опис і список серій
export default function Cartoon() {
  const { id } = useParams()
  const [cartoon, setCartoon] = useState(null)
  const [episodes, setEpisodes] = useState([])

  useEffect(() => {
    supabase.from('cartoons').select('*').eq('id', id).single().then(({ data }) => setCartoon(data))
    supabase.from('episodes').select('*').eq('cartoon_id', id).order('number')
      .then(({ data }) => setEpisodes(data || []))
  }, [id])

  if (!cartoon) return <p className="empty">Завантаження...</p>

  return (
    <main className="section">
      <h1>{cartoon.title}</h1>
      <p className="lead">{cartoon.description}</p>
      <h2>Серії</h2>
      {episodes.length === 0 && <p>Серій поки немає.</p>}
      <ul className="episodes">
        {episodes.map((ep) => (
          <li key={ep.id}>
            <Link to={`/watch/${ep.id}`}>Серія {ep.number}{ep.title ? `. ${ep.title}` : ''}</Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
