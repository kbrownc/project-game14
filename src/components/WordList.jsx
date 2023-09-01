import React, { useState, useRef } from 'react';
import WordRow from './WordRow';
import { v4 as uuidv4 } from 'uuid';

function WordList({ rows, setRows, markDone }) {
  const [newLetter, setNewLetter] = useState('');
  const [editId, setEditId] = useState(0);
  const newLetterRef = useRef();

  function addRow(e) {
    e.preventDefault();
    if (editId) {
      const editRow = rows.find(row => row.id === editId);
      const updatedRows = rows.map(t =>
        t.id === editRow.id
          ? { id: editRow.id, name: newLetter, complete: editRow.complete, created: editRow.created }
          : { id: t.id, name: t.name, complete: t.complete, created: t.created }
      );
      setRows(updatedRows);
      setEditId(0);
      setNewLetter('');
      return;
    }
    const date = new Date();
    const name = newLetterRef.current.value;
    if (name === '') return;
    setRows(prev => {
      return [...prev, { id: uuidv4(), name: name, complete: false, created: date.toDateString() }];
    });
    newLetterRef.current.value = null;
    setNewLetter('');
  }

  function deleteWord(e) {
    e.preventDefault();
    if (editId) {
      const editRow = rows.find(row => row.id === editId);
      const updatedRows = rows.map(t =>
        t.id === editRow.id
          ? { id: editRow.id, name: newLetter, complete: editRow.complete, created: editRow.created }
          : { id: t.id, name: t.name, complete: t.complete, created: t.created }
      );
      setRows(updatedRows);
      setEditId(0);
      setNewLetter('');
      return;
    }
    const date = new Date();
    const name = newLetterRef.current.value;
    if (name === '') return;
    setRows(prev => {
      return [...prev, { id: uuidv4(), name: name, complete: false, created: date.toDateString() }];
    });
    newLetterRef.current.value = null;
    setNewLetter('');
  }

  return rows.map((row, index, setRows) => {
    return (
      <div key={index}>
        <ul className="allRows">
          <WordRow row={row} markDone={markDone} deleteWord={deleteWord} />
        </ul>
        {index === rows.length - 1 ? (
          <form className="todoForm" onSubmit={addRow}>
            <input
              ref={newLetterRef}
              type="text"
              value={newLetter}
              onChange={e => setNewLetter(e.target.value)}
            />
            <button type="submit">{editId ? 'edit' : 'Add'}</button>
          </form>
        ) : null}
      </div>
    );
  });
}

export default WordList;
