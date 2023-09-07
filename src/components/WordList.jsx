import React, { useState } from 'react';
import WordRow from './WordRow';

function WordList({ rows, setRows, markDone }) {
  const [newLetter0, setNewLetter0] = useState('');
  const [newLetter1, setNewLetter1] = useState('');
  const [newLetter2, setNewLetter2] = useState('');
  const [newLetter3, setNewLetter3] = useState('');
  const [newLetter4, setNewLetter4] = useState('');

  function addRow(e) {
    let workRows = JSON.parse(JSON.stringify(rows));
    workRows[workRows.length] = {
      done: false,
      name: [newLetter0, newLetter1, newLetter2, newLetter3, newLetter4],
    };
    setNewLetter0('')
    setNewLetter1('')
    setNewLetter2('')
    setNewLetter3('')
    setNewLetter4('')
    setRows(workRows);
  }

  function deleteWord(e) {
    let workRows = JSON.parse(JSON.stringify(rows));
    workRows.pop();
    if (workRows.length === 0) {
      workRows = [{ done: false, name: ['', '', '', '', ''] }];
    }
    setRows(workRows);
  }

  return rows.map((row, index, setRows) => {
    return (
      <div key={index}>
        <ul className="allRows">
          <WordRow index={index} row={row} markDone={markDone} deleteWord={deleteWord} 
          rowLength = {rows.length} />
        </ul>
        {index === rows.length - 1 || rows.length === 0 ? (
          <form className="rowForm" onSubmit={addRow}>
            <input required type="text" value={newLetter0} onChange={e => setNewLetter0(e.target.value)} />
            <input required type="text" value={newLetter1} onChange={e => setNewLetter1(e.target.value)} />
            <input required type="text" value={newLetter2} onChange={e => setNewLetter2(e.target.value)} />
            <input required type="text" value={newLetter3} onChange={e => setNewLetter3(e.target.value)} />
            <input required type="text" value={newLetter4} onChange={e => setNewLetter4(e.target.value)} />
            <button type="submit">Add</button>
          </form>
        ) : null}
      </div>
    );
  });
}

export default WordList;
