import React, { useState, useEffect } from 'react';
import WordList from './WordList';
import Navbar from './Navbar';
import { letterPoints } from '../letters/LetterPoints';

function App() {
  const [rows, setRows] = useState([
    { done: true, name: ['B', 'L', 'I', 'N', 'D'] },
    { done: false, name: ['B', 'E', 'L', 'O', 'W'] },
  ]);
  const [topScores, setTopScores] = useState([1, 2, 3, 4, 5]);
  const [score, setScore] = useState(0);
  let message = 'Test message ';
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
    //initializeGame(workGame);
  }

  function calculateScore() {
    // calculate score from 'rows'
    let score = 0;
    let j = 0;
    let i;
    while (j < rows.length && rows[j].done) {
      i = 0;
      while (i < 5) {
        // Calculate total value of word
        score =
          score +
          letterPoints.find(item => {
            return item.letter === rows[j].name[i];
          }).point;
        i++;
      }
      j++;
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
    const updatedRows = rows.map((item, index) =>
      index === id && !item.done ? { done: true, name: item.name } : { done: item.done, name: item.name }
    );
    setRows(updatedRows);
  }

  //if (topScores === undefined) return;
  return (
    <div className="app">
      <div className="container">
        <Navbar resetButton={resetButton} saveButton={saveButton} message={message} score={score} />
        <WordList rows={rows} setRows={setRows} markDone={markDone} />
        <div>Top Scores: {topScores[0]} {topScores[1]} {topScores[2]} {topScores[3]} {topScores[4]}</div>
      </div>
    </div>
  );
}

export default App;
