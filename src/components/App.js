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
  }, [rows]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY2, JSON.stringify(topScores));
  }, [topScores]);

  function resetButton() {
    localStorage.removeItem(LOCAL_STORAGE_KEY1);
    setRows([]);
    setMessage('');
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
    if (rows.length === 0) {
      setPos(letterPoints[Math.floor(Math.random() * 26)].letter);
      setPos5(Math.floor(Math.random() * 5));
    }
  }

  // Calculate total value of word
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
  function saveButton() {
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
          saveButton={saveButton}
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
