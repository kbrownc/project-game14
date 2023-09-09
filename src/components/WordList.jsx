import React, { useState } from 'react';
import WordRow from './WordRow';
import { wordDictionary } from '../letters/WordDictionary';

function WordList({ rows, setRows, markDone, setMessage }) {
  const [newLetter0, setNewLetter0] = useState('');
  const [newLetter1, setNewLetter1] = useState('');
  const [newLetter2, setNewLetter2] = useState('');
  const [newLetter3, setNewLetter3] = useState('');
  const [newLetter4, setNewLetter4] = useState('');

  function addRow(e) {
    debugger;
    //let workRows = JSON.parse(JSON.stringify(rows));
    let workMessage = 'sss';

    setMessage(workMessage);
    // if (!error1Check(newLetter0 + newLetter1 + newLetter2 + newLetter3 + newLetter4)) {
    //   workMessage = 'not a valid word';
    // } else {
    //   workRows[workRows.length] = {
    //     done: false,
    //     name: [newLetter0, newLetter1, newLetter2, newLetter3, newLetter4],
    //   };
    //   setRows(workRows);
    //   setNewLetter0('');
    //   setNewLetter1('');
    //   setNewLetter2('');
    //   setNewLetter3('');
    //   setNewLetter4('');
    // }
    // if (workMessage === '') {
    //   error2Check(workRows)
    // }
    // if (workMessage !== '') {
    //   setMessage(workMessage);
    // }
  }

  function deleteWord(e) {
    let workRows = JSON.parse(JSON.stringify(rows));
    workRows.pop();
    if (workRows.length === 0) {
      workRows = [{ done: false, name: ['', '', '', '', ''] }];
    }
    setRows(workRows);
  }

  function error1Check(name) {
    // Lookup word in dictionary
    const found = wordDictionary.find(item => {
      return item === name;
    });
    if (found === undefined) {
      return false;
    } else {
      return true;
    }
  }

  function error2Check(workRows) {
    // Check for duplicate word
    let resultToReturn = false;
    let workMessage = '';
    for (let i = 0; i < workRows.length; i++) {
      for (let j = 0; j < workRows.length; j++) {
        if (i !== j) {
          if (workRows[i].name.join('') === workRows[j].name.join('')) {
            resultToReturn = true;
            break;
          }
        }
      }
      if (resultToReturn) {
        break;
      }
    }
    if (resultToReturn) {
      workMessage = 'duplicate word';
      setMessage(workMessage);
      return;
    }
  }

  return rows.map((row, index, setRows) => {
    return (
      <div key={index}>
        <ul className="allRows">
          <WordRow
            index={index}
            row={row}
            markDone={markDone}
            deleteWord={deleteWord}
            rowLength={rows.length}
          />
        </ul>
        {index === rows.length - 1 || rows.length === 0 ? (
          <form className="rowForm" onSubmit={addRow} name="word">
            <input required name="letter1" type="text" value={newLetter0} onChange={e => setNewLetter0(e.target.value)} />
            <input required name="letter2" type="text" value={newLetter1} onChange={e => setNewLetter1(e.target.value)} />
            <input required name="letter3" type="text" value={newLetter2} onChange={e => setNewLetter2(e.target.value)} />
            <input required name="letter4" type="text" value={newLetter3} onChange={e => setNewLetter3(e.target.value)} />
            <input required name="letter5" type="text" value={newLetter4} onChange={e => setNewLetter4(e.target.value)} />
            <button type="submit">Add</button>
          </form>
        ) : null}
      </div>
    );
  });
}

export default WordList;
