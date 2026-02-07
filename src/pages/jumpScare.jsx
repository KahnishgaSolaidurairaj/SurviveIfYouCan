import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import "../App.css";

export default function Jumpscare() {
  const navigate = useNavigate();

    useEffect(() => {
    const screamAudio = new Audio("/audios/jumpScareScream.mp3")    
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

  return (
   
    <div>
        <video
        className="scene-bg"
        src="/videos/jumpScareVid.mp4" 
        autoPlay
        muted
        playsInline 
        onEnded={() => navigate('/afterJumpScare')}
      />
    </div>
  );
}