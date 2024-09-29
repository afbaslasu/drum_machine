import React, { useState, useEffect } from "react";
import DrumPad from "./DrumPad";
import Controls from "./Controls";
import "../styles/DrumMachine.css";

const audioClips = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
];

function DrumMachine() {
  const [power, setPower] = useState(true);
  const [display, setDisplay] = useState("");
  const [currentPadBank, setCurrentPadBank] = useState(audioClips);
  const [volume, setVolume] = useState(0.3);
  const [currentBank, setCurrentBank] = useState("bankOne");

  const handleDisplay = (text) => {
    setDisplay(text);
  };

  const handlePower = () => {
    setPower(!power);
    setDisplay("");
  };

  const handleBankSwitch = () => {
    if (power) {
      setCurrentBank(currentBank === "bankOne" ? "bankTwo" : "bankOne");
      setCurrentPadBank(currentBank === "bankOne" ? bankTwo : audioClips);
      setDisplay(currentBank === "bankOne" ? "Smooth Piano Kit" : "Heater Kit");
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key.toUpperCase();
      const audioClip = currentPadBank.find((clip) => clip.keyTrigger === key);
      if (audioClip && power) {
        playAudio(audioClip.keyTrigger, audioClip.id);
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [currentPadBank, power]);

  const playAudio = (keyTrigger, clipId) => {
    const audio = document.getElementById(keyTrigger);
    audio.currentTime = 0;
    audio.volume = volume;
    audio.play();
    handleDisplay(clipId.replace(/-/g, " "));
  };

  return (
    <div className="wrapper">
      <div className="drum-machine" id="drum-machine">
        <h2 className="author-name">Design by Ismail Ibadehin</h2>
        <div className="pad-bank">
          {currentPadBank.map((clip) => (
            <DrumPad
              key={clip.id}
              clip={clip}
              power={power}
              playAudio={playAudio}
            />
          ))}
        </div>
        <Controls
          power={power}
          handlePower={handlePower}
          display={display}
          volume={volume}
          setVolume={setVolume}
          handleBankSwitch={handleBankSwitch}
          currentBank={currentBank}
        />
        <h3 className="accreditation">Credit: I am gratedful to theOdinProject & freeCodeCamp for the training</h3>
      </div>
    </div>
  );
}

export default DrumMachine;
