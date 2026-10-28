import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import UploadField from '../components/UploadField'

// Вхід в адмінку: логін і пароль адміна з Supabase
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function submit(e) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError('Невірна пошта або пароль')
  }

  return (
    <main className="section narrow">
      <h1>Вхід для адміна</h1>
      <form onSubmit={submit} className="form">
        <input type="email" placeholder="Пошта" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn">Увійти</button>
        {error && <small className="error">{error}</small>}
      </form>
    </main>
  )
}

// Форма додавання мульта (з обкладинкою)
function CartoonForm({ onSaved }) {
  const empty = { title: '', description: '', tags: '', cover_url: '' }
  const [form, setForm] = useState(empty)
  const set = (key) => (value) => setForm({ ...form, [key]: value })

  async function submit(e) {
    e.preventDefault()
    const tags = form.tags.split(',').map((t) => t.trim()).filter(Boolean)
    await supabase.from('cartoons').insert({ ...form, tags })
    setForm(empty)
    onSaved()
  }

  return (
    <form onSubmit={submit} className="form">
      <h2>Новий мульт</h2>
      <input placeholder="Назва" required value={form.title} onChange={(e) => set('title')(e.target.value)} />
      <textarea placeholder="Опис" value={form.description} onChange={(e) => set('description')(e.target.value)} />
      <input placeholder="Теги через кому: Комедія, Ситком" value={form.tags} onChange={(e) => set('tags')(e.target.value)} />
      <UploadField label="Обкладинка" bucket="covers" accept="image/*" value={form.cover_url} onChange={set('cover_url')} />
      <button className="btn">Додати мульт</button>
    </form>
  )
}

// Форма додавання серії (з відео: посилання або файл)
function EpisodeForm({ cartoons, onSaved }) {
  const empty = { cartoon_id: '', number: 1, title: '', video_url: '' }
  const [form, setForm] = useState(empty)
  const set = (key) => (value) => setForm({ ...form, [key]: value })

  async function submit(e) {
    e.preventDefault()
    await supabase.from('episodes').insert(form)
    setForm({ ...empty, cartoon_id: form.cartoon_id, number: Number(form.number) + 1 })
    onSaved()
  }

  return (
    <form onSubmit={submit} className="form">
      <h2>Нова серія</h2>
      <select required value={form.cartoon_id} onChange={(e) => set('cartoon_id')(e.target.value)}>
        <option value="">Оберіть мульт</option>
        {cartoons.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
      </select>
      <input type="number" min="1" value={form.number} onChange={(e) => set('number')(e.target.value)} />
      <input placeholder="Назва серії (необов'язково)" value={form.title} onChange={(e) => set('title')(e.target.value)} />
      <UploadField label="Відео (YouTube, Bunny або mp4)" bucket="videos" accept="video/*" value={form.video_url} onChange={set('video_url')} />
      <button className="btn" disabled={!form.video_url}>Додати серію</button>
    </form>
  )
}

export default function Admin() {
  const [session, setSession] = useState(undefined)
  const [cartoons, setCartoons] = useState([])

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => data.subscription.unsubscribe()
  }, [])

  const load = () => supabase.from('cartoons').select('*').order('created_at', { ascending: false })
    .then(({ data }) => setCartoons(data || []))
  useEffect(() => { if (session) load() }, [session])

  async function remove(id) {
    if (!confirm('Видалити мульт разом з усіма серіями?')) return
    await supabase.from('cartoons').delete().eq('id', id)
    load()
  }

  if (session === undefined) return null
  if (!session) return <Login />

  return (
    <main className="section admin">
      <CartoonForm onSaved={load} />
      <EpisodeForm cartoons={cartoons} onSaved={load} />
      <div>
        <h2>Мульти</h2>
        <ul className="episodes">
          {cartoons.map((c) => (
            <li key={c.id}>{c.title} <button className="link" onClick={() => remove(c.id)}>Видалити</button></li>
          ))}
        </ul>
        <button className="link" onClick={() => supabase.auth.signOut()}>Вийти</button>
      </div>
    </main>
  )
}
