import React, { useState, useEffect } from "react";
import "../styles/DrumPad.css";

function DrumPad({ clip, power, playAudio }) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    if (power) {
      playAudio(clip.keyTrigger, clip.id);
      setActive(true);
    }
  };

  useEffect(() => {
    if (active) {
      setTimeout(() => setActive(false), 100);
    }
  }, [active]);

  return (
    <div
      className={`drum-pad ${active ? "active" : ""}`}
      id={clip.id}
      onClick={handleClick}
    >
      <audio className="clip" id={clip.keyTrigger} src={clip.url} />
      {clip.keyTrigger}
    </div>
  );
}

export default DrumPad;
