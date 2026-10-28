import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

// Завантажує файл у сховище (bucket) і повертає публічне посилання на нього
export async function uploadFile(bucket, file) {
  const name = `${Date.now()}-${file.name.replace(/[^\w.-]/g, '_')}`
  const { error } = await supabase.storage.from(bucket).upload(name, file)
  if (error) throw error
  return supabase.storage.from(bucket).getPublicUrl(name).data.publicUrl
}

// Якщо це YouTube або Bunny, повертає посилання для iframe.
// Якщо ні, повертає null, і тоді плеєр вважає, що це прямий mp4-файл.
export function toEmbed(url) {
  const yt = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/)
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`
  if (url.includes('mediadelivery.net')) {
    return url.replace('player.mediadelivery.net/play', 'iframe.mediadelivery.net/embed')
  }
  return null
}
