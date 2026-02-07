import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Typewriter from "../components/Typewriter"
import "../App.css"

export default function EndScreen() {
  const navigate = useNavigate()
  const [stage, setStage] = useState(1)
  const [textDone, setTextDone] = useState(false)

  const story = {
    1: {
      text: "You have survived . . . \n\nThe spirits return to the shadows, watching you leave.",
      choices: [
        { label: "Play Again?", action: "restart" },
        { label: "Exit...", action: "exit" },
      ],
    },
    2: {
      text: "You can close the tab now . . . \n\nGoodbye.",
    },
  }

  const current = story[stage]

  const handleChoice = (action) => {
    if (action === "restart") {
      navigate("/")
    } else if (action === "exit") {
      setTextDone(false)
      setStage(2) 
    }
  }

  return (
    <div className="scene end-scene">      
      <video
        className="scene-bg"
        src="/videos/ending_clown.mp4" 
        autoPlay
        loop       
        muted
        playsInline 
      />

      <div className="scene-content">
        <Typewriter
          key={stage} 
          text={current.text}
          onComplete={() => setTextDone(true)}
        />

        {textDone && stage === 1 && (
          <div className="choices">
            {current.choices.map((choice, index) => (
              <button
                key={index}
                className="choice-btn"
                onClick={() => handleChoice(choice.action)}
              >
                {choice.label}
              </button>
            ))}
          </div>
        )}

        {textDone && stage === 2 && (
             <div className="choices">
                 <p style={{marginTop: '20px', color: '#666'}}>( End of Demo )</p>
             </div>
        )}
      </div>
    </div>
  )
}