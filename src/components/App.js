import React, { useState, useEffect } from 'react';
import WordList from './WordList';
import Navbar from './Navbar';
import { letterPoints } from '../letters/LetterPoints';

function App() {
  //console.log('*App')
  const [rows, setRows] = useState([]);
  const [topScores, setTopScores] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [easyHard, setEasyHard] = useState('Easy');
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
  }, [rows]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY2, JSON.stringify(topScores));
  }, [topScores]);

  function resetButton() {
    localStorage.removeItem(LOCAL_STORAGE_KEY1);
    setRows([]);
    setMessage('');
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
        <WordList rows={rows} setRows={setRows} setMessage={setMessage} easyHard={easyHard} />
        <div>
          Top Scores: {topScores[0]} {topScores[1]} {topScores[2]} {topScores[3]} {topScores[4]}
        </div>
      </div>
    </div>
  );
}

export default App;
