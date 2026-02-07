import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Typewriter from "../components/Typewriter.jsx";
import "../App.css";

export default function Choice2(){

    useEffect(() => {
        const screamAudio = new Audio("/audios/leftRoomNoise.mp3")    
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
            { id: "left", label: "LEFT", next: 7, img: "/images/door_left.png" },
            { id: "right", label: "RIGHT", next: 8, img: "/images/door_right.png" }
            ]
        },

        7: {
            text: "Left is the correct choice. You move deeper into the haunted house.",
            background: { type: "video", src: "/videos/door_opening.mp4" },
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

    useEffect(() => {
        if (stage === 7) {
            const leftDoorAudio = new Audio("/audios/creakyDoor.mp3");
            leftDoorAudio.volume = 0.6;

            leftDoorAudio.play().catch(err => {
                console.log("Left door audio blocked:", err);
            });

            return () => {
                leftDoorAudio.pause();
                leftDoorAudio.currentTime = 0;
            };
        }
    }, [stage]);
    
    const continueClicked = async () => {
        navigate('/choice2')
    }

    return(
        <div className="scene choice-scene">
            {current.background?.type === "video" && (
            <video
          className="scene-bg"
          src={current.background.src}
          autoPlay
          loop
          muted />
      )}
        <div>
             {(stage === 1) && (
             <Typewriter
                    key={stage}
                    text={current.text}
                    onComplete={() => setTextDone(true)}
            />  
             )}
             {(stage === 7) && (
                <div className="scene-content">
                <Typewriter
                    key={stage}
                    text={current.text}
                    onComplete={() => setTextDone(true)}
            />
            {stage === 7 && textDone && (
                        <button onClick={leftDoorChosen} > Continue </button>
                    )}
            </div>
             )}
            {textDone && (
                <div className="door-container">
                    { stage === 1 &&
                        current.choices.map((choice, index) => (
                            <button
                                key={index}
                                className="door-btn"
                                onClick={() => {
                                    setTextDone(false);
                                    setStage(choice.next);
                                }}
                                >
                                {/* The Image */}
                                <img 
                                    src={choice.img} 
                                    alt={choice.label} 
                                    className="door-img" 
                                />
                                <span className="door-label">{choice.label}</span>
                            </button>
                    ))}
                </div>
            )}
        </div>
        </div>
    )
}