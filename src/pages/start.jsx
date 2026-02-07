import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Typewriter from "../components/Typewriter"
import "../App.css"

function Start() {
  const navigate = useNavigate()
  const [textDone, setTextDone] = useState(false)

  useEffect(() => {
    const screamAudio = new Audio("/audios/scream.mp3")    
    screamAudio.volume = 0.6 
  
    // Play the audio
    screamAudio.play().catch((error) => {
      // This catches errors if the browser blocks autoplay
      console.log("Audio autoplay blocked:", error)
    })

    // Cleanup: Stop sound if user leaves page quickly
    return () => {
      screamAudio.pause()
      screamAudio.currentTime = 0
    }
  }, [])

  const introText =
    "The scream wasn't part of the tour.\n\n" +
    "Terrified, your friend bolted into the darkness of the Haunted House. \n\n" +
    "They left you.\n\n" +
    "You could hide... but you promised to stick together.\n\n" +
    "Can you surive this?."

  return (
    <div className="scene start-scene">
      <img
        className="scene-bg"
        src="/images/intro.jpg"
        alt="Haunted House"
      />
      <div className="scene-content">
        <Typewriter
          text={introText}
          onComplete={() => setTextDone(true)}
        />

        {textDone && (
          <button
            className="choice-btn"
            onClick={() => navigate("/choice1")}
          >
            Start your story →
          </button>
        )}
      </div>

    </div>
  )
}

export default Start