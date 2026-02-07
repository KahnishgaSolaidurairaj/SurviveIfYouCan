import Typewriter from "../components/Typewriter.jsx";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from "react"; // 1. Import useEffect and useRef
import "../App.css";

export default function Choice1(){
    const navigate = useNavigate();
    const [stage, setStage] = useState(1);
    const [textDone, setTextDone] = useState(false);
    
    const audioRef = useRef(null);

    useEffect(() => {
        // Stop any audio currently playing (cleanup from previous stage)
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        if (stage === 1) {
            audioRef.current = new Audio("/audios/haunted_ambience.mp3"); 
            audioRef.current.loop = true; 
            audioRef.current.volume = 0.5;
        } else {
          // DANA EDIT HERE!!!!
            audioRef.current = new Audio("/audios/witchLaughter.mp3");
            audioRef.current.loop = false; // Laughter plays once
            audioRef.current.volume = 0.8; // Make laughter louder/scarier
        }

        // Play the selected audio
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Audio play failed:", error);
            });
        }

        // Cleanup function: runs when component unmounts or stage changes
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, [stage]); 


    const story = {
        1: {
            text: "You have reached your first obstacle: A character is standing in front of you. How will you pass this obstacle?\n",
            background: { type: "image", src: "/images/ghost2.png" },
            choices: [
            { label: "A. Give them money", next: 2 },
            { label: "B. Scare them", next: 3 },
            { label: "C. Fight them", next: 4 },
            { label: "D. Ask nicely", next: 5 } ]
        },
        
        2: { 
            text: "They accept the money. You got lucky.", 
            background: {type: "video", src: "/videos/hallway.mp4"}
        },
        3: { 
            text: "The actor is scarier than you expected, but they applaud your effort and let you pass.", 
            background: {type: "video", src: "/videos/hallway.mp4"}
        },
        4: { 
            text: "They refuse to get physical and decide to let you pass.", 
            background: {type: "video", src: "/videos/hallway.mp4"}
        },
        5: { 
            text: "They are shocked you asked so politely. A kind soul is seen and they let you pass.",
            background: {type: "video", src: "/videos/hallway.mp4"}
        },
    }

    const current = story[stage];

    const continueClicked = async () => {

        navigate('/choice2')
    }

  return (
    <div className="scene choice-scene">
      {current.background?.type === "image" && (
        <img
          key={current.background.src} 
          className="scene-bg"
          src={current.background.src}
          alt="ghost"
        />
      )}

      {current.background?.type === "video" && (
        <video
          key={current.background.src} 
          className="scene-bg"
          src={current.background.src}
          autoPlay
          loop
          muted
          playsInline 
        />
      )}
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
                onClick={() => {
                  setTextDone(false)
                  setStage(choice.next)
                }}
              >
                {choice.label}
              </button>
            ))}
          </div>
        )}

        {stage !== 1 && textDone && (
            <div className="choices">
                 <button onClick={continueClicked} > Continue </button> 
            </div>
        )}
      </div>
    </div>
    );
}