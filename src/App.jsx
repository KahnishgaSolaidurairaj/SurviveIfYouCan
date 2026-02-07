import { useState } from "react";
import Typewriter from "./components/Typewriter";
import "./App.css";

const story = {
  0: {
    text: "Survive if you can . . .",
    choices: [
      { label: "Start Your Story", next: 20 }
    ]
  },
  20: {
    text: "Your friends took you to a Haunted house but they got scared and ran ahead of you. Effectively ditching you. But you are a good friend and will find them before leaving the haunted house.",
    choices: [ {label: "Continue", next: 1} ]
  },
  1: {
    text:
      "You have reached your first obstacle: A character is standing in front of you. How will you pass this obstacle?\n",
    choices: [
      { label: "A. Give them money", next: 2 },
      { label: "B. Scare them", next: 3 },
      { label: "C. Fight them", next: 4 },
      { label: "D. Ask nicely", next: 5 }
    ]
  },

  2: {
    text: "They accept the money. You got lucky.",
    choices: [{ label: "Continue", next: 6 }]
  },

  3: {
    text: "The actor is scarier than you expected, but they applaud your effort and let you pass.",
    choices: [{ label: "Continue", next: 6 }]
  },

  4: {
    text: "They refuse to get physical and decide to let you pass.",
    choices: [{ label: "Continue", next: 6 }]
  },

  5: {
    text: "They are shocked you asked so politely. A kind soul is seen and they let you pass.",
    choices: [{ label: "Continue", next: 6 }]
  },

  6: {
    text:
      "You hear a noise from the left door.\n\nWhich door are you going through?",
    choices: [
      { label: "A. Left", next: 7 },
      { label: "B. Right", next: 8 }
    ]
  },

  7: {
    text: "Left is the correct choice. You move deeper into the haunted house.",
    choices: [{ label: "Continue", next: 9 }]
  },

  8: {
    text:
      "Wrong choice.\nYou are trapped and must complete a mini-game to escape.\n\n" +
      "(You manage to escape.)",
    choices: [{ label: "Return to the doors", next: 6 }]
  },

  9: {
    text:
      "You see your friend's scarf near the stairs (going up).\n\n" +
      "Are you going up the stairs or down?",
    choices: [
      { label: "A. Up", next: 14 },
      { label: "B. Down", next: 15 }
    ]
  },

  14: {
    text: "Nice job following the clues!",
    choices: [{ label: "Continue", next: 10 }]
  },
  15: {
    text: "Take a closer look at where the scarf is . . .",
    choices: [{ label: "Go Back", next: 9 }]
  },

  10: {
    text: "A ghost suddenly appears in front of you.\n\nDid you jump a little ;)",
    choices: [{ label: "Continue", next: 11 }]
  },

  11: {
    text:
      "You see the exit.\n\n" +
      "Do you leave the haunted house… or take one last gamble to find your friend?",
    choices: [
      { label: "A. Exit the haunted house", next: 12 },
      { label: "B. Take the gamble", next: 13 }
    ]
  },

  12: {
    text:
      "You leave the haunted house alone.\n\n" +
      "Your friend was still inside.\n\n" +
      "You will always wonder what might have happened.",
    choices: [{label: "start over", next: 0}]
  },

  13: {
    text:
      "Behind the second door, you find your friend.\n\n" +
      "You have saved them. But you didnt do this all for the recognition.\n\n" +
      "It was for the friendship 🎉",
    choices: [ {label: "start over", next: 0}]
  }
};

function App() {
  const [stage, setStage] = useState(0);
  const [textDone, setTextDone] = useState(false);

  const current = story[stage];

  return (
    <div className="app">
      <Typewriter
        key={stage}
        text={current.text}
        onComplete={() => setTextDone(true)}
      />

      {textDone && (
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
    </div>
  );
}

export default App;
