import React, { useState, useEffect } from 'react';
import WordList from './WordList';
import Navbar from './Navbar';
import { letterPoints } from '../letters/LetterPoints';

function App() {
  const [rows, setRows] = useState([]);
  //const [rows, setRows] = useState([{ done: false, name: ['b', 'l', 'e', 'n', 'd'] }]);
  const [topScores, setTopScores] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
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
    let workRows = JSON.parse(JSON.stringify(rows));
    if (workRows.length === 0) {
      workRows = [{ done: false, name: ['', '', '', '', ''] }];
    }
    workRows[0].name[Math.floor(Math.random() * 5)] = letterPoints[Math.floor(Math.random() * 26)].letter;
    setRows(workRows);
    setMessage('');
  }

  // Calculate total value of word
  function calculateScore() {
    let score = 0;
    for (let j = 0; j < rows.length && rows[j].done; j++) {
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

  // Mark word as complete and lock from updates
  function markDone(id) {
    let workRows = JSON.parse(JSON.stringify(rows));
    let workMessage = '';
    for (let i = 0; i < workRows.length; i++) {
      if (i === id) {
        if (!workRows[i].done) {
          workRows[i].done = true;
        } else {
          workMessage = 'word already marked as frozen';
        }
      }
    }
    setMessage(workMessage);
    setRows(workRows);
  }

  return (
    <div className="app">
      <div className="container">
        <Navbar resetButton={resetButton} saveButton={saveButton} message={message} score={score} />
        <WordList rows={rows} setRows={setRows} markDone={markDone} setMessage={setMessage} />
        <div>
          Top Scores: {topScores[0]} {topScores[1]} {topScores[2]} {topScores[3]} {topScores[4]}
        </div>
      </div>
    </div>
  );
}

export default App;
