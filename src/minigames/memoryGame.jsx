import React, { useState, useEffect } from "react";
import "./memoryGame.css"; 
import { useNavigate } from "react-router-dom";
import Typewriter from "../components/Typewriter.jsx";
//example of how to import sound effect you want to use
// import mySoundFile from "../sounds/welcome.mp3"; // make sure this path is correct

const colors = ["red","orange", "yellow", "green", "blue", "purple"];

export default function MemoryGame(){
    const navigate = useNavigate();

    //for sound effect
    // useEffect(() => {
    //     const audio = new Audio(mySoundFile);
    //     audio.play();
    // }, []);
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

    //keep track of cards chosen
    const [firstCard, setFirstCard] = useState(null);
    const [secondCard, setSecondCard] = useState(null);
    const [disableAll, setDisableAll] = useState(false);

    //when a card is clicked, handle
    const handleClick = (card) => {
        if (disableAll || card.flipped || card.matched) return;

        //checking which card was flipped
        const newCards = cards.map((c) =>
            c.id === card.id ? { ...c, flipped: true } : c
        );
        setCards(newCards);

        //if not first card set
        if (!firstCard) {
            setFirstCard(card);
        } 
        //if second and not first card, set
        else if (!secondCard) {
            setSecondCard(card);
            setDisableAll(true);
        }
    };

      //check if the two cards are a match
      useEffect(() => {
        if (firstCard && secondCard) {
            //if the cards are a match
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
                }, 1000); //flip back after 1s
            }
        }
    }, [firstCard, secondCard]);

    //navigate back once all cards matched
    const continueClicked = async () => {
        navigate('/choice2')
    }

    //reset cards if not a match
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
                        {/* { stage === 1 &&
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
                        ))} */}

                        {stage === 2 && textDone && (
                            <button
                                onClick={ continueClicked}
                            >
                                Continue
                            </button>
                        )}
                    </div>
                )}
        </div> 
    );
}