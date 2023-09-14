import React from 'react';

function Navbar({ resetButton, saveButton, easyHardButton, message, score }) {
  return (
    <div>
      <div className="navbar">
        <button onClick={() => resetButton()}>Reset</button>
        <span>5 Letter Word Maze</span>
        <button onClick={() => saveButton()}>Save Score</button>
        <button onClick={() => easyHardButton()}>Easy/Hard</button>
      </div>
      <div className="navbar2">
        <span>{message} </span>
        <span>Score: {score}</span>
      </div>
    </div>
  );
}

export default Navbar;
