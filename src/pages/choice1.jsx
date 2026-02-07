import Typewriter from "../components/Typewriter.jsx";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

export default function Choice1(){
    const navigate = useNavigate();
    const [stage, setStage] = useState(1);
    const [textDone, setTextDone] = useState(false);

    const story = {
        1: {
            text: "You have reached your first obstacle: A character is standing in front of you. How will you pass this obstacle?\n",
            background: { type: "images", src: "/images/ghost2.jpg" },
            choices: [
            { label: "A. Give them money", next: 2 },
            { label: "B. Scare them", next: 3 },
            { label: "C. Fight them", next: 4 },
            { label: "D. Ask nicely", next: 5 } ]
        },
        
        2: { 
            text: "They accept the money. You got lucky.", 
            background: {type: "videos", src: "/videos/hallway.mp4"}
        },
        3: { 
            text: "The actor is scarier than you expected, but they applaud your effort and let you pass.", 
            background: {type: "videos", src: "/videos/hallway.mp4"}
        },
        4: { 
            text: "They refuse to get physical and decide to let you pass.", 
            background: {type: "videos", src: "/videos/hallway.mp4"}
        },
        5: { 
            text: "They are shocked you asked so politely. A kind soul is seen and they let you pass.",
            background: {type: "videos", src: "/videos/hallway.mp4"}
        },
    }

    const current = story[stage];

    const continueClicked = async () => {
        navigate('/choice2')
    }
  return (
    <div className="scene choice-scene">

      {/* Background */}
      {current.background?.type === "image" && (
        <img
          className="scene-bg"
          src={current.background.src}
          alt=""
        />
      )}

      {current.background?.type === "video" && (
        <video
          className="scene-bg"
          src={current.background.src}
          autoPlay
          loop
          muted
        />
      )}

      {/* Overlay content */}
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
            <button onClick={continueClicked} > Continue </button>  )}
            </div>
        </div>
    );
}