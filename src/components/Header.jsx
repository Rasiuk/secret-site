import { Link } from 'react-router-dom'

// Встав сюди посилання на свою банку Monobank
const SUPPORT_URL = 'https://send.monobank.ua/jar/ТВІЙ_КОД'

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">Секретний сайт</Link>
      <nav>
        <Link to="/">Головна</Link>
        <Link to="/admin">Адмінка</Link>
      </nav>
      <a className="btn" href={SUPPORT_URL} target="_blank" rel="noreferrer">Підтримати</a>
    </header>
  )
}
