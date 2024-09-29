import React from "react";
import "../styles/Controls.css";

function Controls({
  power,
  handlePower,
  display,
  volume,
  setVolume,
  handleBankSwitch,
  currentBank,
}) {
  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value));
  };

  return (
    <div className="controls-container">
      <div className="control">
        <p>Power</p>
        <div className="select" onClick={handlePower}>
          <div className={`inner ${power ? "power-on" : "power-off"}`} />
        </div>
      </div>
      <p id="display">{display}</p>
      <div className="volume-slider">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
      <div className="control">
        <p>Bank</p>
        <div className="select" onClick={handleBankSwitch}>
          <div
            className={`inner ${
              currentBank === "bankOne" ? "bank-one" : "bank-two"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

export default Controls;
