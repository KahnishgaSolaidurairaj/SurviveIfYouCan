import Typewriter from "../components/Typewriter.jsx";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

export default function Choice1(){
    const navigate = useNavigate();
    const [stage, setStage] = useState(1);
    const [textDone, setTextDone] = useState(false);

    const story = {
        1: {
            text: "You have survived . . . .\n",
            choices: [
            { label: "Play Again?", next: 2 },
            { label: "Exit...", next: 3 }
            ]
        },
        
        2: { 
            text: "We shall do this over again."
        },
        3: { 
            text: "You can forget about this for now."
        },
    }

    const current = story[stage];

    const playAgainClicked = async () => {
        navigate('/start')
    }
  return (
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
            {textDone && (stage === 2) && (
            <button onClick={playAgainClicked}>
                Play Again
            </button>
            )}
            {textDone && (stage === 3) && (
            <button onClick={none}>
                You can close the tab now . . . Goodbye . . . 
            </button>
            )}
        </div>
    );
}