import React, { useState, useEffect } from "react";
import "./memoryGame.css"; 
import { useNavigate } from "react-router-dom";
import Typewriter from "../components/Typewriter.jsx";
//example of how to import sound effect you want to use
// import mySoundFile from "../sounds/welcome.mp3"; // make sure this path is correct

const colors = ["red","orange", "yellow", "green", "blue", "purple"];

export default function MemoryGame(){
    const navigate = useNavigate();
    const story = {
        1: {
            text: "You chose the wrong door! Complete the game to proceed!",
            choices: [
            { next: 2 },
            ]
        },

        2: {
            text: "Game Completed! Go back and choose again",
        }
    }

    const shuffledColors = [...colors, ...colors].sort(() => Math.random() - 0.5);

    const [cards, setCards] = useState(
        shuffledColors.map((color, index) => ({
        color,
        id: index,
        flipped: false,
        matched: false,
        }))
    );
    
    const [stage, setStage] = useState(1);
    const [textDone, setTextDone] = useState(false);

    const current = story[stage];

    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [disableAll, setDisableAll] = useState(false);

    const handleClick = (card) => {
        if (disableAll || card.flipped || card.matched) return;

        const newCards = cards.map((c) =>
            c.id === card.id ? { ...c, flipped: true } : c
        );
        setCards(newCards);

        if (!firstCard) {
            setFirstCard(card);
        } else if (!secondCard) {
            setSecondCard(card);
            setDisableAll(true);
        }
    };

      useEffect(() => {
        if (firstCard && secondCard) {
            if (firstCard.color === secondCard.color) {
                setCards((prev) =>
                    prev.map((c) =>
                        c.color === firstCard.color ? { ...c, matched: true } : c
                    )
                );

                resetTurn();
            } else {
                setTimeout(() => {
                    setCards((prev) =>
                        prev.map((c) =>
                        c.id === firstCard.id || c.id === secondCard.id
                            ? { ...c, flipped: false }
                            : c
                        )
                    );
                resetTurn();
                }, 1000); 
            }
        }
    }, [firstCard, secondCard]);

    const continueClicked = async () => {
        navigate('/choice2')
    }

    const resetTurn = () => {
        setFirstCard(null);
        setSecondCard(null);
        setDisableAll(false);
    };

   const allMatched = cards.every(card => card.matched);

    useEffect(() => {
        if (stage === 1 && allMatched) {
            setStage(2);
            setTextDone(false);          
        }                              
    }, [allMatched, stage]);

    return(
        <div className="scene choice-scene">
        <div>
            <div>
                {(stage === 1 || stage === 2) && (
                    <Typewriter
                            key={stage}
                            text={current.text}
                            onComplete={() => setTextDone(true)}
                    />  
                )}
            </div>     
            <div className="memory-game">
                {cards.map((card) => (
                    <div key={card.id} className="card-wrapper" onClick={() => handleClick(card)}>
                        <div
                            className="card"
                            style={{ backgroundColor: card.flipped || card.matched ? card.color : "gray" }}
                        ></div>
                    </div>
                ))}
            </div>
                {textDone && (
                    <div className="choices">
                        {stage === 2 && textDone && (
                            <button
                                onClick={ continueClicked}
                            >
                                ← go back
                            </button>
                        )}
                    </div>
                )}
        </div> 
        </div>
    );
}