import { Link } from 'react-router-dom'

// Велика картка зверху головної: обкладинка на фоні, назва, опис, кнопка
export default function Hero({ cartoon }) {
  return (
    <section className="hero" style={{ '--cover': `url(${cartoon.cover_url})` }}>
      <div className="hero-text">
        <h1>{cartoon.title}</h1>
        <div className="tags">
          {cartoon.tags?.map((t) => <span key={t}>{t}</span>)}
        </div>
        <p>{cartoon.description}</p>
        <Link className="btn" to={`/cartoon/${cartoon.id}`}>Дивитися</Link>
      </div>
    </section>
  )
}
