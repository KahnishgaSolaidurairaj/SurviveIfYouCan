import { Routes, Route, Link } from 'react-router-dom'
import Start from './pages/start.jsx'
import './App.css'
import Choice2 from './pages/choice2.jsx'
import Choice3 from './pages/choice3.jsx'
import MemoryGame from './minigames/memoryGame.jsx'

function App() {
  return (
    <>
      <Routes>
       <Route path="/" element={<Choice2 />} />
        <Route path="/start" element={<Start />} />
        <Route path="/choice2" element={<Choice2 />} />
        <Route path="/choice3" element={<Choice3 />} />
        <Route path="/memoryGame" element={<MemoryGame />} />
      </Routes>
    </>
  )
}

export default App
