import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react'
import Typewriter from "../components/Typewriter.jsx";

export default function AfterJumpScare() {
    const [stage, setStage] = useState(1);
    const [textDone, setTextDone] = useState(false);

    const navigate = useNavigate();

    const story = {
        1: {
            text: "Did that scare you ;) hehehehe. Continue forward if you dare...",
            background: {type: "image", src: "/images/scare.jpg" }
        },
    }

    const current = story[stage];

    const continueForward = async () => {
        navigate('/choice4')
    }

    return (
        <div>
            <div className="scene choice-scene">
                {current.background?.type === "image" && (
                <img
                    className="scene-bg"
                    src={current.background.src}
                    alt="ghost"
                />
                )}
                <div className="scene-content">
                    <Typewriter
                        key={stage}
                        text={current.text}
                        onComplete={() => setTextDone(true)}
                    />  
                    {textDone && (
                    <button onClick={continueForward}> Continue </button>
                    )}
                </div>
            </div>
        </div>
    );
}