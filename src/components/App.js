import React, { useState, useRef, useEffect } from 'react';
import WordList from './WordList';
import Navbar from './Navbar';
import { v4 as uuidv4 } from 'uuid';
import { letterPoints } from '../letters/LetterPoints';

function App() {
  const [rows, setRows] = useState([
    { done: true, name: ['B', 'L', 'I', 'N', 'D'] },
    { done: false, name: ['B', 'E', 'L', 'O', 'W'] },
  ]);
  const [topScores, setTopScores] = useState([1, 2, 3, 4, 5]);
  const [score, setScore] = useState(0);
  let message = 'Test message ';
  const [rowName, setRowName] = useState('');
  const [editId, setEditId] = useState(0);
  const rowNameRef = useRef();
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

  function markDone(id) {
    const updatedRows = rows.map((item, index) =>
      index === id && !item.done ? { done: true, name: item.name } : { done: item.done, name: item.name }
    );
    setRows(updatedRows);
  }

  function addRow(e) {
    e.preventDefault();
    if (editId) {
      const editRow = rows.find(row => row.id === editId);
      const updatedRows = rows.map(t =>
        t.id === editRow.id
          ? { id: editRow.id, name: rowName, complete: editRow.complete, created: editRow.created }
          : { id: t.id, name: t.name, complete: t.complete, created: t.created }
      );
      setRows(updatedRows);
      setEditId(0);
      setRowName('');
      return;
    }
    const date = new Date();
    const name = rowNameRef.current.value;
    if (name === '') return;
    setRows(prev => {
      return [...prev, { id: uuidv4(), name: name, complete: false, created: date.toDateString() }];
    });
    rowNameRef.current.value = null;
    setRowName('');
  }

  if (topScores === undefined) return;
  return (
    <div className="app">
      <div className="container">
        <Navbar resetButton={resetButton} saveButton={saveButton} message={message} score={score} />

        <form className="todoForm" onSubmit={addRow}>
          <input ref={rowNameRef} type="text" value={rowName} onChange={e => setRowName(e.target.value)} />
          <button type="submit">{editId ? 'edit' : '+'}</button>
        </form>

        <WordList rows={rows} markDone={markDone} topScores={topScores} />
      </div>
    </div>
  );
}

export default App;
