import React, { useState, useRef, useEffect } from 'react';
import WordList from './WordList';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [rows, setRows] = useState([]);
  const [rowName, setRowName] = useState('');
  const [editId, setEditId] = useState(0);
  const [viewAll, setViewAll] = useState(false);
  const rowNameRef = useRef();
  const LOCAL_STORAGE_KEY = 'game14-rows';

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (savedItems) setRows(savedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(rows));
  }, [rows]);

  function markComplete(id) {
    const date = new Date();
    const updatedRows = rows.map(t =>
      t.id === id
        ? {
            id: t.id,
            name: t.name,
            complete: !t.complete,
            created: t.created,
            dateCompleted: date.toDateString(),
          }
        : { id: t.id, name: t.name, complete: t.complete, created: t.created, dateCompleted: t.dateCompleted }
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

  return (
    <div className="app">
      <div className="container">
        <h1>5 Letter Words Maze</h1>
        <form className="todoForm" onSubmit={addRow}>
          <input ref={rowNameRef} type="text" value={rowName} onChange={e => setRowName(e.target.value)} />
          <button type="submit">{editId ? 'edit' : '+'}</button>
        </form>
        <div>{rows.filter(row => !row.complete).length} left to do</div>
        <ul className="allRows">
          <WordList
            rows={rows}
            markComplete={markComplete}
          />
        </ul>
      </div>
    </div>
  );
}

export default App;
