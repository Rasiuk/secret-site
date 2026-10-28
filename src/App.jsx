import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Cartoon from './pages/Cartoon'
import Watch from './pages/Watch'
import Admin from './pages/Admin'

// Тут перелік усіх сторінок сайту
export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cartoon/:id" element={<Cartoon />} />
        <Route path="/watch/:id" element={<Watch />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  )
}
