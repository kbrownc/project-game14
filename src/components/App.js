import React, { useState, useEffect } from 'react';
import WordList from './WordList';
import Navbar from './Navbar';
import { letterPoints } from '../letters/LetterPoints';

function App() {
  //console.log('*App')
  const [rows, setRows] = useState([]);
  const newLetterInitialize = {
    newLetter0: '',
    newLetter1: '',
    newLetter2: '',
    newLetter3: '',
    newLetter4: ''
  }
  const [newLetter, setNewLetter] = useState(newLetterInitialize);
  const [topScores, setTopScores] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [easyHard, setEasyHard] = useState('Easy');
  const [pos, setPos] = useState(letterPoints[Math.floor(Math.random() * 26)].letter);
  const [pos5, setPos5] = useState(Math.floor(Math.random() * 5));
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
        saveScore()
      }
  }, [rows]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY2, JSON.stringify(topScores));
  }, [topScores]);

  function resetButton() {
    localStorage.removeItem(LOCAL_STORAGE_KEY1);
    setRows([]);
    setMessage('');
    if (rows.length === 0) {
      let tempPos = letterPoints[Math.floor(Math.random() * 26)].letter;
      let tempPos5 =Math.floor(Math.random() * 5);
      if (tempPos5 === 0) {
        setNewLetter(prevLetters => {
          return { ...prevLetters, newLetter0: tempPos, newLetter1: '', newLetter2: '',
            newLetter3: '', newLetter4: '' };
        });
      } else if (tempPos5 === 1) {
        setNewLetter(prevLetters => {
          return { ...prevLetters, newLetter0: '', newLetter1: tempPos, newLetter2: '', 
            newLetter3: '', newLetter4: '' };
        });
      } else if (tempPos5 === 2) {
        setNewLetter(prevLetters => {
          return { ...prevLetters, newLetter0: '', newLetter1: '', newLetter2: tempPos, 
            newLetter3: '', newLetter4: '' };
        });
      } else if (tempPos5 === 3) {
        setNewLetter(prevLetters => {
          return { ...prevLetters, newLetter0: '', newLetter1: '', newLetter2: '', 
            newLetter3: tempPos, newLetter4: '' };
        });
      } else {
        setNewLetter(prevLetters => {
          return { ...prevLetters, newLetter0: '', newLetter1: '', newLetter2: '', 
            newLetter3: '', newLetter4: tempPos };
        });
      }
      setPos(tempPos)
      setPos5(tempPos5)
    } else {
      setNewLetter(prevLetters => {
        return {
          ...prevLetters,
          newLetter0: '',
          newLetter1: '',
          newLetter2: '',
          newLetter3: '',
          newLetter4: '',
        };
      });
    }
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

  return (
    <div className="app">
      <div className="container">
        <Navbar
          resetButton={resetButton}
          easyHard={easyHard}
          setEasyHard={setEasyHard}
          message={message}
          score={score}
        />
        <WordList
          rows={rows}
          pos={pos}
          setPos={setPos}
          pos5={pos5}
          setPos5={setPos5}
          setRows={setRows}
          newLetter={newLetter}
          setNewLetter={setNewLetter}
          setMessage={setMessage}
          easyHard={easyHard}
        />
        <div>
          Top Scores: {topScores[0]} {topScores[1]} {topScores[2]} {topScores[3]} {topScores[4]}
        </div>
      </div>
    </div>
  );
}

export default App;
