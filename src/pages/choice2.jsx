import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Typewriter from "../components/Typewriter.jsx";

export default function Choice2(){

    //correct choice, go to next page/question
    const leftDoorChosen = async () => {
        navigate('/choice3')
    }

    //wrong choice, go play mini game and restart
    const rightDoorChosen = async () => {
        navigate('/memoryGame')
    }

    const [stage, setStage] = useState(1);
    const [textDone, setTextDone] = useState(false);

    const navigate = useNavigate();

    const story = {
        1: {
            text: "You hear a noise from the left door.\n\nWhich door are you going through?",
            choices: [
            { label: "A. Left", next: 7 },
            { label: "B. Right", next: 8 }
            ]
        },

        7: {
            text: "Left is the correct choice. You move deeper into the haunted house.",
        },

        8: {
            text:
            "Wrong choice.\nYou are trapped and must complete a mini-game to escape.\n\n" +
            "(You manage to escape.)",
        },
    }

    const current = story[stage];

    useEffect(() => {
        if (stage === 8) {
            rightDoorChosen();
        }
    }, [stage]);


    const continueClicked = async () => {
        navigate('/choice2')
    }

    return(
        <div>
             {(stage === 1 || stage === 7) && (
             <Typewriter
                    key={stage}
                    text={current.text}
                    onComplete={() => setTextDone(true)}
            />  
             )}
            {textDone && (
                <div className="choices">
                    { stage === 1 &&
                        current.choices.map((choice, index) => (
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

                    {stage === 7 && textDone && (
                        <button
                            onClick={leftDoorChosen}
                        >
                            Continue
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}