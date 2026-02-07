import { Routes, Route, Link } from 'react-router-dom'
import Start from './pages/start.jsx'
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path = "/" element = {
          <>
            <h1>Survive If You Can . . .</h1>
            <div className = "card">
              <Link to="/start">
                <button> Start Your Story (opens to a new page) </button>
              </Link>
            </div>
          </>
        }></Route>
        <Route path="/start" element={<Start />} />
      </Routes>
    </>
  )
}

export default App
