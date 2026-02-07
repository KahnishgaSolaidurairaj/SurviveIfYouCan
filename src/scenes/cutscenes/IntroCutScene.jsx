import { useEffect } from "react"

export default function IntroCutScene({ onFinish }) {
  const handleFinish = () => {
    if (onFinish) onFinish()
  }
  useEffect(() => {
      const hauntedAudio = new Audio("/audios/haunted_ambience.mp3")    
      hauntedAudio.volume = 0.6 
    
      // Play the audio
      hauntedAudio.play().catch((error) => {
        // This catches errors if the browser blocks autoplay
        console.log("Audio autoplay blocked:", error)
      })

      // Cleanup: Stop sound if user leaves page quickly
      return () => {
        hauntedAudio.pause()
        hauntedAudio.currentTime = 0
      }
    }, [])

  return (
    <div
      className="fullscreen"
      onClick={handleFinish} // click anywhere to skip
      style={{ cursor: "pointer" }}
    >
      <video
        src="/videos/haunted_house_intro.mp4"
        autoPlay
        muted
        onEnded={handleFinish}
        className="video-bg"
      />

      <div className="overlay-text">
        <h1>Survive if you can . . .</h1>
      </div>
    </div>
  )
}