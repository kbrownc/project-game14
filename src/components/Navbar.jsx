import React from 'react';

function Navbar({ resetButton, easyHard, setEasyHard, message, score }) {
  //console.log('**NavBar')
  
  // Set game as easy or hard
  function easyHardButton() {
    if (easyHard === 'easy') {
      setEasyHard('hard')
    } else {
      setEasyHard('easy')
    }
  }

  return (
    <div>
      <div className="navbar">
        <button onClick={() => resetButton()}>Reset</button>
        <span className="title">5 Letter Word Maze</span>
        <button onClick={() => easyHardButton()}>
        { easyHard === 'easy' ? 'Easy' : 'Hard'}</button>
      </div>
      <div className="navbar2">
        <span>{message} </span>
        <span className="navbar3">Score: {score}</span>
      </div>
    </div>
  );
}

export default Navbar;
