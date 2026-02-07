import { useEffect, useState } from "react";

function Typewriter({ text, speed = 40, onComplete }) {
  const [displayed, setDisplayed] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => prev + text[index]);
        setIndex(index + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      onComplete && onComplete();
    }
  }, [index, text, speed, onComplete]);

  return <p className="typewriter">{displayed}</p>;
}

export default Typewriter;
