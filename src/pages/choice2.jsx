import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Choice2(){

    const navigate = useNavigate();

    //correct choice, go to next page/question
    const leftDoorChosen = async () => {
        navigate('/choice3')
    }

    //wrong choice, go play mini game and restart
    const rightDoorChosen = async () => {
        navigate('/memoryGame')
    }

    return(
        <div>
            <h1>Uh oh! What was that noise? Choose a door to find escape!</h1>
            {/* represent door 1 */}
                <button
                    onClick = {leftDoorChosen}
                >
                Left Door
                </button>
          

            {/* represent door 2 */}
                <button
                    onClick = {rightDoorChosen}
                >
                Right Door
                </button>
           
        </div>
    )
}