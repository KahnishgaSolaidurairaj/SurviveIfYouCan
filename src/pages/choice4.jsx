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
            //background: { type: "images", src: "/images/ghost2.jpg" },
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
            choices: [{label: "start over", next: 0}]
        },

        4: {
            text:
            "Behind the second door, you find your friend.\n\n" +
            "You have saved them. But you didnt do this all for the recognition.\n\n" +
            "It was for the friendship 🎉",
            choices: [ {label: "start over", next: 0}]
        },
    }

    const current = story[stage];

    //Continue button will take them to the exit page 
    const continueClicked = async () => {
        navigate('/exit')
    }

    return(
        <div>
             {(stage === 1 || stage === 4) && (
            <Typewriter
                key={stage}
                text={current.text}
                onComplete={() => setTextDone(true)}
            />
            )}
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
            <button onClick={continueClicked}>
                Continue
            </button>
            )}
        </div>
    )
}