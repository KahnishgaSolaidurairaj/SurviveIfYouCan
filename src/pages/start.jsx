import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Typewriter from "../components/Typewriter"
import "../App.css"

function Start() {
  const navigate = useNavigate()
  const [textDone, setTextDone] = useState(false)

  const introText =
    "Your friends took you to a Haunted House, but they got scared and ran ahead of you.\n\n" +
    "Effectively ditching you.\n\n" +
    "But you are a good friend and will find them before leaving the haunted house.\n\n" +
    "The door slammed shut behind you.\n\n" +
    "Now you're alone."

  return (
    <div className="scene start-scene">

      {/* Background image */}
      <img
        className="scene-bg"
        src="/images/intro.jpg"
        alt="Haunted House"
      />

      {/* Overlay content */}
      <div className="scene-content">
        <Typewriter
          text={introText}
          onComplete={() => setTextDone(true)}
        />

        {textDone && (
          <button
            className="choice-btn"
            onClick={() => navigate("/choice2")}
          >
            Start your story →
          </button>
        )}
      </div>

    </div>
  )
}

export default Start
