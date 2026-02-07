import React, { useState, useEffect } from "react";
import "./MemoryGame.css"; 
import { useNavigate } from "react-router-dom";
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


    const shuffledColors = [...colors, ...colors].sort(() => Math.random() - 0.5);

    const [cards, setCards] = useState(
        shuffledColors.map((color, index) => ({
        color,
        id: index,
        flipped: false,
        matched: false,
        }))
    );

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

    useEffect(() => {
        if (cards.every(card => card.matched)) {
            navigate("/choice2");
        }
    }, [cards, navigate]); // run whenever cards change


    //reset cards if not a match
    const resetTurn = () => {
        setFirstCard(null);
        setSecondCard(null);
        setDisableAll(false);
    };

    return(
        <div>
            <div>
                <h1>Wrong Door! Complete game to proceed!</h1>
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
        </div> 
    );
}