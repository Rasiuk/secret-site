import { Link } from 'react-router-dom'

// Маленька картка мульта в сітці каталогу
export default function CartoonCard({ cartoon }) {
  return (
    <Link to={`/cartoon/${cartoon.id}`} className="card">
      <img src={cartoon.cover_url} alt={cartoon.title} />
      <span>{cartoon.title}</span>
    </Link>
  )
}
