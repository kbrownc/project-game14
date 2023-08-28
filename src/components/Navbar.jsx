import React from 'react';

function Navbar({ resetButton, saveButton, message, score }) {
  return (
    <div>
      <button onClick={() => resetButton()}>Reset</button>
      <h2>5 Letter Word Maze</h2>
      <button onClick={() => saveButton()}>Save</button>
      <div>
        <span>{message}</span>
        <span>Score: {score}</span>
      </div>
    </div>
  );
}

export default Navbar;
