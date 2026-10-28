import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import Hero from '../components/Hero'
import CartoonCard from '../components/CartoonCard'

export default function Home() {
  const [cartoons, setCartoons] = useState([])

  useEffect(() => {
    supabase.from('cartoons').select('*').order('created_at', { ascending: false })
      .then(({ data }) => setCartoons(data || []))
  }, [])

  if (cartoons.length === 0) return <p className="empty">Поки немає мультів. Додай перший в адмінці.</p>

  return (
    <main>
      <Hero cartoon={cartoons[0]} />
      <section className="section">
        <h2>Каталог</h2>
        <div className="grid">
          {cartoons.map((c) => <CartoonCard key={c.id} cartoon={c} />)}
        </div>
      </section>
    </main>
  )
}
