import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Typewriter from "../components/Typewriter.jsx";
import "../App.css";

export default function Choice3(){
    const [stage, setStage] = useState(1);
    const [textDone, setTextDone] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
    const screamAudio = new Audio("/audios/haunted_ambience.mp3")    
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


    const story = {
        1: {
            text:
            "You see your friend's scarf near the stairs.\n\n" +
            "Are you going up the stairs or down?",
            background: { type: "image", src: "/images/stairsQ.png" },
            choices: [
                { label: "A. Up", next: 2 },
                { label: "B. Down", next: 3 }
            ]
        },
        2: {
            text: "Nice job following the clues!",
            background: { type: "image", src: "/images/stairsResponse.png" },
        },
        3: {
            text: "Take a closer look at where the scarf is . . .",
            background: { type: "image", src: "/images/stairsResponse.png" },
            choices: [
                { label: "Go Back", next: 1 }
            ]
        },
    }

    const current = story[stage];
       
    const upStairsChosen = async () => {
        navigate('/jumpScare')
    }

    return(
        <div className="scene choice-scene">
            {current.background?.type === "image" && (
                <img
                    className="scene-bg"
                    src={current.background.src}
                    alt="ghost"
                />
            )}
        <div className="scene-content">
        <div>
             <Typewriter
                key={stage}
                text={current.text}
                onComplete={() => setTextDone(true)}
            />  
         {textDone && (
                <div className="choices">
                    { stage === 1 && current.choices.map((choice, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setTextDone(false);
                                setStage(choice.next);
                            }} >
                        {choice.label}
                        </button>
                    ))}

                    { stage === 3 && current.choices.map((choice, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setTextDone(false);
                                setStage(choice.next);
                            }} >
                            {choice.label}
                            </button>
                    ))}

                    {stage === 2 && textDone && (
                        <button onClick={upStairsChosen} > Continue </button>
                    )}
                </div>
            )}
        </div>
        </div>
        </div>
    )
}