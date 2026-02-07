import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Start from './pages/start.jsx'
import IntroCutScene from './scenes/cutscenes/IntroCutScene'
import './App.css'
import Typewriter from "./components/Typewriter";
import Choice1 from './pages/choice1.jsx'
import Choice2 from './pages/choice2.jsx'
import Choice3 from './pages/choice3.jsx'
import Choice4 from './pages/choice4.jsx'
import MemoryGame from './minigames/memoryGame.jsx'
import JumpScare from './pages/jumpScare.jsx'

function App() {
  const navigate = useNavigate()

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <IntroCutScene onFinish={() => navigate('/start')} />
          }
        />
        <Route path="/start" element={<Start />} />
        <Route path="/choice1" element={<Choice1 />} />
        <Route path="/choice2" element={<Choice2 />} />
        <Route path="/choice3" element={<Choice3 />} />
        <Route path="/choice4" element={<Choice4 />} />
        <Route path="/memoryGame" element={<MemoryGame />} />
                <Route path="/memoryGame" element={<MemoryGame />} />
      </Routes>
    </>
  )
}

export default App