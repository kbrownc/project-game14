import React from 'react';

function Navbar({ resetButton, saveButton, message, score }) {
  return (
    <div>
      <div>
        <button onClick={() => resetButton()}>Reset</button>
        <span>5 Letter Word Maze</span>
        <button onClick={() => saveButton()}>Save</button>
      </div>
      <div>
        <span>{message}</span>
        <span>Score: {score}</span>
      </div>
    </div>
  );
}

export default Navbar;
