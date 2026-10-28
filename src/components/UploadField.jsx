import { useState } from 'react'
import { uploadFile } from '../supabase'

// Одне поле для двох способів: вставити посилання АБО вибрати файл.
// Файл завантажується у сховище, а посилання підставляється саме.
export default function UploadField({ label, bucket, accept, value, onChange }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function pickFile(e) {
    const file = e.target.files[0]
    if (!file) return
    setBusy(true)
    setError('')
    try {
      onChange(await uploadFile(bucket, file))
    } catch (err) {
      setError('Не вдалося завантажити: ' + err.message)
    }
    setBusy(false)
  }

  return (
    <label className="field">
      {label}
      <input type="text" placeholder="Вставте посилання..." value={value} onChange={(e) => onChange(e.target.value)} />
      <input type="file" accept={accept} onChange={pickFile} />
      {busy && <small>Завантажується, зачекайте...</small>}
      {error && <small className="error">{error}</small>}
    </label>
  )
}
