import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Typewriter from "../components/Typewriter.jsx";
import "../App.css";

export default function Choice4(){

    const [stage, setStage] = useState(1);
    const [textDone, setTextDone] = useState(false);

    const navigate = useNavigate();

    const story = {
       1: {
            text: "You see the exit.\n\nDo you leave the haunted house… or take one last gamble to find your friend?",
            background: { type: "image", src: "/images/lastDoor.png" },
            choices: [
            { label: "A. Exit the haunted house", next: 2 },
            { label: "B. Take the gamble", next: 4 }
            ]
        },

        2: {
            text:
            "You leave the haunted house alone.\n\n" +
            "Your friend was still inside.\n\n" +
            "You will always wonder what might have happened.",
            background: { type: "video", src: "/videos/shame.mp4" }
        },

        4: {
            text:
            "Behind the second door, you find your friend.\n\n" +
            "You have saved them. But you didnt do this all for the recognition.\n\n" +
            "It was for the friendship 🎉",
            background: { type: "video", src: "/videos/forest.mp4" }
        },
    }

    const current = story[stage];
    const continueClicked = async () => {
        navigate('/end')
    }

    return(
    <div className="scene choice-scene">
        {current.background?.type === "image" && (
        <img
          className="scene-bg"
          src={current.background.src}
          alt="ghost" />
      )}
      {current.background?.type === "video" && (
        <video
          className="scene-bg"
          src={current.background.src}
          autoPlay
          loop
          muted />
      )}
        <div className="scene-content">
        <div>
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
                    onClick={() => {
                    setTextDone(false);
                    setStage(choice.next);
                    }}
                >
                    {choice.label}
                </button>
                ))}
            </div>
            )}
            {textDone && (stage === 4 || stage === 2) && (
            <button onClick={continueClicked}> Continue </button>
            )}
        </div>
    </div>
    </div>
    )
}