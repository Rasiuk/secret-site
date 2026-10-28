import { toEmbed } from '../supabase'

// Сам обирає плеєр: iframe для YouTube/Bunny, <video> для прямого файлу
export default function VideoPlayer({ url }) {
  const embed = toEmbed(url)
  if (embed) {
    return <iframe className="player" src={embed} allow="autoplay; fullscreen" allowFullScreen />
  }
  return <video className="player" src={url} controls playsInline />
}
