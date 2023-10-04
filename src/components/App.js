import React, { useState, useEffect } from 'react';
import WordList from './WordList';
import Navbar from './Navbar';
import { letterPoints } from '../letters/LetterPoints';
import { wordDictionary } from '../letters/WordDictionary';

function App() {
  const [rows, setRows] = useState([]);
  const newLetterInitialize = {newLetter0:'',newLetter1:'',newLetter2:'',newLetter3:'',newLetter4:''};
  const [newLetter, setNewLetter] = useState(newLetterInitialize);
  const [topScores, setTopScores] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [easyHard, setEasyHard] = useState('easy');
  const [randomPosition, setRandomPosition] = useState(calcPosition);
  const [randomLetter, setRandomLetter] = useState(verifyLetter);
  const LOCAL_STORAGE_KEY1 = 'game14-rows';
  const LOCAL_STORAGE_KEY2 = 'game14-topScores';

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY1));
    if (savedItems) setRows(savedItems);
  }, []);

  useEffect(() => {
    const savedTopScores = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY2));
    if (savedTopScores) setTopScores(savedTopScores);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY1, JSON.stringify(rows));
    setScore(calculateScore());
    if (rows.length === 5) {
      saveScore();
    }
  }, [rows]); 

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY2, JSON.stringify(topScores));
  }, [topScores]);

  function calcPosition() {
    let initRandomPosition =  Math.floor(Math.random() * 5)
    return initRandomPosition
  };

  function resetButton() {
    localStorage.removeItem(LOCAL_STORAGE_KEY1);
    setRows([]);
    setMessage('');
    const tempRandomPosition = Math.floor(Math.random() * 5);
    const tempRandomLetter = verifyLetter(tempRandomPosition);
    if (tempRandomPosition === 0) {
      setNewLetter(prevLetters => {
        return {
          ...prevLetters,
          newLetter0: tempRandomLetter,
          newLetter1: '',
          newLetter2: '',
          newLetter3: '',
          newLetter4: '',
        };
      });
    } else if (tempRandomPosition === 1) {
      setNewLetter(prevLetters => {
        return {
          ...prevLetters,
          newLetter0: '',
          newLetter1: tempRandomLetter,
          newLetter2: '',
          newLetter3: '',
          newLetter4: '',
        };
      });
    } else if (tempRandomPosition === 2) {
      setNewLetter(prevLetters => {
        return {
          ...prevLetters,
          newLetter0: '',
          newLetter1: '',
          newLetter2: tempRandomLetter,
          newLetter3: '',
          newLetter4: '',
        };
      });
    } else if (tempRandomPosition === 3) {
      setNewLetter(prevLetters => {
        return {
          ...prevLetters,
          newLetter0: '',
          newLetter1: '',
          newLetter2: '',
          newLetter3: tempRandomLetter,
          newLetter4: '',
        };
      });
    } else {
      setNewLetter(prevLetters => {
        return {
          ...prevLetters,
          newLetter0: '',
          newLetter1: '',
          newLetter2: '',
          newLetter3: '',
          newLetter4: tempRandomLetter,
        };
      });
    }
    setRandomLetter(tempRandomLetter);
    setRandomPosition(tempRandomPosition);
  }

  // Verify that there are 20+ words with the randomLetter
  function verify(tempRandomLetter,tempRandomPosition) {
    let verifyNumber = wordDictionary.filter(item => {
      return item[tempRandomPosition] === tempRandomLetter.toLowerCase();
    }).length;
    return verifyNumber
  };

  function verifyLetter(tempRandomPosition) {
    let tempRandomLetter = '';
    let verifyNumber = 0;
    do {
      tempRandomLetter = letterPoints[Math.floor(Math.random() * 26)].letter;
      if (typeof tempRandomPosition !== 'undefined') {
        verifyNumber = verify(tempRandomLetter,tempRandomPosition)
      } else {
        verifyNumber = verify(tempRandomLetter,randomPosition)
      }
    } while (verifyNumber < 20);
    return tempRandomLetter;
  }

  // Calculate total value of words
  function calculateScore() {
    let score = 0;
    for (let j = 0; j < rows.length; j++) {
      for (let i = 0; i < 5; i++) {
        score =
          score +
          letterPoints.find(item => {
            return item.letter === rows[j].name[i].toUpperCase();
          }).point;
      }
    }
    return score;
  }

  // Sort topScores and take top 5 scores
  function saveScore() {
    let workTopScores = JSON.parse(JSON.stringify(topScores));
    setScore(calculateScore());
    workTopScores.push(calculateScore());
    workTopScores.sort((a, b) => b - a);
    workTopScores.splice(5);
    setTopScores(workTopScores);
  }

  // About (a;ert) button - how to play
  function alertButton() {
    let alertMessage =
      'The App will generate a random letter in a random position on the 1st row ' +
      'and before displaying, will ensure there is at least 20 valid words that fit in that constraint. ' +
      'Player completes their word and selects the ‘ADD’ button. The word is verified to be 1) a valid ' +
      'word 2) not a duplicate 3) has 1 and only 1 duplicate letter with the word above it.\nPlayer ' +
      'continues to enter words…. The app keeping a running total of your score. At the end, the ' +
      'score is saved If it’s one of the top 5 highest scores.\n‘Easy’ or ‘Hard’ difficulty levels ' +
      'are available. ‘Easy’ supplies a random letter only for the 1st word. ‘Hard’ supplies a ' +
      'random letter for every row.';
    alert(alertMessage);
  }

  return (
    <div className="app">
      <div className="container">
        <Navbar
          resetButton={resetButton}
          easyHard={easyHard}
          setEasyHard={setEasyHard}
          message={message}
          setMessage={setMessage}
          score={score}
          rows={rows}
        />
        <WordList
          rows={rows}
          randomLetter={randomLetter}
          setRandomLetter={setRandomLetter}
          randomPosition={randomPosition}
          setRandomPosition={setRandomPosition}
          setRows={setRows}
          newLetter={newLetter}
          setNewLetter={setNewLetter}
          setMessage={setMessage}
          easyHard={easyHard}
          verifyLetter={verifyLetter}
        />
        <div className="topscore">
          Top Scores: {topScores[0]} {topScores[1]} {topScores[2]} {topScores[3]} {topScores[4]}
        </div>
        <button className="alertButton" onClick={() => alertButton()}>
          About
        </button>
      </div>
    </div>
  );
}

export default App;
