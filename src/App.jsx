import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Start from './pages/start.jsx'
import IntroCutScene from './scenes/cutscenes/IntroCutScene'
import './App.css'
import Typewriter from "./components/Typewriter";

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
      </Routes>
    </>
  )
}

export default App
